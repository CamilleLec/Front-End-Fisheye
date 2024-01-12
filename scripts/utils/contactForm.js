function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
    const h2 = document.querySelector("h2");
    h2.innerHTML += ` ${photographerData.name}`;
}

const form = document.querySelector("form");

form.addEventListener("submit", (e) => e.preventDefault());

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
