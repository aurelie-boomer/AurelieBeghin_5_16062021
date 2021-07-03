fetch("http://localhost:3000/api/cameras")
    .then((resultat) => {
        return resultat.json();
    })
    .then((cameras) => {
        for (const camera of cameras) {
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
            
            clonedTemplate.getElementById("cameraLink").href +=
                "?cameraId=" + camera._id;


            document.getElementById("camerasList").appendChild(clonedTemplate);
        }
    }); 