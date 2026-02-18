let allCards = [];
let filteredCards = [];
let selectedFilters = new Set();
let searchQuery = "";
let isExactSearch = false;

let currentBatchIndex = 0;
const CARDS_PER_BATCH = 10;
const SCROLL_BUFFER = 100;

const cardListContainer = document.querySelector(".card-list");
const filterButtons = document.querySelectorAll(".filter__btn");
const allButton = document.querySelector('.filter__btn[data-filter="all"]');

const imageObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.src;
        if (src) {
          img.src = src;
          img.classList.add("card__image--loaded");
          imageObserver.unobserve(img);
        }
      }
    });
  },
  { rootMargin: "50px" },
);

function createCardElement(cardData) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.category = cardData.tag.toLowerCase();

  const mediaDiv = document.createElement("div");
  mediaDiv.className = "card__media";

  const img = document.createElement("img");
  img.dataset.src = cardData.imageUrl;
  img.src =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='400' height='300' fill='%23333'/%3E%3C/svg%3E";
  img.alt = cardData.title;
  img.className = "card__image";
  mediaDiv.appendChild(img);

  const contentDiv = document.createElement("div");
  contentDiv.className = "card__content";

  const title = document.createElement("h3");
  title.className = "card__title";
  title.textContent = cardData.title;

  const description = document.createElement("p");
  description.className = "card__description";
  description.textContent = cardData.description;

  const category = document.createElement("span");
  category.className = "card__category";
  category.textContent = cardData.tag;

  contentDiv.appendChild(title);
  contentDiv.appendChild(description);
  contentDiv.appendChild(category);

  card.appendChild(mediaDiv);
  card.appendChild(contentDiv);

  imageObserver.observe(img);
  return card;
}

function renderBatch() {
  const startIndex = currentBatchIndex * CARDS_PER_BATCH;
  const endIndex = startIndex + CARDS_PER_BATCH;
  const batch = filteredCards.slice(startIndex, endIndex);

  if (batch.length === 0) {
    if (currentBatchIndex === 0) {
      cardListContainer.innerHTML =
        '<div class="no-results">No cards found matching your criteria.</div>';
    }
    return false;
  }

  const fragment = document.createDocumentFragment();
  batch.forEach((cardData) => {
    const cardElement = createCardElement(cardData);
    fragment.appendChild(cardElement);
  });

  cardListContainer.appendChild(fragment);
  currentBatchIndex++;

  return batch.length === CARDS_PER_BATCH;
}

function applyFilters() {
  filteredCards = allCards.filter((card) => {
    const matchesFilter =
      selectedFilters.size === 0 || selectedFilters.has(card.tag.toLowerCase());

    let matchesSearch = true;
    if (searchQuery.trim()) {
      const cardTitle = card.title.toLowerCase();
      const query = searchQuery.toLowerCase().trim();

      if (isExactSearch) {
        matchesSearch = cardTitle === query;
      } else {
        matchesSearch = cardTitle.includes(query);
      }
    }

    return matchesFilter && matchesSearch;
  });
}

function resetAndRender() {
  cardListContainer.innerHTML = "";
  currentBatchIndex = 0;
  applyFilters();
  renderBatch();
  setupInfiniteScroll();
}
function updateFilterUI() {
  const categoryButtons = Array.from(filterButtons).filter(
    (btn) => btn.dataset.filter !== "all",
  );

  if (selectedFilters.size === 0) {
    allButton.classList.add("is-active");
    categoryButtons.forEach((btn) => btn.classList.remove("is-active"));
  } else {
    allButton.classList.remove("is-active");
    categoryButtons.forEach((btn) => {
      if (selectedFilters.has(btn.dataset.filter)) {
        btn.classList.add("is-active");
      } else {
        btn.classList.remove("is-active");
      }
    });
  }
}

function setupFilterButtons() {
  const categoryButtons = Array.from(filterButtons).filter(
    (btn) => btn.dataset.filter !== "all",
  );

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filterValue = button.dataset.filter;

      if (filterValue === "all") {
        selectedFilters.clear();
      } else {
        if (selectedFilters.has(filterValue)) {
          selectedFilters.delete(filterValue);
        } else {
          selectedFilters.add(filterValue);
        }

        if (selectedFilters.size === categoryButtons.length) {
          selectedFilters.clear();
        }
      }

      updateFilterUI();
      resetAndRender();
    });
  });
}

function handleScroll() {
  const scrollPosition = window.innerHeight + window.scrollY;
  const bottomPosition = document.documentElement.scrollHeight - SCROLL_BUFFER;

  if (scrollPosition >= bottomPosition) {
    const hasMore = renderBatch();
    if (!hasMore) {
      window.removeEventListener("scroll", handleScroll);
    }
  }
}

function setupInfiniteScroll() {
  window.removeEventListener("scroll", handleScroll);
  if (filteredCards.length > CARDS_PER_BATCH) {
    window.addEventListener("scroll", handleScroll, { passive: true });
  }
}

(async function init() {
  try {
    const response = await fetch("./assets/data/cards.json");
    allCards = await response.json();

    resetAndRender();
    setupFilterButtons();
  } catch (error) {
    console.error("Initialization error:", error);
  }
})();
