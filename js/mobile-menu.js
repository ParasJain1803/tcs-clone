document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".nav__hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay");
  const menuSections = document.querySelectorAll(".mobile-menu__section");

  hamburger.addEventListener("click", () => {
    toggleMobileMenu();
  });

  mobileMenuOverlay.addEventListener("click", () => {
    closeMobileMenu();
  });

  function toggleMobileMenu() {
    const isHidden = mobileMenu.classList.contains("mobile-menu--hidden");

    if (isHidden) {
      openMobileMenu();
    } else {
      closeMobileMenu();
    }
  }

  function openMobileMenu() {
    mobileMenu.classList.remove("mobile-menu--hidden");
    mobileMenu.classList.add("mobile-menu--visible");
    mobileMenuOverlay.classList.add("mobile-menu-overlay--visible");
    hamburger.classList.add("nav__hamburger--active");
    document.body.style.overflow = "hidden";
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove("mobile-menu--visible");
    mobileMenu.classList.add("mobile-menu--hidden");
    mobileMenuOverlay.classList.remove("mobile-menu-overlay--visible");
    hamburger.classList.remove("nav__hamburger--active");
    document.body.style.overflow = "";
  }

  menuSections.forEach((section) => {
    const header = section.querySelector(".mobile-menu__header");
    const navItems = section.querySelectorAll(".mobile-menu__item");

    header.addEventListener("click", () => {
      const isActive = section.classList.contains(
        "mobile-menu__section--active",
      );

      menuSections.forEach((s) => {
        s.classList.remove("mobile-menu__section--active");
      });

      if (!isActive) {
        section.classList.add("mobile-menu__section--active");
      }
    });

    navItems.forEach((item) => {
      const itemHeader = item.querySelector(".mobile-menu__item-header");

      itemHeader.addEventListener("click", (e) => {
        e.stopPropagation();
        const isItemActive = item.classList.contains(
          "mobile-menu__item--active",
        );

        navItems.forEach((i) =>
          i.classList.remove("mobile-menu__item--active"),
        );

        if (!isItemActive) {
          item.classList.add("mobile-menu__item--active");
        }
      });
    });
  });
});
