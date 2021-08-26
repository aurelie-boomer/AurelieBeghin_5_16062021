main();
function main() {
  const url = new URL(window.location.href);
  const searchParams = url.searchParams;
  const firstName = searchParams.get("name");
  const orderId = searchParams.get("orderId");
  const totalPrice = searchParams.get("totalPrice");

  document.getElementById("name").textContent = firstName;
  document.getElementById("orderId").textContent = orderId;
  document.getElementById("totalPrice").textContent = totalPrice;
}
