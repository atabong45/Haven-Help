export function initMobileMenu() {
  const openButton = document.getElementById("mobile-menu-toggle");
  const closeButton = document.getElementById("mobile-nav-close-btn");
  const mobileNav = document.getElementById("mobile-nav");

  // Vérifie que tous les éléments nécessaires sont bien présents
  if (!openButton || !closeButton || !mobileNav) {
    console.error("Un ou plusieurs éléments du menu mobile sont introuvables.");
    return;
  }

  // Le bouton "hamburger" ne fait qu'une chose : ouvrir le menu
  openButton.addEventListener("click", () => {
    mobileNav.classList.add("is-open");
  });

  // Le bouton "X" ne fait qu'une chose : fermer le menu
  closeButton.addEventListener("click", () => {
    mobileNav.classList.remove("is-open");
  });
}
