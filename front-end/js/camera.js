//création du lien pour afficher le produit sélectionné
const url = new URL(window.location.href);
const searchParams = url.searchParams;
const cameraId = searchParams.get("cameraId");

console.log(cameraId);

//récupération des informations du produit concerné grâce à l'API fetch
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
    document.getElementById("cameraDescription").textContent =
      camera.description;

    /**********************************************************************************************/
    // pour chaque lentille : ajouter un <option  qui contient la lentille au select
    // grâce au .innerHTML qui permet d'injecter du code HTML depuis le javascript

    for (const lens of camera.lenses) {
      document.getElementById("cameraLenses").innerHTML +=
        "<option>" + lens + "</option>";
    }

    // puis dans le javascript, écouter son évènement "click"
    document.getElementById("orderBtn").addEventListener("click", function () {
      const selectedLens = document.getElementById("cameraLenses").value;
      // et au clic, ajouter au localStorage
      localStorage.setItem("cart", {
          id: camera._id, lens: selectedLens
      });

    });

  });
 /************************************Le local storage **********************************************************/
  /**************************************Stocker un objet dans le local storage********************************************************/
  //fonction fenetre pop up
  const popUpConfirmation = () =>{
    
  }
// s'il y a dejà des produits enregistrés dans le local storage
if(selectedLens){
  selectedLens.push();
  localStorage.setItem("cart", JSON.stringify( {
    id: camera._id, lens: selectedLens
  }));
  console.log(selectedLens);
  popUpConfirmation();
}
 //s'il n y a pas de produit enregistré dans le local storage
 else{
  selectedLens = [];
  selectedLens.push();
  localStorage.setItem("cart", JSON.stringify( {
    id: camera._id, lens: selectedLens
  }));
  console.log(selectedLens);
  popUpConfirmation();
 }
 /*************************************Stocker la récupération des valeurs du formulaire*********************************************************/
