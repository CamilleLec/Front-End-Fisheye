const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
let photographerData = { name: "name" };
const closeCarrousel = document.querySelector(".fa-xmark");
const carrousel = document.querySelector(".carrousel");
const container = document.querySelector(".container");
let photographerMedia = [];
let first;

fetch("data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
        const photographers = data.photographers;
        const media = data.media;
        photographerMedia = media.filter((item) => item.photographerId === id);
        photographerData = photographers.find((item) => item.id === id);

        const photographerFirstName = photographerData.name;
        const firstName = photographerFirstName.replace("-", "_").split(" ");
        first = firstName[0];

        // Afficher les données de 'photographerData'
        if (photographerData) {
            displayData(photographerData);
        }

        renderCards();

        // Fermer le carroussel
        function closeLightbox() {
            carrousel.style.display = "none";
        }
        closeCarrousel.addEventListener("click", closeLightbox);

        // Déplacement dans le carrousel
        const right = document.getElementById("right");
        const left = document.getElementById("left");

        rightHandler = () => {
            allPictures = document.querySelectorAll(".media-item");
            currentIndex = (currentIndex + 1) % allPictures.length;
            updateImage();
        };

        leftHandler = () => {
            allPictures = document.querySelectorAll(".media-item");
            currentIndex = (currentIndex - 1 + allPictures.length) % allPictures.length;
            updateImage();
        };
        document.addEventListener("keydown", (e) => {
            if (e.code === "ArrowLeft") leftHandler();
            if (e.code === "ArrowRight") rightHandler();
            if (e.code === "Escape") closeLightbox();
        });

        right.addEventListener("click", rightHandler);
        left.addEventListener("click", leftHandler);

        // Mise a jour de l'image/video dans le carrousel
        function updateImage() {
            if (allPictures[currentIndex].classList.contains("pictures")) {
                newImg.src = allPictures[currentIndex].src;
                newImg.style.display = "block";
                newVid.style.display = "none";
            } else {
                newVid.src = allPictures[currentIndex].src;
                newVid.style.display = "block";
                newImg.style.display = "none";
            }
        }
        // }
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

function renderCards() {
    if (photographerMedia) {
        const main = document.getElementById("main");
        const div = document.getElementById("cards");

        div.innerHTML = "";
        photographerMedia.forEach((medias, index) => {
            const factory = mediaFactory(medias, first);
            const card = factory.getMediaCard();
            card.setAttribute("tabindex", index + 10);
            div.appendChild(card);
        });
    }
}

function comparelikes(a, b) {
    return a.likes - b.likes;
}

setTimeout(() => {
    photographerMedia.sort(comparelikes);
    renderCards();
}, 3000);

const select = document.getElementById("orderBy");
const ul = document.querySelector("ul");
const chevronUp = document.querySelector(".fa-chevron-up");
const chevronDown = document.querySelector(".fa-chevron-down");
chevronDown.style.display = "none"
select.addEventListener("click", () => {
    if (chevronUp.style.display === "block"){
    ul.style.display = "block";
    chevronUp.style.display = "none";
    chevronDown.style.display = "block";}
    else {
        ul.style.display = "none";
        chevronUp.style.display = "block";
        chevronDown.style.display = "none"
    }
});