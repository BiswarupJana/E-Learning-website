function myFunction() {
	var x = document.getElementById("checkPass");
	if (x.type === "password") {
		x.type = "text";
	} else {
		x.type = "password";
	}
}

// Navbar

let ham = document.querySelector("#hidden");
let links = document.querySelector(".right-nav");

ham.addEventListener("click", (e) => {
	e.preventDefault();
	links.classList.toggle("show");
});

// Portfolio item details pop-up
document.addEventListener("click", (e) => {
	if (e.target.classList.contains("btn1")) {
		togglePortfolioPopup();
		document.querySelector(".portfolio-popup").scrollTo(0, 0);
		portfolioItemDetails(document.querySelector(".portfolio-item1"));
	} else if (e.target.classList.contains("btn2")) {
		togglePortfolioPopup();
		document.querySelector(".portfolio-popup").scrollTo(0, 0);
		portfolioItemDetails(document.querySelector(".portfolio-item2"));
	} else if (e.target.classList.contains("btn3")) {
		togglePortfolioPopup();
		document.querySelector(".portfolio-popup").scrollTo(0, 0);
		portfolioItemDetails(document.querySelector(".portfolio-item3"));
	}
});

function togglePortfolioPopup() {
	document.querySelector(".portfolio-popup").classList.toggle("open");
	document.body.classList.toggle("hide-scrolling");
	document.querySelector(".main").classList.toggle("fade-out");
}

document
	.querySelector(".pp-close")
	.addEventListener("click", togglePortfolioPopup);

function portfolioItemDetails(portfolioItem) {
	document.querySelector(".pp-thumbnail img").src = portfolioItem.querySelector(
		".portfolio-item-thumbnail img",
	).src;

	document.querySelector(".pp-header h3").innerHTML =
		portfolioItem.querySelector(".portfolio-item-title").innerHTML;

	document.querySelector(".pp-body").innerHTML = portfolioItem.querySelector(
		".portfolio-item-details",
	).innerHTML;
}

document.addEventListener("click", (e) => {
	if (e.target.classList.contains("pp-inner")) {
		togglePortfolioPopup();
	}
});

function submitFunction() {
	alert("Form Submitted");
}
