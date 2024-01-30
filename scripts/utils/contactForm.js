const h2 = document.querySelector("h2");
const form = document.querySelector("form");
const modal = document.getElementById("contact_modal");

form.addEventListener("submit", (e) => e.preventDefault());

function displayModal() {
    modal.style.display = "block";
    h2.innerHTML += ` ${photographerData.name}`;
}

function closeModal() {
    modal.style.display = "none";
    h2.innerHTML = "Contactez-moi";
}
