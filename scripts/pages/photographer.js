const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));
let photographerData = { name: "name" };
const closeCarrousel = document.querySelector(".fa-xmark");
const carrousel = document.querySelector(".carrousel");
const container = document.querySelector(".container");
let photographerMedia = [];
let first;
let heartIcon = []

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

        //      // Ajoutez un événement "click" à l'icône du cœur
        // heartIcon.forEach(addEventListener("click", () => {
        //     // Mettez ici le code que vous souhaitez exécuter lorsque l'icône du cœur est cliquée
        //     console.log("L'icône du cœur a été cliquée !");
        // }))

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
    photographercontent.appendChild(img);
    button.after(img);
}

function renderCards() {
    if (photographerMedia) {
        const div = document.getElementById("cards");
        div.innerHTML = "";
        photographerMedia.forEach((medias, index) => {
            const factory = mediaFactory(medias, first);
            const card = factory.getMediaCard();
            card.setAttribute("tabindex", index + 10);
            div.appendChild(card);
            // const [...heartIcon] = document.querySelectorAll(".fa-heart");
            // console.log(heartIcon);
            const hearts = document.querySelectorAll('.fa-heart')

        //     hearts.forEach(heart => {
        //         heart.addEventListener('click', () => {
        //             console.log('ok');
        //             // Gérer l'événement de clic sur le cœur ici
        //             // Par exemple, vous pouvez mettre à jour le nombre de likes ou effectuer d'autres actions
        //         });
        // });
    })
}}

// function comparelikes(a, b) {
//     return b.likes - a.likes;
// }

// setTimeout(() => {
//     photographerMedia.sort(comparelikes);
//     renderCards();
// }, 3000);

const select = document.getElementById("orderBy");
const list = document.querySelector(".list");
const date = document.getElementById("date");
const orderItem = document.getElementById("orderItem");
const popularite = document.getElementById("popularite");

let open = false;

function swap() {
    open = !open;
    list.style.display = open ? "flex" : "none";
    select.style.display = open ? "none" : "flex";
}

select.addEventListener("click", () => {
    swap();
});

list.addEventListener("click", () => {
    swap();
});

list.addEventListener("click", (e) => {
    orderItem.innerText = e.target.closest(".listItem").innerText;
});

orderItem.addEventListener("click", (e) => {
    popularite.innerText = e.target.innerText;
});

function utiliserFonction(callback) {
    callback();
}

const maFonctionAnonyme = () => {
    console.log("Ceci est une fonction anonyme.");
};

utiliserFonction(maFonctionAnonyme);