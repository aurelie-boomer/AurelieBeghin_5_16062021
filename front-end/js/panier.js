// Récupération des informations du produit concerné grâce à l'API fetch
fetch("http://localhost:3000/api/cameras/" + cameraId)
  .then((resultat) => {
    return resultat.json();
  })
  .then((camera) => {
    console.log(camera);
    document.getElementById("cameraName").textContent = camera.name;
    document.getElementById("cameraImg").src = camera.imageUrl;
    document.getElementById("cameraPrice").textContent =
      camera.price / 100 + "€";
    document.getElementById("cameraLenses").textContent =
      camera.lens;

  });

//Convertir les données (format JSON) qui sont dans le local storage en objet javascript
const cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);




//************** Validation formulaire: regex ou patter??********************
function valider (event) {
  document.getElementById("errorMessage").style.display = "block";
    // code a exécuter lorsque le formulaire sera validé
}

const champ_lastName = form_contact.elements["lastName"];
const champ_firstName = form_contact.elements["firstName"];
const champ_address = form_contact.elements["address"];
const champ_email = form_contact.elements["email"];
const champ_city = form_contact.elements["city"];

//*********** Test de la conformité des champs ****************

// le formulaire est-il OK?
var form_OK = true;

// si le champ ne contient pas 5 caractères OU
// si il n'est pas composé que de nombres
if(champ_city.value.length != 5 || isNaN(champ_city.value)){
    form_OK = false;
}
var regex = /^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*@[a-z0-9]+([_|\.|-]­{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$/ ;
if (regex.exec(champ_email.value) == null) {
    form_OK = false;
}

// Au final, on empeche l'envoi du formulaire si form_OK est faux
if(!form_OK){
    event.preventDefault();
}
//récupération du formulaire
const formContact = document.getElementById("form");

/* ajoute l’événement */
formContact.addEventListener("submit", valider);

