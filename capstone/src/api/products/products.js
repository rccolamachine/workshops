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

export { getAllProducts };
