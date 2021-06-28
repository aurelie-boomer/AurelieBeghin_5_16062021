var urlSearchParams = URL.searchParams;

let params = (new URL(document.location)).searchParams;
let name = params.get('nom'); 
let age = parseInt(params.get('age')); 


//Il faut enregistrer au clic l id dans ton URL vers camera.html --> sur la page index ou produit?

//Une fois fait sur produit.js tu le récupères en faisans une recherche id dans l'URL via urlsearchparam par exemple
produit.html?id=...


fetch