let allPictures;
let currentIndex = 0;
let rightHandler, leftHandler;
const newVid = document.querySelector(".carrousel video");
const newImg = document.querySelector(".carrousel img");

function mediaFactory(media, folder) {
    const first = folder;
    const { photographerId, title, image, video, likes, date, price, id } = media;

    // const select = document.getElementById("orderBy");
    // select.addEventListener("select", () => {
    //     console.log("ok");
    // });

    function orderBy() {likes.sort()}

    function getMediaCard() {
        const img = document.createElement("img");
        img.classList.add("media-item");
        const card = document.createElement("div");
        card.classList.add("card");
        const movie = document.createElement("video");
        movie.classList.add("media-item");
        const textTitle = document.createElement("h3");
        textTitle.textContent = title;
        const like = document.createElement("span");
        const cardContent = document.createElement("div");
        cardContent.classList.add("cardContent");
        like.innerHTML = `${likes} <i class="fa-solid fa-heart"></i>`;

        card.addEventListener("click", () => {
            carrousel.style.display = "block";

            if (image) {
                newImg.style.display = "block";
                newImg.src = img.src;
                allPictures = document.querySelectorAll(".media-item");
                currentIndex = [...allPictures].indexOf(img);
                newVid.style.display = "none";
            } else if (video) {
                newVid.style.display = "block";
                newVid.src = movie.src;
                newImg.style.display = "none";
            }
        });

        if (image) {
            const photographerImages = `assets/images/${first}/${image}`;
            img.src = photographerImages;
            img.classList.add("pictures");
            card.appendChild(img);
            cardContent.appendChild(textTitle);
        } else if (video) {
            const photographerVideo = `assets/images/${first}/${video}`;
            movie.src = photographerVideo;
            card.appendChild(movie);
            cardContent.appendChild(textTitle);
        }
        card.appendChild(cardContent);
        cardContent.appendChild(like);

        return card;
    }

    return { getMediaCard };
}
