// This version has removed the obfuscator

function Styling() {
	let textboxes = document.getElementsByClassName("textbox");
	let submitButton = document.getElementById("submitButton");

	submitButton.addEventListener("mouseover", function () {
		submitButton.style.backgroundColor = "#a7cbd7";
		submitButton.style.transition = "all 0.5s";
	});
	submitButton.addEventListener("mouseleave", function () {
		submitButton.style.backgroundColor = "#5996acf1";
		submitButton.style.transition = "all 0.5s";
	});

	Array.from(textboxes).forEach((box) => {
		box.addEventListener("mouseleave", function () {
			if (document.activeElement !== box) {
				box.style.backgroundColor = "#5996acf1";
				box.style.transition = "all 0.5s";
			}
		});
		box.addEventListener("blur", function () {
			box.style.backgroundColor = "#5996acf1";
			box.style.transition = "all 0.5s";
		});
		box.addEventListener("focus", function () {
			box.style.backgroundColor = "#76adc1c2";
			box.style.transition = "all 0.5s";
		});
		box.addEventListener("mouseover", function () {
			box.style.backgroundColor = "#76adc1c2";
			box.style.transition = "all 0.5s";
		});
	});
}

function Timer() {
	var count = 0;
	var timer = document.getElementById("timeDisplay");
	let textboxes = document.getElementsByTagName("input");
	let second = 59;
	let minute = 2;
	count = minute * 60 + second;
	var intervalStarted = false;

	timer.textContent = `Time Left: ${minute}:${second
		.toString()
		.padStart(2, "0")}`;

	Array.from(textboxes).forEach((text) => {
		text.addEventListener("focus", function () {
			if (!intervalStarted) {
				intervalStarted = true;
				interval = setInterval(function () {
					count--;
					second--;
					timer.textContent = `Time Left: ${minute}:${second
						.toString()
						.padStart(2, "0")}`;

					if (second < 0) {
						if (minute == 0 && second < 0) {
							clearInterval(interval);
							GameOver();
						} else {
							minute--;
							second = 59;
						}
					}
					submitValidator(count);
				}, 1000);
			}
		});
	});
}

function GameOver() {
	var timeDisplay = document.getElementById("timeDisplay");
	var ruleDisplay = document.getElementById("ruleDisplay");
	var tryAgainMessage = document.getElementById("tryAgainMessage");
	const usernameInput = document.getElementById("username");
	const passwordInput = document.getElementById("password");
	const emailInput = document.getElementById("email");
	const phoneInput = document.getElementById("phoneNumber");
	const submitButton = document.getElementById("submitButton");
	const realSubmitButton = document.getElementById("realSubmit");

	submitButton.style.display = "none";
	timeDisplay.style.display = "none";
	ruleDisplay.style.display = "none";
	tryAgainMessage.style.display = "none";
	usernameInput.value = "GAME OVER";
	passwordInput.value = "GAME OVER";
	passwordInput.type = "text";
	emailInput.value = "GAME OVER";
	phoneInput.value = "GAME OVER";

	usernameInput.disabled = "true";
	passwordInput.disabled = "true";
	emailInput.disabled = "true";
	phoneInput.disabled = "true";
	realSubmitButton.disabled = "true";
}

function runAwayButton() {
	let submitButton = document.getElementById("submitButton");
	let tryAgainMessage = document.getElementById("tryAgainMessage");

	submitButton.addEventListener("click", () => {
		alert(
			"Ha! That's not the login button!"
		);
		submitButton.style.display = "none";
		tryAgainMessage.style.display = "block";
	});

	submitButton.addEventListener("mouseover", () => {
		const maxX = window.innerWidth - 150;
		const maxY = window.innerHeight - 50;

		// Generate random positions within the safe viewport area
		let randomX = Math.floor(Math.random() * maxX);
		let randomY = Math.floor(Math.random() * maxY);

		submitButton.style.width = "150px";
		submitButton.style.position = "absolute";
		setTimeout(() => {
			submitButton.style.left = `${randomX}px`;
			submitButton.style.top = ` ${randomY}px`;
		}, 200);
	});
}

