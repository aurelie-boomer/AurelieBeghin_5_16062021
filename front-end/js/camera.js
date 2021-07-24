import { addToCart } from "./utils/cart";

main();
function main() {
    //création du lien pour afficher le produit sélectionné
    const cameraId = getCameraId();

    //récupération des informations du produit concerné grâce à l'API fetch
    fetch("http://localhost:3000/api/cameras/" + cameraId)
        .then((resultat) => {
            return resultat.json();
        })
        .then((camera) => {
            fillPageInformation(camera);
            setupOrderButton(camera);
        });
}

function setupOrderButton(camera) {
    // puis dans le javascript, écouter son évènement "click"
    document
        .getElementById("orderBtn")
        .addEventListener("click", function () {
            const selectedLens = document.getElementById("cameraLenses").value;
            if (selectedLens === "") {
                alert("Sélectionnez une lentille.");
                return;
            }

            addCameraToCart(camera, selectedLens);
            window.location.href = "panier.html";
        });

}

function addCameraToCart(camera, selectedLens) {
    const selectedCamera = {
        id: camera._id,
        lens: selectedLens,
    };

    addToCart(selectedCamera);
}

function fillPageInformation(camera) {
    console.log(camera);
    document.getElementById("cameraName").textContent = camera.name;
    document.getElementById("cameraImg").src = camera.imageUrl;
    document.getElementById("cameraPrice").textContent =
        camera.price / 100 + "€";
    document.getElementById("cameraDescription").textContent =
        camera.description;

    /**********************************************************************************************/
    // pour chaque lentille : ajouter un <option  qui contient la lentille au select
    // grâce au .innerHTML qui permet d'injecter du code HTML depuis le javascript
    for (const lens of camera.lenses) {
        document.getElementById("cameraLenses").innerHTML +=
            "<option>" + lens + "</option>";
    }
}

function getCameraId() {
    const url = new URL(window.location.href);
    const searchParams = url.searchParams;
    const cameraId = searchParams.get("cameraId");
    return cameraId;
}