document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");
  const filterContainer = document.getElementById("filter-container");

  const loadCategories = async () => {
    try {
      const response = await fetch("/api/mostruario");
      const categories = await response.json();
      categories.forEach((category) => {
        const item = document.createElement("div");
        item.className = "image-item";
        item.innerHTML = `
          <a href="/mostruario/${category}">
            <div class="image-container">
              <img src="/img/mostruario/${category}/Capa.jpg" alt="${category}" onerror="this.src='/img/semImagem.png'">
            </div>
            <div class="text-container">
              <p>${category}</p>
            </div>
          </a>
        `;
        productGrid.appendChild(item);
      });
    } catch (error) {
      console.error("Erro ao carregar categorias: ", error);
    }
  };

  const loadFilters = async () => {
    try {
      const response = await fetch("/api/mostruario/filters");
      const filters = await response.json();
      Object.keys(filters).forEach((filterKey) => {
        const filterGroup = document.createElement("div");
        filterGroup.className = "filter-group";
        filterGroup.innerHTML = `<h3>${filterKey}</h3>`;
        filters[filterKey].forEach((filterValue) => {
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.value = filterValue;
          checkbox.id = `${filterKey}-${filterValue}`;
          const label = document.createElement("label");
          label.htmlFor = `${filterKey}-${filterValue}`;
          label.textContent = filterValue;
          filterGroup.appendChild(checkbox);
          filterGroup.appendChild(label);
        });
        filterContainer.appendChild(filterGroup);
      });
    } catch (error) {
      console.error("Erro ao carregar filtros: ", error);
    }
  };

  loadCategories();
  loadFilters();
});
