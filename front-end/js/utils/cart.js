export function getCart() {
  //Convertir les données (format JSON) qui sont dans le local storage en objet javascript
  let cart = JSON.parse(localStorage.getItem("cart"));
  if (cart === null) {
    cart = [];
  } 
  return cart;
}

 export function addToCart(item){
    const cart = getCart();  //pour récupérer le panier
    cart.push(item);
    cartJson = JSON.stringify(cart);
    localStorage.setItem("cart", cartJson);

}
