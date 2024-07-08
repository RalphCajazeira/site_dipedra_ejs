document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const productGrid = document.getElementById("product-grid");

  // Função para buscar categorias e imagens dinamicamente
  function fetchCategories() {
    fetch("/api/mostruario")
      .then((response) => response.json())
      .then((data) => displayCategories(data))
      .catch((error) => console.error("Erro ao carregar categorias:", error));
  }

  function displayCategories(categories) {
    productGrid.innerHTML = "";
    categories.forEach((category) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.classList.add("image-item");
      categoryDiv.innerHTML = `
        <a href="/mostruario/${category.name}">
          <div class="image-container">
            <img src="/img/mostruario/${category.name}/capa.jpg" alt="${category.name}" onerror="this.src='/img/Upload.png'"/>
          </div>
          <div class="text-container">
            <p>${category.name}</p>
          </div>
        </a>
      `;
      productGrid.appendChild(categoryDiv);
    });
  }

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm)
    );
    displayCategories(filteredCategories);
  });

  fetchCategories(); // Carrega as categorias ao iniciar
});
