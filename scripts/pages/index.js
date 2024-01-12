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
            //on recupere l'evenement avec e
            // console.log(e.currentTarget); // e.currenteTarget est la balise qui vient d'etre cliqué
            const id = e.currentTarget.getAttribute("data-id"); // on recupere l'attribut que l'on a cree dans getusercarddom
            // console.log(id);
            window.location.href = "photographer.html?id=" + id; //on redirige vers la page photographer en lui passant l'id en parametre
        });

        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
