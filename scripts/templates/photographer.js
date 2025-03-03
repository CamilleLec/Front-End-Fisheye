// eslint-disable-next-line no-unused-vars
function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement("article");
        article.setAttribute("data-id", id);
        article.tabIndex = 0;
        const img = document.createElement("img");
        const h2 = document.createElement("h2");
        const cityAndCountry = document.createElement("h3");
        const textTagline = document.createElement("p");
        const txtPrice = document.createElement("span");
        img.setAttribute("src", picture);
        img.setAttribute("alt", `${name}`);

        h2.textContent = name;
        h2.setAttribute("aria-label", `Nom du photographe : ${name}`);
        cityAndCountry.textContent = `${city}, ${country}`;
        cityAndCountry.setAttribute("aria-label", `Ville et pays : ${city}, ${country}`);
        textTagline.textContent = tagline;
        textTagline.setAttribute("aria-label", `Slogan : ${tagline}`);
        txtPrice.textContent = `${price}€/jour`;
        txtPrice.setAttribute("aria-label", `Prix : ${price} euros par jour`);
        txtPrice.style.color = "#757575";

        // Ajout des elements au DOM
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(cityAndCountry);
        article.appendChild(textTagline);
        article.appendChild(txtPrice);

        return article;
    }
    return { name, city, country, tagline, price, picture, getUserCardDOM };
}
