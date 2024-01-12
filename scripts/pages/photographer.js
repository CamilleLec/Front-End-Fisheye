const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
let photographerData = { name: "name" };
const closeCarrousel = document.querySelector(".fa-xmark");
const carrousel = document.querySelector(".carrousel");
const container = document.querySelector(".container");
let photographerMedia = [];

fetch("data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
        const photographers = data.photographers;
        const media = data.media;
        photographerMedia = media.filter((item) => item.photographerId === id);
        photographerData = photographers.find((item) => item.id === id);

        const photographerFirstName = photographerData.name;
        const firstName = photographerFirstName.replace("-", "_").split(" ");
        const first = firstName[0];

        // Afficher les données de 'photographerData'
        if (photographerData) {
            displayData(photographerData);
        }
        if (photographerMedia) {
            const main = document.getElementById("main");
            const div = document.createElement("div");
            div.classList.add("medias");
            main.appendChild(div);
            photographerMedia.forEach((medias) => {
                const factory = mediaFactory(medias, first);
                const card = factory.getMediaCard();
                div.appendChild(card);
            });
            closeCarrousel.addEventListener("click", (e) => {
                carrousel.style.display = "none";
                container.innerHTML = "";


            });
        }
    });

function displayData(photographerData) {
    const picture = `assets/photographers/${photographerData.portrait}`;

    const photographerElement = document.querySelector(".photograph-header");
    const button = document.querySelector(".contact_button");

    const photographercontent = document.createElement("div");
    photographercontent.className = "photographer-content";

    const h1 = document.createElement("h1");
    h1.textContent = photographerData.name;
    photographercontent.appendChild(h1);

    photographerElement.appendChild(photographercontent);
    button.before(photographercontent);

    const location = document.createElement("p");
    location.classList = "location";
    location.textContent = `${photographerData.city}, ${photographerData.country}`;

    photographercontent.appendChild(location);

    const tagline = document.createElement("p");
    tagline.textContent = photographerData.tagline;
    photographercontent.appendChild(tagline);
    tagline.style.fontSize = "18px";

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    photographercontent.appendChild(img);

    button.after(img);
}
