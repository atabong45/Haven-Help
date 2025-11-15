import { fetchData } from "./modules/dataLoader.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialise l'affichage des logements sur la page d'accueil.
  if (document.getElementById("accommodations-list")) {
    loadAccommodations();
  }

  // Initialise les icônes Lucide sur toute la page
  lucide.createIcons();
});


async function loadAccommodations() {
  const accommodations = await fetchData("data/accommodations.json");
  const container = document.getElementById("accommodations-list");

  if (!container) return;

  if (accommodations.length === 0) {
    container.innerHTML = "<p>Aucun logement à afficher pour le moment.</p>";
    return;
  }

  container.innerHTML = accommodations
    .map(
      (acc) => `
        <div class="card accommodation-card">
            <img src="${acc.image}" alt="${acc.title}">
            <div class="card-content">
                <div class="card-header">
                    <span class="card-type">${acc.type}</span>
                    <span class="card-rating">⭐ ${acc.rating}</span>
                </div>
                <h3 class="card-title">${acc.title}</h3>
                <p class="card-location">${acc.location}</p>
                <div class="card-footer">
                    <span class="card-price">${acc.price}XAF / nuit</span>
                    <a href="pages/detail-logement.html?id=${acc.id}" class="btn btn-sm">Voir</a>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}
