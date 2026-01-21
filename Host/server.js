// netlify/functions/server.js
const express = require("express");
const serverless = require("serverless-http");
const path = require("path");
const fs = require("fs");
const app = express();

// Define the base directory for your site
const baseDir = path.join(__dirname, "../");
const publicDir = path.join(baseDir, "public");

// Debug log to show path resolution
console.log("Base directory:", baseDir);
console.log("Public directory:", publicDir);
console.log("Scoreboard path:", path.join(publicDir, "scoreboard.json"));

app.use(express.json());
app.use(express.static(publicDir)); // Serve static files from public directory

// Serve the index.html file
app.get("/", (req, res) => {
	res.sendFile(path.join(publicDir, "index.html"));
});

// Serve the winner.html file
app.get("/winner", (req, res) => {
	res.sendFile(path.join(publicDir, "winner.html"));
});

// Add the API endpoint for scoreboard
app.get("/.Host/scoreboard", (req, res) => {
	const scoreboardPath = path.join(publicDir, "scoreboard.json");

	console.log("Reading scoreboard from:", scoreboardPath);

	// Check if file exists first
	if (!fs.existsSync(scoreboardPath)) {
		console.log("Scoreboard file not found at:", scoreboardPath);
		return res.json([]);
	}

	fs.readFile(scoreboardPath, "utf8", (err, data) => {
		if (err) {
			console.error("Error reading scoreboard file:", err);
			return res.json([]);
		}

		let scoreboard = [];
		if (data && data.length > 0) {
			try {
				scoreboard = JSON.parse(data);
				// Sort by time left (assuming higher is better)
				scoreboard.sort((a, b) => parseFloat(b.time) - parseFloat(a.time));
				console.log(
					"Successfully read scoreboard with",
					scoreboard.length,
					"entries"
				);
			} catch (parseError) {
				console.error("Error parsing scoreboard:", parseError);
			}
		} else {
			console.log("Scoreboard file was empty or not valid JSON");
		}

		res.json(scoreboard);
	});
});

app.post("/submit", (req, res) => {
	const entry = req.body;
	const scoreboardPath = path.join(publicDir, "scoreboard.json");

	console.log("Writing entry to scoreboard:", entry);
	console.log("Scoreboard path:", scoreboardPath);

	// Ensure directory exists
	const dir = path.dirname(scoreboardPath);
	if (!fs.existsSync(dir)) {
		console.log("Creating directory:", dir);
		fs.mkdirSync(dir, { recursive: true });
	}

	// Check if file exists, if not create it with empty array
	if (!fs.existsSync(scoreboardPath)) {
		console.log("Creating new scoreboard file");
		fs.writeFileSync(scoreboardPath, "[]", "utf8");
	}

	fs.readFile(scoreboardPath, "utf8", (err, data) => {
		let scoreboard = [];

		if (err) {
			console.error("Error reading scoreboard for writing:", err);
		} else if (data && data.length > 0) {
			try {
				scoreboard = JSON.parse(data);
			} catch (parseError) {
				console.error("Error parsing scoreboard for writing:", parseError);
			}
		}

		scoreboard.push(entry);
		console.log("New scoreboard will have", scoreboard.length, "entries");

		fs.writeFile(
			scoreboardPath,
			JSON.stringify(scoreboard, null, 2),
			"utf8",
			(writeErr) => {
				if (writeErr) {
					console.error("Error saving data:", writeErr);
					return res.status(500).send("Error saving data");
				}
				console.log("Successfully wrote to scoreboard");
				// Redirect to winner page after successful submission
				res.send({ success: true, message: "Score added!" });
			}
		);
	});
});

// For local development
if (process.env.NODE_ENV !== "production") {
	app.listen(3000, () => {
		console.log("Server running at http://localhost:3000");
	});
}

// Export for Netlify Functions
module.exports.handler = serverless(app);
