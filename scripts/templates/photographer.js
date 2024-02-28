function photographerTemplate(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM(info = true) {
        // Déclaration des éléments du DOM
        const article = document.createElement("article");
        // on ajoute l'attribut id sur la balise
        article.setAttribute("data-id", id);
        article.tabIndex = index + 10;
        const img = document.createElement("img");
        let h2, cityAndCountry, textTagline, txtPrice;
        if (info) {
            h2 = document.createElement("h2");
            cityAndCountry = document.createElement("h3");
            textTagline = document.createElement("p");
            txtPrice = document.createElement("span");
        }

        // Attribution des valeurs
        img.setAttribute("src", picture);
        img.setAttribute("alt", `${name}`);

        if (info) {
            h2.textContent = name;
            h2.setAttribute("aria-label", `Nom du photographe : ${name}`);
            cityAndCountry.textContent = `${city}, ${country}`;
            cityAndCountry.setAttribute("aria-label", `Ville et pays : ${city}, ${country}`);
            textTagline.textContent = tagline;
            textTagline.setAttribute("aria-label", `Slogan : ${tagline}`);
            txtPrice.textContent = `${price}€/jour`;
            txtPrice.setAttribute("aria-label", `Prix : ${price} euros par jour`);
            txtPrice.style.color = "#757575";
        }

        // Ajout des elements au DOM
        article.appendChild(img);
        if (info) {
            article.appendChild(h2);
            article.appendChild(cityAndCountry);
            article.appendChild(textTagline);
            article.appendChild(txtPrice);
        }

        return article;
    }
    return { name, city, country, tagline, price, picture, getUserCardDOM };
}
