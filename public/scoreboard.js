function loadScoreboard() {
	fetch("/.Host/scoreboard")
		.then((response) => response.json())
		.then((scoreboard) => {
			const tableBody = document.getElementById("winnerTable");

			// Clear all rows except header
			while (tableBody.rows.length > 1) {
				tableBody.deleteRow(1);
			}

			// Make sure time is a number
			scoreboard.forEach(entry => entry.time = Number(entry.time));

			// Sort descending by time (best first)
			scoreboard.sort((b, a) => b.time - a.time);

			// Add each entry as a new row
			scoreboard.forEach((entry, index) => {
				const row = tableBody.insertRow();

				// Rank
				const rankCell = row.insertCell();
				rankCell.textContent = `#${index + 1}`;

				// Name
				const nameCell = row.insertCell();
				nameCell.textContent = entry.name;

				// Email
				const emailCell = row.insertCell();
				emailCell.textContent = entry.email;

				// Time
				const timeCell = row.insertCell();
				const minutes = Math.floor(entry.time / 60);
				const seconds = entry.time % 60;
				timeCell.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
			});

			// Highlight the current player (from localStorage)
			highlightPlayerEntry();
		})
		.catch((error) => console.error("Error loading scoreboard:", error));
}
function highlightPlayerEntry() {
	const playerName = localStorage.getItem("currentPlayerName");
	const playerEmail = localStorage.getItem("currentPlayerEmail");

	if (playerName && playerEmail) {
		const rows = document.querySelectorAll("#winnerTable tr");
		for (let i = 1; i < rows.length; i++) {
			const cells = rows[i].cells;
			const rowName = cells[1].textContent;
			const rowEmail = cells[2].textContent;

			if (rowName === playerName && rowEmail === playerEmail) {
				rows[i].classList.add("player-entry");
				break;
			}
		}
	}
}

// Load scoreboard when page loads
document.addEventListener("DOMContentLoaded", loadScoreboard);
