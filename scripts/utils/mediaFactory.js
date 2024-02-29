let allPictures;
let currentIndex = 0;
let rightHandler, leftHandler;
const newVid = document.querySelector(".carrousel video");
const newImg = document.querySelector(".carrousel img");
const closeCarrousel = document.querySelector(".fa-xmark");
const carrouselTextTitle = document.createElement("h3");

function mediaFactory(media, folder) {
    const first = folder;
    let { photographerId, title, image, video, likes, date, price, id } = media;
    let liked = false;

    function getMediaCard() {
        const img = document.createElement("img");
        img.classList.add("media-item");
        img.tabIndex = 0;
        img.setAttribute("aria-label", "Lilac breasted roller, closeup view");
        const card = document.createElement("div");
        card.classList.add("card");
        const movie = document.createElement("video");
        movie.classList.add("media-item");
        movie.tabIndex = 0;
        movie.setAttribute("aria-label", "Lilac breasted roller, closeup view");
        const textTitle = document.createElement("h3");
        textTitle.textContent = title;
        textTitle.classList.add("cardTitle");
        const like = document.createElement("span");
        like.tabIndex = 0;
        const cardContent = document.createElement("div");
        cardContent.classList.add("cardContent");
        like.innerHTML = `<span>${likes}</span> <i class="fa-solid fa-heart hearts" aria-label="likes"></i>`;

        function addLike() {
            const totalLikes = document.querySelector(".totalLikes");

            if (!liked) {
                likes++;
                like.innerHTML = `<span>${likes}</span> <i class="fa-solid fa-heart hearts"></i>`;
                totalLikes.innerHTML = parseInt(totalLikes.innerText) + 1 + ` <i class="fa-solid fa-heart"></i>`;
            } else {
                likes--;
                like.innerHTML = `<span>${likes}</span> <i class="fa-solid fa-heart hearts"></i>`;
                totalLikes.innerHTML = parseInt(totalLikes.innerText) - 1 + ` <i class="fa-solid fa-heart"></i>`;
            }
            liked = !liked;
        }

        like.addEventListener("click", () => addLike());
        like.addEventListener("keydown", (e) => {
            if (e.code === "Enter" || e.code === "Space") {
                e.preventDefault();
                addLike();
            }
        });

        function openCarrousel() {
            carrousel.style.display = "block";
            if (image) {
                newImg.style.display = "block";
                newImg.src = img.src;
                allPictures = document.querySelectorAll(".media-item");
                currentIndex = [...allPictures].indexOf(img);
                newVid.style.display = "none";
                newImg.setAttribute("alt", `${title}`);
                carrouselTextTitle.textContent = title;
                carrouselTextTitle.style.color = "#901c1c";
                carrouselTextTitle.style.marginTop = "0";
                carrousel.setAttribute("aria-label", "image closeup view");
                container.appendChild(carrouselTextTitle);
            } else if (video) {
                newVid.style.display = "block";
                newVid.src = movie.src;
                newImg.style.display = "none";
                newVid.setAttribute("alt", `${title}`);
                carrouselTextTitle.textContent = title;
                carrouselTextTitle.style.color = "#901c1c";
                carrouselTextTitle.style.marginTop = "0";
                carrousel.setAttribute("aria-label", "image closeup view");
                container.appendChild(carrouselTextTitle);
            }
        }

        img.addEventListener("click", openCarrousel);
        movie.addEventListener("click", openCarrousel);

        img.addEventListener("keydown", (e) => {
            if (e.code === "Enter") openCarrousel();
        });
        movie.addEventListener("keydown", (e) => {
            if (e.code === "Enter") openCarrousel();
        });

        if (image) {
            const photographerImages = `assets/images/${first}/${image}`;
            img.src = photographerImages;
            img.classList.add("pictures");
            img.setAttribute("alt", `${title}`);
            img.setAttribute("aria-label", "closeup view");
            card.appendChild(img);
            cardContent.appendChild(textTitle);
        } else if (video) {
            const photographerVideo = `assets/images/${first}/${video}`;
            movie.src = photographerVideo;
            movie.setAttribute("alt", `${title}`);
            movie.setAttribute("aria-label", "closeup view");
            card.appendChild(movie);
            cardContent.appendChild(textTitle);
            newVid.focus();
        }
        card.appendChild(cardContent);
        cardContent.appendChild(like);

        return card;
    }

    return { getMediaCard };
}
