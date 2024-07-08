document.addEventListener("DOMContentLoaded", () => {
  const fetchFilters = async () => {
    try {
      const response = await fetch("/api/mostruario/filters");
      const filters = await response.json();
      renderFilters(filters);
    } catch (error) {
      console.error("Erro ao carregar filtros: ", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/mostruario");
      const categories = await response.json();
      renderCategories(categories);
    } catch (error) {
      console.error("Erro ao carregar categorias: ", error);
    }
  };

  const renderFilters = (filters) => {
    const filterContainer = document.querySelector(".filter-container");
    Object.keys(filters).forEach((key) => {
      const filterGroup = document.createElement("div");
      filterGroup.classList.add("filter-group");

      const filterLabel = document.createElement("label");
      filterLabel.textContent = key.charAt(0).toUpperCase() + key.slice(1);
      filterGroup.appendChild(filterLabel);

      filters[key].forEach((value) => {
        const filterItem = document.createElement("div");
        filterItem.classList.add("filter-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `${key}-${value}`;
        checkbox.name = key;
        checkbox.value = value;

        const label = document.createElement("label");
        label.htmlFor = checkbox.id;
        label.textContent = value;

        filterItem.appendChild(checkbox);
        filterItem.appendChild(label);
        filterGroup.appendChild(filterItem);
      });

      filterContainer.appendChild(filterGroup);
    });
  };

  const renderCategories = (categories) => {
    const productGrid = document.getElementById("product-grid");
    productGrid.innerHTML = "";
    categories.forEach((category) => {
      const imageItem = document.createElement("div");
      imageItem.classList.add("image-item");

      const anchor = document.createElement("a");
      anchor.href = "#";

      const imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");

      const img = document.createElement("img");
      img.src = `/img/mostruario/${category}`;
      img.alt = category.split(" --- ")[1];

      imageContainer.appendChild(img);

      const textContainer = document.createElement("div");
      textContainer.classList.add("text-container");

      const p = document.createElement("p");
      p.textContent = category.split(" --- ")[1];

      textContainer.appendChild(p);
      anchor.appendChild(imageContainer);
      anchor.appendChild(textContainer);
      imageItem.appendChild(anchor);
      productGrid.appendChild(imageItem);
    });
  };

  fetchFilters();
  fetchCategories();
});
