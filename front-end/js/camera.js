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
        document.getElementById("cameraDescription").innerHTML =
            "<ul><li>" + camera.description + "</li></ul>";
        //document.getElementById("cameraLenses").textContent = camera.lenses;


/**********************************************************************************************/
// parcourir les lentilles (camera.lenses)   TABLEAU??
           /* for (const lenses of camera.keys(camera)) {
                console.log(lenses);
                var selectElmt = document.getElementById("cameraLenses");
                var valeurselectionnee = selectElmt.options[selectElmt.selectedIndex].value;
                var textselectionne = selectElmt.options[selectElmt.selectedIndex].text;
            }

            addLenses
            //template??

 // pour chaque lentille : ajouter un <option value="laLentille">laLentille</option> qui contient la lentille au select
// grâce au .innerHTML qui permet d'injecter du code HTML depuis le javascript
            const option = document.createElement("option");

            document.getElementById("select").appendChild(option);

            const newElt = document.createElement("option");
            const elt = document.getElementById("select");

            elt.appendChild(newElt);

        
        // document.getElementById("cameraLenses");
        //Fonction pour le tableau lenses
           const lenseList = () => {
        for (let i = 0; i < camera.lenses.length; i++) {
        const option = document.createElement("option") //Créé notre liste option
        option.setAttribute("value", camera.lenses[i]) //Incrémente nos lenses à notre liste option               
        option.innerHTML = camera.lenses[i]
        lenses.appendChild(option)
    }
}

        // puis dans le javascript, écouter son évènement "click"
       /*const lense = document.getElementById("laLentille");
       addlense.addEventListener("click",function(){
           console log("addlense", i);

       });*/

        // et au clic, ajouter au localStorage
    });