import { getCart } from "./utils/cart.js";
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
async function fillTotalPrice() {
  let totalPrice = 0;
  const cart = getCart();
  for (const selectedCamera of cart) {
    const reponse = await fetch(
      "http://localhost:3000/api/cameras/" + selectedCamera.id
    );
    const camera = await reponse.json();
    totalPrice += camera.price;
  }
  document.getElementById("totalPrice").textContent = totalPrice / 100 + "€";
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

//récupération du formulaire
const formContact = document.getElementById("formContact");

// vérification des champs avant envoi
formContact.addEventListener("submit", function (e) {
  const champLastName = document.getElementById("lastName");
  const myRegex = /^[a-zA-Z-\s]{3,20}+$/;
  if (champLastName.value == "") {
    const error = document.getElementById("error");
    error.innerHTML = "Le champ est vide";
    error.style.color = "red";
    e.preventDefault();
  } else if (myRegex.test(champLastName.value) == false) {
    const error = document.getElementById("error");
    error.innerHTML = "Le champ n'est pas valide";
    error.style.color = "red";
    e.preventDefault();
  }
});

function valider(event) {
  document.getElementById("errorMessage").style.display = "block";
  // code a exécuter lorsque le formulaire sera validé
  const champLastName = formContact.elements["lastName"];
  const champFirstName = formContact.elements["firstName"];
  const champAddress = formContact.elements["address"];
  const champEmail = formContact.elements["email"];
  const champCity = formContact.elements["city"];
}

// autorisation d envoi si formulaire est ok
//function

// modification message dans le pop up (mettre un id à l input ciblé!)
/*const inputTextError = document.getElementById("inputTextError");
inputTextError.setCustomValidity("Mon message à afficher");*/

//************** Bouton pour supprimer un produit du panier et l enlever du localstorage ********************
/*il faut
récuperer le contenu du panier, (une variable qui stocke tout le panier dans le localstorage), 
parcourir le tableau obtenu (tableau d'objet), trouver l'article (en utilisant son code + options) 
l'enlever, 
restocker le panier à partir de la nouvelle version du panier (version sans l'article supprimé)

const btnDelete = document.getElementById("btnDelete");
for (){
  btnDelete.addEventListener("click", function())
  e.preventDefault();
  //Sélectionner la bonne caméra grâce à son id
  filter??
  const ? = document.getElementById
  
}

localStorage.removeItem("");

//************** Bouton pour vider entièrement le panier ********************

localStorage.clear();*/
