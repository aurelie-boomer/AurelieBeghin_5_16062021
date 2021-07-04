//Récupération des données avec l'API fetch.
fetch("http://localhost:3000/api/cameras")
    .then((resultat) => {
        return resultat.json();
    })
    .then((cameras) => {
        for (const camera of cameras) {   //boucle pour récuperer les détails de chaque produit
            console.log(camera);
            const template = document.getElementById("cameraTemplate");
            const clonedTemplate = document.importNode(template.content, true);

            clonedTemplate.getElementById("cameraImg").src = camera.imageUrl;
            clonedTemplate.getElementById("cameraName").textContent =
                camera.name;
            clonedTemplate.getElementById("cameraDescription").textContent =
                camera.description;

            clonedTemplate.getElementById("cameraPrice").textContent =
                camera.price / 100 + "€";
// création lien vers la page du produit concerné
            clonedTemplate.getElementById("cameraLink").href +=
                "?cameraId=" + camera._id;


            document.getElementById("camerasList").appendChild(clonedTemplate);
        }
    }); 