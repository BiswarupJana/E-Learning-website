const email = document.getElementById("email");
const password = document.getElementById("pass");
const loginFormBtn = document.getElementById("login-submit-btn");
const signUpFormBtn = document.getElementById("signup-submit-btn");
const loginBar = document.querySelector(".log-in");
const loginBtn = document.querySelector(".login-btn");
const signUpBtn = document.querySelector(".signup-btn");
const logoutBtn = document.querySelector(".logout-btn");

let isUserLoggedIn = false;
let checkedPassword = false;

//Check if user is logged in
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

logoutBtn.addEventListener("click", (e) => {
	localStorage.removeItem("token");
	isUserLoggedIn = false;

	logoutBtn.setAttribute("hidden", true);
	loginBar.removeAttribute("hidden");
	signUpBtn.removeAttribute("hidden");
	loginBtn.removeAttribute("hidden");
});

//Login Button Event
loginFormBtn.addEventListener("click", (e) => {
	e.preventDefault();
	console.log("hello");
	const userInfo = {
		email: email.value,
		password: password.value,
	};

	if (email.value !== "" && password.value !== "") {
		http
			.post("http://3.141.19.58:5000/api/auth/login", userInfo)
			.then((data) => {
				console.log(data);

				if (JSON.parse(localStorage.getItem("token" === null))) {
					token = "";
				} else {
					token = JSON.parse(localStorage.getItem("token"));
				}

				if (data.token !== undefined) {
					localStorage.setItem("token", JSON.stringify(data.token));
					logoutBtn.removeAttribute("hidden");
					isUserLoggedIn = true;
					window.location.reload();
					location.href = "/";
				}

				if (data.error) {
					const errorMessage = document.createElement("p");

					errorMessage.innerText = data.error;

					errorMessage.style.color = "red";

					console.log(errorMessage);

					password.insertAdjacentElement("afterend", errorMessage);

					isUserLoggedIn = false;
					setTimeout(() => {
						if (errorMessage) {
							errorMessage.remove();
						}
					}, 5000);
				}

				email.value = "";
				password.value = "";
			})
			.catch((err) => {
				console.log(err);
				isUserLoggedIn = false;
				logoutBtn.setAttribute("hidden", true);
				localStorage.setItem("token", null);
			});
	}
});

if (isUserLoggedIn) {
	// loginBar.setAttribute("hidden", true);
	signUpBtn.setAttribute("hidden", true);
	loginBtn.setAttribute("hidden", true);
	logoutBtn.removeAttribute("hidden");
	//Log User out on click
}

//apikey = AIzaSyA_7I9AnOCyEmrCqH8ALU554INwTpfy0QI
//client-id = 243990724539-4d6umfk1jn6rrhj9kd8kkkghrb82pe31.apps.googleusercontent.com