function UserNameValidator() {
	const usernameInput = document.getElementById("username");
	const output = document.getElementById("usernameOutput");
	const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
	usernameInput.addEventListener("keydown", function (e) {
		if (e.key === "Tab" || e.keyCode === 9) {
			e.preventDefault();
		}
	});
	usernameInput.addEventListener("input", () => {
		const value = usernameInput.value;

		if (value === "") {
			output.style.display = "none"; // Hide output if input is empty
			userNamePassed = false;
		} else if (value.length < 6) {
			output.style.display = "block";
			output.innerHTML = "Invalid username:<li>Your username is too short</li>";
			userNamePassed = false;
		} else if (value.length < 12) {
			output.style.display = "block";
			output.innerHTML =
				"Invalid username:<li>Your username is too short</li><li>Still too short</li>";
			userNamePassed = false;
		} else if (value.length < 20) {
			output.style.display = "block";
			output.innerHTML =
				"Invalid username:<li>Your username must be 20 characters or longer</li>";
			userNamePassed = false;
		} else if (!/\d/.test(value)) {
			output.style.display = "block";
			output.innerHTML =
				"Invalid username:<li>Your username must contain a number</li>";
			userNamePassed = false;
		} else if (!specialChars.test(value)) {
			output.style.display = "block";
			output.innerHTML =
				"Invalid username:<li>Your username must also contain special characters</li>";
			userNamePassed = false;
		} else if (!/^[01]/.test(value)) {
			output.style.display = "block";
			output.innerHTML =
				"Invalid username:<li>Your username must start with a binary digit</li>";
			userNamePassed = false;
		} else if (!/^[\s\S]*[01]$/.test(value)) {
			output.style.display = "block";
			output.innerHTML =
				"Invalid username:<li>Your username must also end with a binary digit</li>";
			userNamePassed = false;
		} else if (!/^.{2}z/.test(value)) {
			output.style.display = "block";
			output.innerHTML =
				"Invalid username:<li>The third character must be the letter 'z'</li>";
			userNamePassed = false;
		} else if (!/^.{7}o/.test(value)) {
			output.style.display = "block";
			output.innerHTML =
				"Invalid username:<li>The eighth character must be the letter 'o'</li>";
			userNamePassed = false;
		} else if (!/^.{3}q/.test(value)) {
			output.style.display = "block";
			output.innerHTML =
				"Invalid username:<li>The fourth character must be the letter 'q'</li>";
			userNamePassed = false;
		} else {
			output.style.display = "none"; // Hide output if input is valid
			userNamePassed = true;
		}
	});
}

function PasswordValidator() {
	const passwordInput = document.getElementById("password");
	const output = document.getElementById("passwordOutput");
	passwordInput.addEventListener("keydown", function (e) {
		if (e.key === "Tab" || e.keyCode === 9) {
			e.preventDefault();
		}
	});
	passwordInput.addEventListener("input", () => {
		const value = passwordInput.value;

		if (value === "") {
			output.style.display = "none"; // Hide output if input is empty
			passwordPassed = false;
		} else if (value.length < 7) {
			output.style.display = "block";
			output.innerHTML =
				"Invalid password:<li>Your password must be longer than 6 characters</li>";
			passwordPassed = false;
		} else if (value.length > 7) {
			output.style.display = "block";
			output.innerHTML =
				"Invalid password:<li>Your password must be shorter than 8 characters</li>";
			passwordPassed = false;
		} else if (!/^[$]/.test(value)) {
			output.style.display = "block";
			output.innerHTML =
				"Invalid password:<li>Your password must start with the '$' character</li>";
			passwordPassed = false;
		} else if (!/^.{6}\?/.test(value)) {
			output.style.display = "block";
			output.innerHTML =
				"Invalid password:<li>The seventh character must be a '?'</li>";
			passwordPassed = false;
		} else if (!/^.{1}L/.test(value)) {
			output.style.display = "block";
			output.innerHTML =
				"Invalid password:<li>The second character must be 'L' </li>";
			passwordPassed = false;
		} else if (!/^.{3}\*/.test(value)) {
			output.style.display = "block";
			output.innerHTML =
				"Invalid password:<li>The fourth character must be an asterisk </li>";
			passwordPassed = false;
		} else if (!/^.{2}b/.test(value)) {
			output.style.display = "block";
			output.innerHTML =
				"Invalid password:<li>The third character must be the letter 'b' </li>";
			passwordPassed = false;
		} else if (!/^.{5}>/.test(value)) {
			output.style.display = "block";
			output.innerHTML =
				"Invalid password:<li>The sixth character must be the symbol '>' </li>";
			passwordPassed = false;
		} else if (!/^.{4}u/.test(value)) {
			output.style.display = "block";
			output.innerHTML =
				"Invalid password:<li>Good luck with the fifth character. Hint: it's a lower case letter</li>";
			passwordPassed = false;
		} else {
			output.style.display = "none"; // Hide output if input is valid
			passwordPassed = true;
		}
	});
}

