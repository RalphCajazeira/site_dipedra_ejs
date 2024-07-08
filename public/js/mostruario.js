document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const productGrid = document.getElementById("product-grid");

  fetch("/api/mostruario")
    .then((response) => response.json())
    .then((categories) => {
      categories.forEach((category) => {
        const categoryElement = document.createElement("div");
        categoryElement.classList.add("image-item");
        categoryElement.innerHTML = `
          <a href="/mostruario/${category.name}">
            <div class="image-container">
              <img src="${category.image}" alt="${category.name}">
            </div>
            <div class="text-container">
              <p>${category.name}</p>
            </div>
          </a>
        `;
        productGrid.appendChild(categoryElement);
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar categorias:", error);
    });

  searchInput.addEventListener("input", function () {
    const filter = searchInput.value.toLowerCase();
    const items = productGrid.querySelectorAll(".image-item");

    items.forEach((item) => {
      const text = item.querySelector("p").textContent.toLowerCase();
      if (text.includes(filter)) {
        item.style.display = "";
      } else {
        item.style.display = "none";
      }
    });
  });
});
