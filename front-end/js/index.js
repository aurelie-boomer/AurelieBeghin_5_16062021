import { getCart } from "./utils/cart.js";

//Récupération des données avec l'API fetch.
main();
function main() {
  fetch("http://localhost:3000/api/cameras")
    .then((resultat) => {
      return resultat.json();
    })
    .then((cameras) => {
      for (const camera of cameras) {
        //ajouter la caméra à la page
        addCameraToPage(camera);
      }
      // ajouter le nombre d'articles envoyés dans le panier  (à côté de l'icône)
      document.getElementById("basketNumber").textContent = getCart().length;
    });
  function addCameraToPage(camera) {
    console.log(camera);
    const template = document.getElementById("cameraTemplate");
    const clonedTemplate = document.importNode(template.content, true);

    clonedTemplate.getElementById("cameraImg").src = camera.imageUrl;
    clonedTemplate.getElementById("cameraName").textContent = camera.name;
    clonedTemplate.getElementById("cameraDescription").textContent =
      camera.description;

    clonedTemplate.getElementById("cameraPrice").textContent =
      camera.price / 100 + "€";
    // création lien vers la page du produit concerné
    clonedTemplate.getElementById("cameraLink").href +=
      "?cameraId=" + camera._id;

    document.getElementById("camerasList").appendChild(clonedTemplate);
  }
}
