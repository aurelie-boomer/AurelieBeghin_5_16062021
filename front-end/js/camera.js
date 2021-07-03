const url = new URL(window.location.href);
const searchParams = url.searchParams;
const cameraId = searchParams.get("cameraId");

console.log(cameraId);

fetch("http://localhost:3000/api/cameras/" + cameraId)
    .then((resultat) => {
        return resultat.json();
    })
    .then((camera) => {
        console.log(camera);
        document.getElementById("cameraName").textContent = camera.name;
        document.getElementById("cameraImg").src = camera.imageUrl;
        document.getElementById("cameraDescription").innerHTML =
            "<ul><li>" + camera.description + "</li></ul>";

        // parcourir les lentilles (camera.lenses)
        // pour chaque lentille : ajouter un <option value="laLentille">laLentille</option> qui contient la lentille au select
        // grâce au .innerHTML qui permet d'injecter du code HTML depuis le javascript
        // document.getElementById("cameraLenses");

        // pour ajouter au panier, mettre un bouton "commander" dans le HTML
        // puis dans le javascript, écouter son évènement "click"
        // et au clic, ajouter au localStorage
    });