import { fetchData } from "./modules/dataLoader.js";

let allAccommodations = [];
let currentFilters = {
  searchTerm: "",
  maxPrice: 300000,
  minBedrooms: 1,
  minGuests: 1,
  amenities: [],
};

document.addEventListener("DOMContentLoaded", async () => {
  allAccommodations = await fetchData("/data/accommodations.json"); // Chemin absolu

  populateAmenitiesFilters();
  setupEventListeners();
  applyFilters();
});

function populateAmenitiesFilters() {
  // Crée une liste unique de tous les équipements possibles
  const allAmenities = [
    ...new Set(allAccommodations.flatMap((acc) => acc.amenities || [])),
  ];
  const container = document.getElementById("amenities-filters");

  container.innerHTML = allAmenities
    .map(
      (amenity) => `
        <div class="checkbox-option">
            <input type="checkbox" id="amenity-${amenity.toLowerCase()}" name="amenity" value="${amenity}">
            <label for="amenity-${amenity.toLowerCase()}">${amenity}</label>
        </div>
    `
    )
    .join("");
}

function setupEventListeners() {
  // Recherche par texte
  document.getElementById("search-input").addEventListener("input", (e) => {
    currentFilters.searchTerm = e.target.value.toLowerCase();
    applyFilters();
  });

  // Filtre de prix
  const priceSlider = document.getElementById("price-filter");
  priceSlider.addEventListener("input", (e) => {
    currentFilters.maxPrice = parseInt(e.target.value);
    document.getElementById("price-value-display").textContent =
      currentFilters.maxPrice.toLocaleString();
    applyFilters();
  });

  // Filtres chambres et voyageurs
  document.getElementById("bedrooms-filter").addEventListener("change", (e) => {
    currentFilters.minBedrooms = parseInt(e.target.value) || 1;
    applyFilters();
  });
  document.getElementById("guests-filter").addEventListener("change", (e) => {
    currentFilters.minGuests = parseInt(e.target.value) || 1;
    applyFilters();
  });

  // Filtre des équipements
  document
    .getElementById("amenities-filters")
    .addEventListener("change", () => {
      const checkedAmenities = document.querySelectorAll(
        '#amenities-filters input[name="amenity"]:checked'
      );
      currentFilters.amenities = Array.from(checkedAmenities).map(
        (cb) => cb.value
      );
      applyFilters();
    });

  // Logique pour le menu filtre mobile (réutilisée de la page services)
  const filtersPanel = document.querySelector(".filters-panel");
  document
    .querySelector(".mobile-filter-btn")
    .addEventListener("click", () => filtersPanel.classList.add("is-open"));
  document
    .querySelector(".close-filters-btn")
    .addEventListener("click", () => filtersPanel.classList.remove("is-open"));
}

function applyFilters() {
  let filtered = [...allAccommodations];

  // Appliquer chaque filtre
  if (currentFilters.searchTerm) {
    filtered = filtered.filter((acc) =>
      acc.location.toLowerCase().includes(currentFilters.searchTerm)
    );
  }
  filtered = filtered.filter(
    (acc) => parseInt(acc.price.replace(/\s/g, "")) <= currentFilters.maxPrice
  );
  filtered = filtered.filter(
    (acc) => acc.bedrooms >= currentFilters.minBedrooms
  );
  filtered = filtered.filter((acc) => acc.guests >= currentFilters.minGuests);
  if (currentFilters.amenities.length > 0) {
    filtered = filtered.filter((acc) =>
      currentFilters.amenities.every((amenity) =>
        acc.amenities.includes(amenity)
      )
    );
  }

  displayAccommodations(filtered);
}

// Fonction d'affichage (très similaire à celle de main.js)
function displayAccommodations(accommodations) {
  const container = document.getElementById("accommodations-list");
  document.getElementById("accommodation-count").textContent =
    accommodations.length;

  if (accommodations.length === 0) {
    container.innerHTML = "<p>Aucun logement ne correspond à vos critères.</p>";
    return;
  }

  container.innerHTML = accommodations
    .map(
      (acc) => `
        <div class="card accommodation-card">
            <img src="${acc.image}" alt="${acc.title}"> <!-- Chemin absolu pour l'image -->
            <div class="card-content">
                <div class="card-header">
                    <span class="card-type">${acc.type}</span>
                    <span class="card-rating">⭐ ${acc.rating}</span>
                </div>
                <h3 class="card-title">${acc.title}</h3>
                <p class="card-location">${acc.location}</p>
                <div class="card-footer">
                    <span class="card-price">${acc.price} XAF / nuit</span>
                    <a href="/pages/detail-logement.html?id=${acc.id}" class="btn btn-sm">Voir</a>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}
