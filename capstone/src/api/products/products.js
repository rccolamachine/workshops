async function getAllProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products", {
      headers: { "Content-type": "application/json" },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    alert(error);
  }
}

async function getProductById(id) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    const json = await res.json();
    return json;
  } catch (err) {
    throw err;
  }
}

export { getAllProducts, getProductById };
