document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".nav__hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuSections = document.querySelectorAll(".mobile-menu__section");

  hamburger.addEventListener("click", () => {
    toggleMobileMenu();
  });

  function toggleMobileMenu() {
    const isHidden = mobileMenu.classList.contains("mobile-menu--hidden");
    
    if (isHidden) {
      mobileMenu.classList.remove("mobile-menu--hidden");
      mobileMenu.classList.add("mobile-menu--visible");
      hamburger.classList.add("nav__hamburger--active");
    } else {
      mobileMenu.classList.remove("mobile-menu--visible");
      mobileMenu.classList.add("mobile-menu--hidden");
      hamburger.classList.remove("nav__hamburger--active");
    }
  }

  menuSections.forEach((section) => {
    const header = section.querySelector(".mobile-menu__header");
    
    header.addEventListener("click", () => {
      const isActive = section.classList.contains("mobile-menu__section--active");
      
      menuSections.forEach((s) => {
        s.classList.remove("mobile-menu__section--active");
      });
      
      if (!isActive) {
        section.classList.add("mobile-menu__section--active");
      }
    });
  });
});
