import { fetchData } from "./modules/dataLoader.js";

let allServices = []; // Variable pour stocker tous les services
let currentFilters = {
  searchTerm: "",
  category: "all",
  rating: 0,
  priceType: "all",
};

document.addEventListener("DOMContentLoaded", async () => {
  lucide.createIcons();
  allServices = await fetchData("../data/services.json");

  populateCategoryFilters();
  setupEventListeners();
  applyFilters();
});

// Remplit les filtres de catégorie dynamiquement
function populateCategoryFilters() {
  const categories = [
    "all",
    ...new Set(allServices.map((service) => service.category)),
  ];
  const container = document.getElementById("category-filters");

  container.innerHTML = categories
    .map(
      (cat) => `
        <div class="checkbox-option">
            <input type="radio" id="cat-${cat.toLowerCase()}" name="category" value="${cat}" ${
        cat === "all" ? "checked" : ""
      }>
            <label for="cat-${cat.toLowerCase()}">${
        cat === "all" ? "Tous" : cat
      }</label>
        </div>
    `
    )
    .join("");
}

// Met en place tous les écouteurs d'événements
function setupEventListeners() {
  document.getElementById("search-input").addEventListener("input", (e) => {
    currentFilters.searchTerm = e.target.value.toLowerCase();
    applyFilters();
  });

  document
    .getElementById("category-filters")
    .addEventListener("change", (e) => {
      currentFilters.category = e.target.value;
      applyFilters();
    });

  const ratingSlider = document.getElementById("rating-filter");
  ratingSlider.addEventListener("input", (e) => {
    currentFilters.rating = parseFloat(e.target.value);
    document.querySelector(".rating-value span").textContent = e.target.value;
    applyFilters();
  });

  document
    .getElementById("price-type-filters")
    .addEventListener("change", (e) => {
      currentFilters.priceType = e.target.value;
      applyFilters();
    });

  document.getElementById("reset-filters").addEventListener("click", () => {
    window.location.reload();
  });

  // Logique pour le menu filtre mobile
  const filtersPanel = document.querySelector(".filters-panel");
  document.querySelector(".mobile-filter-btn").addEventListener("click", () => {
    filtersPanel.classList.add("is-open");
  });
  document.querySelector(".close-filters-btn").addEventListener("click", () => {
    filtersPanel.classList.remove("is-open");
  });
}

// Fonction principale qui filtre et affiche les services
function applyFilters() {
  let filteredServices = [...allServices];

  // 1. Filtre par recherche textuelle
  if (currentFilters.searchTerm) {
    filteredServices = filteredServices.filter(
      (s) =>
        s.title.toLowerCase().includes(currentFilters.searchTerm) ||
        s.providerName.toLowerCase().includes(currentFilters.searchTerm)
    );
  }

  // 2. Filtre par catégorie
  if (currentFilters.category !== "all") {
    filteredServices = filteredServices.filter(
      (s) => s.category === currentFilters.category
    );
  }

  // 3. Filtre par note
  if (currentFilters.rating > 0) {
    filteredServices = filteredServices.filter(
      (s) => s.rating >= currentFilters.rating
    );
  }

  // 4. Filtre par type de prix
  if (currentFilters.priceType !== "all") {
    filteredServices = filteredServices.filter(
      (s) => s.priceType === currentFilters.priceType
    );
  }

  displayServices(filteredServices);
}

// Affiche les services dans le DOM
function displayServices(services) {
  const container = document.getElementById("services-list");
  document.getElementById("service-count").textContent = services.length;

  if (services.length === 0) {
    container.innerHTML = "<p>Aucun service ne correspond à vos critères.</p>";
    return;
  }

  container.innerHTML = services
    .map(
      (service) => `
        <a href="detail-service.html?id=${
          service.id
        }" class="card service-card">
            <div class="card-img-container">
                <img src="${service.image}" alt="${service.title}">
                <span class="service-tag">${service.category}</span>
                <span class="service-rating"><i data-lucide="star"></i>${
                  service.rating
                }</span>
            </div>
            
            <h3 class="service-title">${service.title}</h3>

            <div class="provider-info">
                <div class="provider-avatar">${service.providerName.charAt(
                  0
                )}</div>
                <div>
                    <div>${service.providerName}</div>
                    <small>${service.experience}</small>
                </div>
            </div>

            <div class="service-meta">
                <span><i data-lucide="map-pin"></i> ${service.location}</span>
                ${
                  service.certified
                    ? `<span><i data-lucide="shield-check"></i> Certifié</span>`
                    : ""
                }
            </div>

            <div class="service-footer">
                <div class="service-price">
                    ${service.price} XAF <span class="price-type">/${
        service.priceType === "heure" ? "heure" : "forfait"
      }</span>
                </div>
                 <i data-lucide="info"></i>
            </div>
        </a>
    `
    )
    .join("");

  lucide.createIcons();
}
