import { fetchData } from "./modules/dataLoader.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialise les icônes sur la page
  lucide.createIcons();

  // Récupère l'ID du service depuis l'URL (ex: ?id=1)
  const params = new URLSearchParams(window.location.search);
  const serviceId = params.get("id");

  if (!serviceId) {
    document.querySelector(".container").innerHTML =
      "<h1>Erreur : Service non spécifié.</h1>";
    return;
  }

  loadServiceDetails(serviceId);
  loadReviews(serviceId);
  initTabs(); // On réutilise la même logique d'onglets que pour les logements
});

async function loadServiceDetails(id) {
  const services = await fetchData("../data/services.json");
  const service = services.find((s) => s.id == id);

  if (!service) {
    document.querySelector(".container").innerHTML =
      "<h1>Erreur : Service introuvable.</h1>";
    return;
  }

  // --- Remplissage des informations ---

  // Image principale et tag de catégorie
  document.getElementById("service-image").src = service.image;
  document.getElementById("service-image").alt = service.title;
  document.getElementById("service-category-tag").textContent =
    service.category;

  // Titre et note
  document.getElementById("service-title").textContent = service.title;
  document.getElementById("service-rating").textContent = service.rating;

  // Carte du prestataire
  document.getElementById("provider-avatar").textContent =
    service.providerName.charAt(0);
  document.getElementById("provider-name").textContent = service.providerName;
  document.getElementById("provider-experience").textContent =
    service.experience;
  document.getElementById("provider-location").textContent = service.location;
  if (service.certified) {
    document.getElementById("provider-certified").style.display = "inline-flex";
  }

  // Contenu des onglets
  document.getElementById("description-panel").textContent =
    service.description;

  // Section des certifications (si elles existent)
  if (service.certifications && service.certifications.length > 0) {
    const list = document.getElementById("certifications-list");
    list.innerHTML = service.certifications
      .map((cert) => `<li><i data-lucide="check"></i> ${cert}</li>`)
      .join("");
    document.getElementById("certifications-section").style.display = "block";
  }

  // Carte de réservation/devis
  const priceType = service.priceType === "heure" ? "/ heure" : " (forfait)";
  document.getElementById(
    "service-price"
  ).textContent = `${service.price} XAF ${priceType}`;

  // Liens de contact
  document.getElementById("provider-email").textContent = service.email;
  document.getElementById(
    "provider-email-link"
  ).href = `mailto:${service.email}`;
  document.getElementById("provider-phone").textContent = service.phone;
  document.getElementById(
    "provider-phone-link"
  ).href = `tel:${service.phone.replace(/\s/g, "")}`;

  // On ré-exécute Lucide pour créer les icônes ajoutées dynamiquement
  lucide.createIcons();
}

async function loadReviews(serviceId) {
  const reviewsData = await fetchData("/data/reviews.json");
  const reviews = reviewsData.services[serviceId];
  const container = document.getElementById("reviews-panel");

  if (!reviews || reviews.length === 0) {
    container.innerHTML = "<p>Aucun avis pour le moment.</p>";
    const reviewTabButton = document.querySelector(
      '.tab-btn[data-tab="reviews"]'
    );
    if (reviewTabButton) {
      reviewTabButton.textContent = `Avis (0)`;
    }
    return;
  }

  const reviewTabButton = document.querySelector(
    '.tab-btn[data-tab="reviews"]'
  );
  if (reviewTabButton) {
    reviewTabButton.textContent = `Avis (${reviews.length})`;
  }

  container.innerHTML = reviews
    .map((review) => {
      let starsHtml = "";
      for (let i = 0; i < 5; i++) {
        starsHtml += `<i data-lucide="star" class="${
          i < review.rating ? "filled" : ""
        }"></i>`;
      }

      const responseHtml = review.response
        ? `
            <div class="owner-response">
                <div class="response-header">Réponse du prestataire</div>
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
                            <!-- LA CORRECTION EST SUR LA LIGNE CI-DESSOUS -->
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

// EXACTEMENT la même fonction que pour la page detail-logement.js
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanels.forEach((panel) => panel.classList.remove("active"));

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
