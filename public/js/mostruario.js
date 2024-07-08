document.addEventListener("DOMContentLoaded", () => {
  // Função para carregar categorias do mostruário
  fetch("/api/mostruario")
    .then((response) => response.json())
    .then((data) => {
      const productGrid = document.getElementById("product-grid");
      productGrid.innerHTML = "";

      data.forEach((category) => {
        const categoryItem = document.createElement("div");
        categoryItem.classList.add("image-item");

        categoryItem.innerHTML = `
          <a href="/mostruario/${category.name}">
            <div class="image-container">
              <img src="${category.image}" alt="${category.name}" />
            </div>
            <div class="text-container">
              <p>${category.name}</p>
            </div>
          </a>
        `;

        productGrid.appendChild(categoryItem);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar categorias:", error);
    });
});
