import { fetchData } from "./modules/dataLoader.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialise les icônes sur la page
  lucide.createIcons();

  // Récupère l'ID du logement depuis l'URL
  const params = new URLSearchParams(window.location.search);
  const accommodationId = params.get("id");

  if (!accommodationId) {
    document.querySelector(".container").innerHTML =
      "<h1>Erreur : Logement non trouvé.</h1>";
    return;
  }

  // Charge les données et affiche les détails
  loadAccommodationDetails(accommodationId);
  loadReviews(accommodationId);

  // Initialise les onglets
  initTabs();
});

async function loadAccommodationDetails(id) {
  const accommodations = await fetchData("../data/accommodations.json");
  const accommodation = accommodations.find((acc) => acc.id == id);

  if (!accommodation) {
    document.querySelector(".container").innerHTML =
      "<h1>Erreur : Logement non trouvé.</h1>";
    return;
  }

  // Remplir les informations textuelles
  document.getElementById("accommodation-title").textContent =
    accommodation.title;
  document.getElementById("accommodation-rating").textContent =
    accommodation.rating;
  document.getElementById("accommodation-location").textContent =
    accommodation.location;
  document.getElementById(
    "accommodation-guests"
  ).textContent = `${accommodation.guests} voyageurs`;
  document.getElementById(
    "accommodation-bedrooms"
  ).textContent = `${accommodation.bedrooms} chambres`;
  document.getElementById(
    "accommodation-bathrooms"
  ).textContent = `${accommodation.bathrooms} salles de bain`;
  document.getElementById("description-panel").textContent =
    accommodation.description;
  document.getElementById(
    "accommodation-price"
  ).textContent = `${accommodation.price}XAF`;

  const mapContainer = document.querySelector(".map-placeholder");
  if (accommodation.mapIframe) {
    mapContainer.innerHTML = accommodation.mapIframe;
  }

  // Remplir la galerie d'images
  const gallerySlider = document.getElementById("gallery-slider");
  gallerySlider.innerHTML = accommodation.gallery
    .map(
      (imgUrl) => `
        <div class="slide"><img src="${imgUrl}" alt="Photo du logement"></div>
    `
    )
    .join("");

  // Remplir les équipements
  const amenitiesPanel = document.getElementById("amenities-panel");
  amenitiesPanel.innerHTML = accommodation.amenities
    .map(
      (amenity) => `
        <div class="amenity-item"><i data-lucide="check-circle"></i> ${amenity}</div>
    `
    )
    .join("");

  // Ré-initialiser les icônes après avoir ajouté les équipements
  lucide.createIcons();

  // Initialiser le slider
  initImageSlider(accommodation.gallery.length);
}

async function loadReviews(accommodationId) {
  const reviewsData = await fetchData("/data/reviews.json");
  const reviews = reviewsData.accommodations[accommodationId];
  const container = document.getElementById("reviews-panel");

  if (!reviews || reviews.length === 0) {
    container.innerHTML = "<p>Aucun avis pour le moment.</p>";
    return;
  }

  // Mettre à jour le compteur d'avis dans l'onglet
  const reviewTabButton = document.querySelector(
    '.tab-btn[data-tab="reviews"]'
  );
  if (reviewTabButton) {
    reviewTabButton.textContent = `Avis (${reviews.length})`;
  }

  container.innerHTML = reviews
    .map((review) => {
      // Logique pour générer les étoiles
      let starsHtml = "";
      for (let i = 0; i < 5; i++) {
        starsHtml += `<i data-lucide="star" class="${
          i < review.rating ? "filled" : ""
        }"></i>`;
      }

      // Logique pour générer la réponse de l'hôte (si elle existe)
      const responseHtml = review.response
        ? `
            <div class="owner-response">
                <div class="response-header">Réponse de l'hôte</div>
                <p class="response-text">${review.response.text}</p>
            </div>
        `
        : "";

      return `
            <div class="review-card">
                <div class="review-header">
                    <div class="review-user">
                        <img src="${review.userAvatar}" alt="Avatar de ${
        review.userName
      }">
                        <div>
                            <div class="user-name">${review.userName}</div>
                            <div class="review-date">${new Date(
                              review.date
                            ).toLocaleDateString("fr-FR", {
                              year: "numeric",
                              month: "long",
                            })}</div>
                        </div>
                    </div>
                    <div class="review-rating">${starsHtml}</div>
                </div>
                <p class="review-comment">${review.comment}</p>
                ${responseHtml}
            </div>
        `;
    })
    .join("");

  lucide.createIcons();
}

function initImageSlider(slideCount) {
  const slider = document.getElementById("gallery-slider");
  const prevBtn = document.getElementById("prev-slide");
  const nextBtn = document.getElementById("next-slide");
  const counter = document.getElementById("gallery-counter");
  let currentIndex = 0;

  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    counter.textContent = `${currentIndex + 1} / ${slideCount}`;
  }

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slideCount;
    updateSlider();
  });

  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    updateSlider();
  });

  updateSlider(); // Affiche la première slide et le compteur
}

function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Retirer 'active' de tous les boutons et panneaux
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanels.forEach((panel) => panel.classList.remove("active"));

      // Ajouter 'active' au bouton cliqué et au panneau correspondant
      button.classList.add("active");
      const targetPanel = document.getElementById(
        `${button.dataset.tab}-panel`
      );
      if (targetPanel) {
        targetPanel.classList.add("active");
      }
    });
  });
}
