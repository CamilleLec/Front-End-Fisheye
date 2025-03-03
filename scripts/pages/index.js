async function getPhotographers() {
    const reponse = await fetch("data/photographers.json");
    const data = await reponse.json();

    return data;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        // eslint-disable-next-line no-undef
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();

        userCardDOM.addEventListener("click", (e) => {
            const id = e.currentTarget.getAttribute("data-id");
            window.location.href = "photographer.html?id=" + id;
        });

        userCardDOM.addEventListener("keydown", (e) => {
            if (e.code === "Enter" || e.code === "Space") {
                const id = e.currentTarget.getAttribute("data-id");
                window.location.href = "photographer.html?id=" + id;
            }
        });

        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
