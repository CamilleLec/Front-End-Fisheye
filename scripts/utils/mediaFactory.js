let allPictures;
let currentIndex = 0;
let rightHandler, leftHandler;

function mediaFactory(media, folder) {
    const first = folder;
    const { photographerId, title, image, video, likes, date, price, id } = media;

    function getMediaCard() {
        const img = document.createElement("img");
        const card = document.createElement("div");
        card.classList.add("card");
        const movie = document.createElement("video");
        const textTitle = document.createElement("h3");
        textTitle.textContent = title;
        const like = document.createElement("span");
        const cardContent = document.createElement("div");
        cardContent.classList.add("cardContent");
        like.innerHTML = `${likes} <i class="fa-solid fa-heart"></i>`;

        if (image) {
            const photographerImages = `assets/images/${first}/${image}`;
            img.src = photographerImages;
            img.className = "pictures";
            card.appendChild(img);
            cardContent.appendChild(textTitle);

            img.addEventListener("click", (e) => {
                carrousel.style.display = "block";
                const clonedImg = img.cloneNode(true);
                clonedImg.className = "photographerElements";
                allPictures = document.querySelectorAll(".pictures");
                currentIndex = [...allPictures].indexOf(img);
                container.appendChild(clonedImg);

                const right = document.getElementById("right");
                const left = document.getElementById("left");

                rightHandler = () => {
                    currentIndex = (currentIndex + 1) % allPictures.length;
                    updateImage();
                };

                leftHandler = () => {
                    currentIndex = (currentIndex - 1 + allPictures.length) % allPictures.length;
                    updateImage();
                };

                right.addEventListener("click", rightHandler);
                left.addEventListener("click", leftHandler);

                function updateImage() {
                    const imageActive = document.querySelector(".photographerElements");
                    imageActive.src = allPictures[currentIndex].src;
                }
            });
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
