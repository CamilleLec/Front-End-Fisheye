async function getPhotographers() {
    const reponse = await fetch("data/photographers.json");
    const data = await reponse.json();

    // console.log(data.photographers);

    return data;
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();

        userCardDOM.addEventListener("click", (e) => {
            const id = e.currentTarget.getAttribute("data-id");
            window.location.href = "photographer.html?id=" + id; 
        });

        userCardDOM.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
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
