import { getCart, saveCart } from "./utils/cart.js";
main(); //Récupérer le panier
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
// Additionner les prix des caméras ensemble
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

//Récupération du formulaire
const formContact = document.getElementById("formContact");
//Les différents champs
setupInputValidation(
  "lastName",
  "errorLastName",
  /^[a-zA-Z-\séèäêîï]{3,20}$/,
  "Le champ est invalide"
);
setupInputValidation(
  "firstName",
  "errorFirstName",
  /^[a-zA-Z-\séèäêîï]{3,20}$/,
  "Le champ est invalide"
);
setupInputValidation(
  "city",
  "errorCity",
  /^[a-zA-Z-\séèäêîï]{3,20}$/,
  "Le champ est invalide"
);
setupInputValidation(
  "address",
  "errorAddress",
  /^[0-9a-zA-Z-\séèäêîï]{3,20}$/,
  "Le champ est invalide"
);
setupInputValidation(
  "email",
  "errorEmail",
  /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/,
  "Le champ est invalide"
);

// validation des champs avant envoi
function setupInputValidation(id, errorId, regex, errorMessage) {
  const input = document.getElementById(id);
  input.addEventListener("change", function (e) {
    validateInput(id, errorId, regex, errorMessage);
  });
}

// Validation du formulaire avant envoi

document.getElementById("submitButton").addEventListener("click", function (e) {
  if (
    !validateInput(
      "lastName",
      "errorLastName",
      /^[a-zA-Z-\séèäêîï]{3,20}$/,
      "Le champ est invalide"
    ) ||
    !validateInput(
      "firstName",
      "errorFirstName",
      /^[a-zA-Z-\séèäêîï]{3,20}$/,
      "Le champ est invalide"
    ) ||
    !validateInput(
      "city",
      "errorCity",
      /^[a-zA-Z-\séèäêîï]{3,20}$/,
      "Le champ est invalide"
    ) ||
    !validateInput(
      "address",
      "errorAddress",
      /^[0-9a-zA-Z-\séèäêîï]{3,20}$/,
      "Le champ est invalide"
    ) ||
    !validateInput(
      "email",
      "errorEmail",
      /^[A-Za-z0-9](([_\.\-]?[a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([_\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/,
      "Le champ est invalide"
    )
  ) {
    return;
  }
  // envoyer au back-end pour recevoir un numéro de commande --> post
  // Récupération des informations de livraison
  const contact = new Object();
  contact.lastName = document.getElementById("lastName").value;
  contact.firstName = document.getElementById("firstName").value;
  contact.address = document.getElementById("address").value;
  contact.city = document.getElementById("city").value;
  contact.email = document.getElementById("email").value;

  const cart = getCart();
  const products = [];
  // on sélectionne les id
  for (const selectedCamera of cart) {
    products.push(selectedCamera.id);
  }

  const httpResponse = fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // Transformer l'objet js en JSON (chaine de caractères)
    body: JSON.stringify({
      contact: contact, // bien passer ton objet contact
      products: products, // bien passer ton tableau products
    }),
  })
    .then((httpResponse) => httpResponse.json())
    .then((response) => {
      console.log(response);
      const orderId = response.orderId;
      localStorage.removeItem("cart");
      window.location.href =
        "confirmation.html?name=" +
        contact.firstName +
        "&totalPrice=" +
        document.getElementById("totalPrice").textContent +
        "&orderId=" +
        orderId;
    });
});

function validateInput(id, errorId, regex, errorMessage) {
  const input = document.getElementById(id);
  const error = document.getElementById(errorId);
  if (input.value == "") {
    error.innerHTML = "Le champ est vide";
    error.style.color = "red";
    return false;
  } else if (regex.test(input.value) == false) {
    error.innerHTML = errorMessage;
    error.style.color = "red";
    return false;
  }
  //Pour effacer l'erreur si correction
  error.innerHTML = "";
  return true;
}

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
  //Supprimer l'élément du tableau
  cart.splice(productIndex, 1);
  //Enregistrer le nouveau panier
  saveCart(cart);
  return true;
}

//************** Bouton pour vider entièrement le panier ********************
btnDeleteBasket.addEventListener("click", function (e) {
  e.preventDefault;
  localStorage.removeItem("cart");
  alert("Le panier a été vidé ");
  //Faire la suppression visuelle
  const tableProducts = document.getElementById("camerasList");
  tableProducts.innerHTML = "";
  // Mettre le panier à Zéro après l'avoir vidé
  const DeleteTotalPrice = document.getElementById("totalPrice");
  DeleteTotalPrice.textContent = "0€";
  // Supprimer le panier sans rafraîchir
});
