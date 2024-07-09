document.addEventListener("DOMContentLoaded", () => {
  const productGrid = document.getElementById("product-grid");
  const filterContainer = document.getElementById("filter-container");
  const searchInput = document.getElementById("search-input");

  fetch("/api/mostruario/filters")
    .then((response) => response.json())
    .then((filters) => renderFilters(filters))
    .catch((error) => console.error("Erro ao carregar filtros:", error));

  function renderFilters(filters) {
    const filterNames = {
      types: "Tipo da Pedra",
      names: "Nome da Pedra",
      classifications: "Classificação da Pedra",
      styles: "Estilo do Produto",
      environments: "Ambiente",
    };

    Object.keys(filters).forEach((key) => {
      const filterDiv = document.createElement("div");
      filterDiv.classList.add("filter");
      filterDiv.innerHTML = `<h3>${filterNames[key]}</h3>`;
      filters[key].forEach((option) => {
        const checkboxDiv = document.createElement("div");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = option;
        checkbox.id = `${key}-${option}`;
        const label = document.createElement("label");
        label.htmlFor = `${key}-${option}`;
        label.textContent = option.replace(/-/g, " ");
        checkboxDiv.appendChild(checkbox);
        checkboxDiv.appendChild(label);
        filterDiv.appendChild(checkboxDiv);

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
    ).reduce((acc, cb) => {
      const [key, value] = cb.id.split("-");
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(value);
      return acc;
    }, {});

    const filterStrings = Object.keys(filters).map((key) =>
      filters[key].join("|")
    );

    fetch(
      `/api/mostruario/images?category=${query}&filters=${filterStrings.join(
        ","
      )}`
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
          <p>${image.name.replace(/-/g, " ")}</p>
        </div>
      `;
      productGrid.appendChild(imageItem);
    });
  }
});
