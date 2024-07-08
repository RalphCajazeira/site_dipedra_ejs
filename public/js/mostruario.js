document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const productGrid = document.getElementById("product-grid");

  const products = [
    { name: "Produto 1", image: "/img/produto1.jpg" },
    { name: "Produto 2", image: "/img/produto2.jpg" },
    { name: "Produto 3", image: "/img/produto3.jpg" },
    // Adicione mais produtos conforme necessário
  ];

  function displayProducts(filteredProducts) {
    productGrid.innerHTML = "";
    filteredProducts.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.classList.add("image-item");
      productItem.innerHTML = `
          <a href="#">
            <div class="image-container">
              <img src="${product.image}" alt="${product.name}" />
            </div>
            <div class="text-container">
              <p>${product.name}</p>
            </div>
          </a>
        `;
      productGrid.appendChild(productItem);
    });
  }

  displayProducts(products);

  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(filter)
    );
    displayProducts(filteredProducts);
  });
});
