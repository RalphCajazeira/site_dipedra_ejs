document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");
  const filterContainer = document.getElementById("filter-container");
  const searchInput = document.getElementById("search-input");

  fetch("/api/mostruario/filters")
    .then((response) => response.json())
    .then((filters) => renderFilters(filters))
    .catch((error) => console.error("Erro ao carregar filtros:", error));

  function renderFilters(filters) {
    Object.keys(filters).forEach((key) => {
      const filterDiv = document.createElement("div");
      filterDiv.classList.add("filter");
      filterDiv.innerHTML = `<h3>${key}</h3>`;
      filters[key].forEach((option) => {
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = option;
        checkbox.id = `${key}-${option}`;
        const label = document.createElement("label");
        label.htmlFor = `${key}-${option}`;
        label.textContent = option;
        filterDiv.appendChild(checkbox);
        filterDiv.appendChild(label);

        checkbox.addEventListener("change", () => {
          fetchImages();
        });
      });
      filterContainer.appendChild(filterDiv);
    });
  }

  searchInput.addEventListener("input", fetchImages);

  fetchImages();

  function fetchImages() {
    const query = searchInput.value.toLowerCase();
    const filters = Array.from(
      filterContainer.querySelectorAll("input:checked")
    ).map((cb) => cb.value);

    fetch(
      `/api/mostruario/images?category=${query}&filters=${filters.join(",")}`
    )
      .then((response) => response.json())
      .then((images) => renderImages(images))
      .catch((error) => console.error("Erro ao carregar imagens:", error));
  }

  function renderImages(images) {
    productGrid.innerHTML = "";
    images.forEach((image) => {
      const imageItem = document.createElement("div");
      imageItem.classList.add("image-item");
      imageItem.innerHTML = `
        <div class="image-container">
          <img src="${image.path}" alt="Produto">
        </div>
        <div class="text-container">
          <p>${image.name}</p>
        </div>
      `;
      productGrid.appendChild(imageItem);
    });
  }
});
