const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
let photographerData = { name: "name" };
const carrousel = document.querySelector(".carrousel");
const container = document.querySelector(".container");
let photographerMedia = [];
let first;
let heartIcon = [];

fetch("data/photographers.json")
    .then((response) => response.json())
    .then((data) => {
        const photographers = data.photographers;
        const media = data.media;
        photographerMedia = media.filter((item) => item.photographerId === id); // recupère les medias qui correspondent à l'id du photographe
        photographerData = photographers.find((item) => item.id === id); // recupère les datas qui correspondent à l'id du photographe
        

        photographerMedia.sort((a, b) => b.likes - a.likes);

        const photographerFirstName = photographerData.name;
        const firstName = photographerFirstName.replace("-", "_").split(" ");
        first = firstName[0];

        // Afficher les données de 'photographerData'
        if (photographerData) {
            displayData(photographerData);
        }

        renderCards();

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

        // Fermer le carroussel
        function closeLightbox() {
            carrousel.style.display = "none";
            carrouselTextTitle.textContent = "";
        }
        closeCarrousel.addEventListener("click", closeLightbox);

        document.addEventListener("keydown", (e) => {
            if (e.code === "ArrowLeft") leftHandler();
            if (e.code === "ArrowRight") rightHandler();
            if (e.code === "Escape") closeLightbox();
            if (e.code === "Enter" || e.code === "Space") {
                if (newVid.style.display === "block") {
                    e.preventDefault();
                    if (newVid.paused) {
                        newVid.play();
                    } else {
                        newVid.pause();
                    }
                }
            }
        });

        right.addEventListener("click", rightHandler);
        left.addEventListener("click", leftHandler);

        // Mise a jour de l'image/video dans le carrousel
        function updateImage() {
            let currentItem = allPictures[currentIndex];
            const currentAlt = currentItem.getAttribute("alt");

            if (currentItem.classList.contains("pictures")) {
                newImg.src = currentItem.src;
                newImg.style.display = "block";
                newImg.setAttribute("alt", currentAlt);
                newVid.style.display = "none";
                carrouselTextTitle.textContent = currentItem.getAttribute("alt");
            } else {
                newVid.src = currentItem.src;
                newVid.style.display = "block";
                newVid.setAttribute("alt", currentAlt);
                newImg.style.display = "none";
                carrouselTextTitle.textContent = currentItem.getAttribute("alt");
            }
        }

        let totalLikes = 0;
        photographerMedia.forEach((elements) => (totalLikes += elements.likes));

        document.querySelector(".totalLikes").innerHTML += totalLikes + ` <i class="fa-solid fa-heart"></i>`;
        document.querySelector(".rate").innerHTML += photographerData.price + `€ / Jours`;
    });

// Affichage du nom, du formulaire et de la photo du photographe

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
    img.setAttribute("alt", `${photographerData.name}`);
    photographercontent.appendChild(img);
    button.after(img);
}

function renderCards() {
    if (photographerMedia) {
        const div = document.getElementById("cards");
        div.innerHTML = "";
        photographerMedia.forEach((medias) => {
            const factory = mediaFactory(medias, first);
            const card = factory.getMediaCard();
            div.appendChild(card);
        });
    }
}

const select = document.getElementById("orderBy");
const list = document.querySelector(".list");
const orderItem = document.getElementById("orderItem");
const popularite = document.getElementById("popularite");
const date = document.getElementById("date");
const title = document.getElementById("title");

let open = false;

function swap() {
    open = !open;
    list.style.display = open ? "flex" : "none";
    select.style.display = open ? "none" : "flex";
}

select.addEventListener("click", swap);
select.addEventListener("keydown", (e) => {
    if (e.code === "Enter") swap();
});

list.addEventListener("click", (e) => {
    swap();
    orderItem.innerText = e.target.closest(".listItem").innerText;
});

list.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        swap();
        orderItem.innerText = e.target.closest(".listItem").innerText;
    }
});

popularite.addEventListener("click", () => {
    photographerMedia.sort((a, b) => b.likes - a.likes);
    renderCards();
});

popularite.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        photographerMedia.sort((a, b) => b.likes - a.likes);
        renderCards();
    }
});

title.addEventListener("click", () => {
    photographerMedia.sort((a, b) => a.title.localeCompare(b.title));
    renderCards();
});

title.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        photographerMedia.sort((a, b) => a.title.localeCompare(b.title));
        renderCards();
    }
});

date.addEventListener("click", () => {
    photographerMedia.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
    renderCards();
});

date.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
        photographerMedia.sort((a, b) => Date.parse(a.date) - Date.parse(b.date));
        renderCards();
    }
});
