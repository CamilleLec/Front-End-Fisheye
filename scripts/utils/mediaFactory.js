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
    function orderBy() {
        likes.sort();
    }

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
        like.innerHTML = `<span>${likes}</span> <i class="fa-solid fa-heart hearts"></i>`;

        like.addEventListener("click", () => {
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
        });

        

        function openCarrousel() {
            carrousel.style.display = "block";
            allPictures = document.querySelectorAll(".media-item");
            if (image) {
                newImg.style.display = "block";
                newImg.src = img.src;
                
                currentIndex = [...allPictures].indexOf(img);
                newVid.style.display = "none";
                carrouselTextTitle.textContent = `${title}`;
                carrouselTextTitle.style.color = "#901c1c";
                carrouselTextTitle.style.marginTop = "0";
                container.appendChild(carrouselTextTitle);
            } else if (video) {
                newVid.style.display = "block";
                newVid.src = movie.src;
                newImg.style.display = "none";
                carrouselTextTitle.textContent = `${title}`;
                carrouselTextTitle.style.color = "#901c1c";
                carrouselTextTitle.style.marginTop = "0";
                container.appendChild(carrouselTextTitle);

            }
        }

        img.addEventListener("click", openCarrousel);
        movie.addEventListener("click", openCarrousel);


        // Fermer le carroussel
        function closeLightbox() {
            carrousel.style.display = "none";
            carrouselTextTitle.textContent = ""
        }
        closeCarrousel.addEventListener("click", closeLightbox);

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
