function getCarts() {
  return JSON.parse(sessionStorage.getItem("carts")) || [];
}
function saveCarts(carts) {
  sessionStorage.setItem("carts", JSON.stringify(carts));
}
export function getUserCart(username) {
  const carts = getCarts();
  return carts.find((cart) => cart.username === username);
}

export function update(username, products) {
  let carts = getCarts();
  let existingCart = carts.find((cart) => cart.username === username);

  if (existingCart) {
    // Update existing cart
    existingCart.products = products;
  } else {
    // Create new cart
    carts.push({ username, products });
  }

  saveCarts(carts);
}

export function add(username, products) {
  let carts = getCarts();
  carts.push({ username, products });
  saveCarts(carts);
}
export function addItem(username, id, quantity) {
  let carts = getCarts(),
    cartIndex = carts.findIndex((c) => c.username == username);
  const cart = carts[cartIndex];
  if (!cart) {
    carts.push({ username, products: [{ id, quantity }] });
  } else {
    const isItemExitst = cart.products.some((p, i) => {
      if (p.id == id) {
        cart.products[i].quantity += quantity;
        return true;
      }
      return false;
    });
    if (!isItemExitst) {
      cart.products.push({ id, quantity });
    }
  }
  carts[cartIndex] = cart;
  saveCarts(carts);
}

export function deleting(username) {
  let carts = getCarts();
  carts = carts.filter((cart) => cart.username !== username);
  saveCarts(carts);
}
export function deleteItem(username, id) {
  let carts = getCarts(),
    cartIndex = carts.findIndex((c) => c.username == username);

  if (carts[cartIndex]) {
    carts[cartIndex].products = carts[cartIndex].products.filter(
      ({ id: pId }) => pId != id
    );

    saveCarts(carts);
  }
}
