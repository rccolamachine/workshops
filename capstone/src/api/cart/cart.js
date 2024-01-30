async function getCartByUserId(userId) {
  try {
    const res = await fetch(`https://fakestoreapi.com/carts/user/${userId}`);
    const json = await res.json();
    return json[0].products;
  } catch (err) {
    throw err;
  }
}

export { getCartByUserId };