function EmailValidator() {
	const emailInput = document.getElementById("email");
	const output = document.getElementById("emailOutput");
	emailInput.addEventListener("keydown", function (e) {
		if (e.key === "Tab" || e.keyCode === 9) {
			e.preventDefault();
		}
	});
	emailInput.addEventListener("blur", () => {
		const value = emailInput.value;

		if (value === "") {
			output.style.display = "none"; // Hide output if input is empty
			emailPassed = false;
		} else if (!value.includes("@")) {
			output.style.display = "block";
			output.innerHTML = `Invalid email address:<li>Your email is must have a domain</li>`;
			emailPassed = false;
		} else if (value.split("@")[1] === "gmail.com") {
			output.style.display = "block";
			output.innerHTML = `Invalid email address:<li>Gmail is not an accepted platform</li>`;
			emailPassed = false;
		} else if (value.split("@")[1] === "outlook.com") {
			output.style.display = "block";
			output.innerHTML = `Invalid email address:<li>Outlook is not an accepted platform</li>`;
			emailPassed = false;
		} else if (value.split("@")[1] !== "hotmail.com") {
			output.style.display = "block";
			output.innerHTML = `Invalid email address:<li>That is not an accepted platform</li>`;
			emailPassed = false;
		} else {
			output.style.display = "none"; // Hide output if input is valid
			emailPassed = true;
		}
	});
}

function PhoneNumberValidator() {
	const phoneInput = document.getElementById("phoneNumber");
	const output = document.getElementById("phoneNumberOutput");
	phoneInput.addEventListener("keydown", function (e) {
		if (e.key === "Tab" || e.keyCode === 9) {
			e.preventDefault();
		}
	});
	phoneInput.addEventListener("input", () => {
		const value = phoneInput.value;
		if (value === "") {
			output.style.display = "none";
			phoneNumberPassed = false;
		} else if (value.length < 10) {
			output.style.display = "block";
			output.innerHTML = `Invalid phone number:<li>Please enter a valid 10 digit phone number</li>`;
			phoneNumberPassed = false;
		} else if (/^416/i.test(value)) {
			output.style.display = "block";
			output.innerHTML = `Invalid phone number:<li>We do not accept (416) area codes</li><li>Ontario area codes only</li>`;
			phoneNumberPassed = false;
		} else if (/^647/i.test(value)) {
			output.style.display = "block";
			output.innerHTML = `Invalid phone number:<li>We do not accept (647) area codes</li><li>Ontario area codes only</li>`;
			phoneNumberPassed = false;
		} else if (/^437/i.test(value)) {
			output.style.display = "block";
			output.innerHTML = `Invalid phone number:<li>We do not accept (437) area codes</li><li>Ontario area codes only</li>`;
			phoneNumberPassed = false;
		} else if (/^1800/i.test(value)) {
			output.style.display = "block";
			output.innerHTML = `Invalid phone number:<li>Bruh</li><li>Ontario area codes only</li>`;
			phoneNumberPassed = false;
		} else if (!/^905/i.test(value)) {
			output.style.display = "block";
			output.innerHTML = `Invalid phone number:<li>Unknown area code</li><li>Ontario area codes only</li>`;
			phoneNumberPassed = false;
		} else {
			output.style.display = "none"; // Hide output if input is valid
			phoneNumberPassed = true;
		}
	});
}

function submitValidator(count) {
	let phoneInput = document.getElementById("phoneNumber").value;
	let emailInput = document.getElementById("email").value;
	let usernameInput = document.getElementById("username").value;
	let passwordInput = document.getElementById("password").value;

	if (userNamePassed && passwordPassed && emailPassed && phoneNumberPassed) {
		document.getElementById("realSubmit").disabled = false;
	}

	document.getElementById("realSubmit").onclick = function () {
		clearInterval(interval);
		let entry = {
			name: usernameInput,
			email: emailInput,
			time: 179 - count,
		};
		fetch("http://localhost:3000/submit", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(entry),
		})
			.then((response) => response.text())
			.then((data) => console.log(data))
			.catch((error) => console.error("Error:", error));
	};
}

var userNamePassed = false;
var passwordPassed = false;
var emailPassed = false;
var phoneNumberPassed = false;
document.getElementById("realSubmit").disabled = true;

var interval;
Styling();
Timer();
UserNameValidator(); // 12zq561o78912345678912!0
PasswordValidator(); //  $Lb*u>?
EmailValidator(); // @hotmail.com
PhoneNumberValidator(); // 905 number
runAwayButton();