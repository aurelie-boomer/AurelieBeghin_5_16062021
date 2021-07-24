import { getCart } from "./utils/cart";
main(); //récupérer le panier
function main() {
  //Convertir les données (format JSON) qui sont dans le local storage en objet javascript
  const cart = getCart();
  //Remplir la page avec les informations
  fillCartInformation(cart);
  fillTotalPrice();
}

function fillCartInformation(cart) {
  for (const selectedCamera of cart) {
    fetch("http://localhost:3000/api/cameras/" + selectedCamera.id)
      .then((resultat) => {
        return resultat.json();
      })
      .then((camera) => {
        addCameraToCamerasList(selectedCamera, camera);
      });
  }
}
// additionner les prix des caméras ensemble
function fillTotalPrice(){
  let totalPrice;
    const cart = getCart();
  for (const selectedCamera of cart) {
    fetch("http://localhost:3000/api/cameras/" + selectedCamera.id)
      .then((resultat) => {
        return resultat.json();
      })
      .then((camera) => {
        totalPrice += camera.price;
      });
  }
console.log(totalPrice);
}

function addCameraToCamerasList(selectedCamera, camera) {
  const selectedLens = selectedCamera.lens;

  const template = document.getElementById("cameraTemplate");
  const clonedTemplate = document.importNode(template.content, true);

  clonedTemplate.getElementById("cameraImg").src = camera.imageUrl;
  clonedTemplate.getElementById("cameraName").textContent = camera.name;
  clonedTemplate.getElementById("cameraPrice").textContent =
    camera.price / 100 + "€";
  clonedTemplate.getElementById("cameraLens").textContent = selectedLens;

  document.getElementById("camerasList").appendChild(clonedTemplate);
}

//************** Validation formulaire: regex ou patter??********************
function valider(event) {
  document.getElementById("errorMessage").style.display = "block";
  // code a exécuter lorsque le formulaire sera validé
  const champLastName = formContact.elements["lastName"];
  const champFirstName = formContact.elements["firstName"];
  const champAddress = formContact.elements["address"];
  const champEmail = formContact.elements["email"];
  const champCity = formContact.elements["city"];

  //*********** Test de la conformité des champs ****************

  // le formulaire est-il OK?
  var formOk = true;

  // si le champ ne contient pas 5 caractères OU
  // si il n'est pas composé que de nombres
  if (champCity.value.length != 5 || isNaN(champCity.value)) {
    formOk = false;
  }
  var regex =
    /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/;
  if (regex.exec(champEmail.value) == null) {
    formOk = false;
  }

  // Au final, on empeche l'envoi du formulaire si form_OK est faux
  if (!formOk) {
    event.preventDefault();
  }
}

//récupération du formulaire
const formContact = document.getElementById("form");

/* ajoute l’événement */
formContact.addEventListener("submit", valider);
