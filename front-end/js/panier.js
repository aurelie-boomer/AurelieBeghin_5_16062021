import { getCart, saveCart } from "./utils/cart.js";
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
  const cameraContainer = clonedTemplate.getElementById("cameraContainer");
  clonedTemplate.getElementById("cameraImg").src = camera.imageUrl;
  clonedTemplate.getElementById("cameraName").textContent = camera.name;
  clonedTemplate.getElementById("cameraPrice").textContent =
    camera.price / 100 + "€";
  clonedTemplate.getElementById("cameraLens").textContent = selectedLens;
  clonedTemplate
    .getElementById("btnDelete")
    .addEventListener("click", function (e) {
      if (!removeProductFromCart(selectedCamera)) return; //suppression du panier
      document.getElementById("camerasList").removeChild(cameraContainer); //supprime visuellement le produit sans raffraichir la page
    });

  document.getElementById("camerasList").appendChild(clonedTemplate);
}

//************** Validation formulaire ********************

//récupération du formulaire
const formContact = document.getElementById("formContact");

// vérification des champs avant envoi
//************** Nom ********************
formContact.addEventListener("submit", function (e) {
  const champLastName = document.getElementById("lastName");
  const myRegex = /^[a-zA-Z-\séèäêîï]{3,20}+$/;
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
//************** Prénom ********************
formContact.addEventListener("submit", function (e) {
  const champFirstName = document.getElementById("FirstName");
  const myRegex = /^[a-zA-Z-\séèäêîï]{3,20}+$/;
  if (champFirstName.value == "") {
    const error = document.getElementById("error");
    error.innerHTML = "Le champ est vide";
    error.style.color = "red";
    e.preventDefault();
  } else if (myRegex.test(champFirstName.value) == false) {
    const error = document.getElementById("error");
    error.innerHTML = "Le champ n'est pas valide";
    error.style.color = "red";
    e.preventDefault();
  }
});
//************** Ville ********************
formContact.addEventListener("submit", function (e) {
  const champCity = document.getElementById("city");
  const myRegex = /^[a-zA-Z-\séèäêîï]{3,20}+$/;
  if (champCity.value == "") {
    const error = document.getElementById("error");
    error.innerHTML = "Le champ est vide";
    error.style.color = "red";
    e.preventDefault();
  } else if (myRegex.test(champCity.value) == false) {
    const error = document.getElementById("error");
    error.innerHTML = "Le champ n'est pas valide";
    error.style.color = "red";
    e.preventDefault();
  }
});
//************** Adresse ********************
formContact.addEventListener("submit", function (e) {
  const champAddress = document.getElementById("address");
  const myRegex = /^[0-9a-zA-Z-\séèäêîï]{3,20}+$/;
  if (champAdress.value == "") {
    const error = document.getElementById("error");
    error.innerHTML = "Le champ est vide";
    error.style.color = "red";
    e.preventDefault();
  } else if (myRegex.test(champAddress.value) == false) {
    const error = document.getElementById("error");
    error.innerHTML = "Le champ n'est pas valide";
    error.style.color = "red";
    e.preventDefault();
  }
});
//************** Email ********************
formContact.addEventListener("submit", function (e) {
  const champEmail = document.getElementById("email");
  const myRegex =
    /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;
  if (champEmail.value == "") {
    const error = document.getElementById("error");
    error.innerHTML = "Le champ est vide";
    error.style.color = "red";
    e.preventDefault();
  } else if (myRegex.test(champEmail.value) == false) {
    const error = document.getElementById("error");
    error.innerHTML = "Le champ n'est pas valide";
    error.style.color = "red";
    e.preventDefault();
  }
});

//************** Bouton pour supprimer un produit du panier et l enlever du localstorage ********************

function removeProductFromCart(product) {
  const cart = getCart(); //récupérer le panier
  let productIndex = -1;
  for (let i = 0; i < cart.length; i++) {
    const element = cart[i];
    if (element.id === product.id && element.lens === product.lens) {
      productIndex = i;
      break;
    }
  }
  if (productIndex === -1) {
    return false;
  }
  //supprimer l'élément du tableau
  cart.splice(productIndex, 1);
  //enregistrer le nouveau panier
  saveCart(cart);
  return true;
}

//************** Bouton pour vider entièrement le panier ********************
btnDeleteBasket.addEventListener("click", function (e) {
  e.preventDefault;
  localStorage.removeItem("cart");
  alert("Le panier a été vidé ");
  //faire la suppression visuelle
  const tableProducts = document.getElementById("camerasList");
  tableProducts.innerHTML = "";
  //enregistrer le nouveau panier
  saveCart(cart);
  return true;
});

// Refaire un clone en haut comme pour la suppression d un article???
// Total a Zéro??
