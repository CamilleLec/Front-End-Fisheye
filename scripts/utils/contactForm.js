/* eslint-disable no-unused-vars */
const h2 = document.querySelector("h2");
const form = document.querySelector("form");
const modal = document.getElementById("contactModal");
const theModal = document.querySelector(".modal");
const main = document.querySelector("main");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const prenom = document.getElementById("firstName").value;
    const nom = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    console.log("Prénom:", prenom);
    console.log("Nom:", nom);
    console.log("Email:", email);
    console.log("Message:", message);
});

document.addEventListener("keydown", (e) => {
    if (e.code === "Escape") closeModal();
});

function displayModal() {
    modal.style.display = "block";
    // eslint-disable-next-line no-undef
    h2.innerHTML += ` ${photographerData.name}`;
    main.setAttribute("aria-hidden", "true");
    theModal.setAttribute("aria-hidden", "false");
    document.getElementById("firstName").focus();
}

function closeModal() {
    modal.style.display = "none";
    h2.innerHTML = "Contactez-moi";
    main.setAttribute("aria-hidden", "false");
    theModal.setAttribute("aria-hidden", "true");
}
