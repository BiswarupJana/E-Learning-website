const userName = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("pass");
const signUpFormBtn = document.getElementById("signup-submit-btn");
const loginBar = document.querySelector(".log-in");
const loginBtn = document.querySelector(".login-btn");
const signUpBtn = document.querySelector(".signup-btn");
const checkPass = document.getElementById("checkPass");
const checkBox = document.querySelector(".checkBox");
const logoutBtn = document.querySelector(".logout-btn");

//Verification modal elements
const closeModalBtn = document.querySelector(".close-btn");
const verifyCodeInput = document.getElementById("code-input");
const verifyBtn = document.querySelector(".verify-btn");
const modal = document.querySelector(".verification-modal");

let isUserLoggedIn = false;
let checkedPassword = false;

if (JSON.parse(localStorage.getItem("token"))) {
	isUserLoggedIn = true;

	signUpBtn.setAttribute("hidden", true);
	loginBtn.setAttribute("hidden", true);
	logoutBtn.removeAttribute("hidden");
}

class EasyHTTP {
	// Make an HTTP GET Request
	get(url) {
		return new Promise((resolve, reject) => {
			fetch(url)
				.then((res) => res.json())
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	// Make an HTTP POST Request
	post(url, data) {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: "POST",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(data),
			})
				.then((res) => res.json())
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	// Make an HTTP PUT Request
	put(url, data) {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: "PUT",
				headers: {
					"Content-type": "application/json",
				},
				body: JSON.stringify(data),
			})
				.then((res) => res.json())
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	// Make an HTTP DELETE Request
	delete(url) {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: "DELETE",
				headers: {
					"Content-type": "application/json",
				},
			})
				.then((res) => res.json())
				.then(() => resolve("Resource Deleted..."))
				.catch((err) => reject(err));
		});
	}
}

const http = new EasyHTTP();

//Show Password
checkPass.addEventListener("click", () => {
	checkedPassword = !checkedPassword;

	if (checkedPassword) {
		password.setAttribute("type", "text");
	} else {
		password.setAttribute("type", "password");
	}
});

//Log User out on click
logoutBtn.addEventListener("click", (e) => {
	console.log("hello");
	localStorage.removeItem("token");
	isUserLoggedIn = false;

	logoutBtn.setAttribute("hidden", true);
	loginBar.removeAttribute("hidden");
	signUpBtn.removeAttribute("hidden");
	loginBtn.removeAttribute("hidden");
});

//Register Button Event
signUpFormBtn.addEventListener("click", (e) => {
	e.preventDefault();

	const userInfo = {
		username: userName.value,
		email: email.value,
		password: password.value,
	};

	if (userName.value !== "" && email.value !== "" && password.value !== "") {
		http
			.post("http://3.141.19.58:5000/api/auth/register", userInfo)
			.then((data) => {
				if (data.success) modal.removeAttribute("hidden");

				if (data.error) {
					const errorMessage = document.createElement("p");

					errorMessage.innerText = data.error;

					errorMessage.style.color = "red";

					console.log(errorMessage);

					checkBox.insertAdjacentElement("afterend", errorMessage);

					setTimeout(() => {
						if (errorMessage) {
							errorMessage.remove();
						}
					}, 5000);

					isUserLoggedIn = false;

					localStorage.setItem("token", null);
				}

				console.log(data);
				isUserLoggedIn = true;
			});
	}
});

//Close modal on Clicking this button
closeModalBtn.addEventListener("click", () => {
	modal.setAttribute("hidden", true);
});

//Verify Email Code
verifyBtn.addEventListener("click", (e) => {
	const inputVal = verifyCodeInput.value;
	if (inputVal !== "") {
		http
			.get(`http://3.141.19.58:5000/api/auth/confirmemail?token=${inputVal}`)
			.then((data) => {
				if (JSON.parse(localStorage.getItem("token" === null))) {
					token = "";
				} else {
					token = JSON.parse(localStorage.getItem("token"));
				}
				console.log(data);

				if (data.token !== undefined) {
					localStorage.setItem("token", JSON.stringify(data.token));
					modal.setAttribute("hidden", false);
					isUserLoggedIn = true;
					location.href = "/";
				}

				if (data.error) {
					console.log(data.error);
					localStorage.setItem("token", null);

					const errorMessage = document.createElement("p");
					errorMessage.innerText = `${data.error}. Please Try Again`;

					errorMessage.style.color = "red";

					verifyCodeInput.insertAdjacentElement("afterend", errorMessage);

					if (errorMessage) {
						setTimeout(() => {
							errorMessage.remove();
						}, 3000);
					}
				}
			});
	}
});

if (isUserLoggedIn) {
	signUpBtn.setAttribute("hidden", true);
	loginBtn.setAttribute("hidden", true);
	logoutBtn.removeAttribute("hidden");
}
