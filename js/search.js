const searchIcon = document.getElementById("searchIcon");
const searchBar = document.getElementById("searchBar");
const searchInput = document.getElementById("searchInput");
const searchClose = document.getElementById("searchClose");
const searchDropdown = document.getElementById("searchDropdown");

let searchDebounceTimer;

function debounce(func, delay) {
  return function (...args) {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => func.apply(this, args), delay);
  };
}

function openSearch() {
  searchBar.classList.add("is-active");
  setTimeout(() => searchInput.focus(), 100);
}

function hideSearch() {
  searchBar.classList.remove("is-active");
  searchDropdown.classList.remove("is-visible");
}

function clearSearch() {
  searchInput.value = "";
  searchQuery = "";
  isExactSearch = false;
  searchDropdown.innerHTML = "";
  searchDropdown.classList.remove("is-visible");
  resetAndRender();
}

function renderDropdownResults(matchingCards, query) {
  searchDropdown.innerHTML = "";

  if (matchingCards.length === 0) {
    searchDropdown.innerHTML = `<div class="nav__search-no-results">No results for "${query}"</div>`;
    searchDropdown.classList.add("is-visible");
    return;
  }

  const fragment = document.createDocumentFragment();
  matchingCards.forEach((card) => {
    const item = document.createElement("div");
    item.className = "nav__search-result";

    item.innerHTML = `
      <h4 class="nav__search-result-title">${card.title}</h4>
      <span class="nav__search-result-category">${card.tag}</span>
    `;

    item.addEventListener("click", (e) => {
      e.stopPropagation();
      searchQuery = card.title;
      isExactSearch = true;
      searchInput.value = card.title;

      resetAndRender();
      hideSearch();
    });

    fragment.appendChild(item);
  });

  searchDropdown.appendChild(fragment);
  searchDropdown.classList.add("is-visible");
}

function handleSearchInput(value) {
  const query = value.trim();

  searchQuery = query;
  isExactSearch = false;

  if (!query) {
    searchDropdown.classList.remove("is-visible");
    resetAndRender();
    return;
  }

  const results = allCards.filter((card) => {
    const matchesFilter =
      selectedFilters.size === 0 || selectedFilters.has(card.tag.toLowerCase());
    const matchesQuery = card.title.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  renderDropdownResults(results, query);
}

searchIcon.addEventListener("click", openSearch);

searchClose.addEventListener("click", (e) => {
  e.stopPropagation();
  clearSearch();
});

const debouncedSearch = debounce((val) => handleSearchInput(val), 300);

searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.value);
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    hideSearch();
  } else if (e.key === "Enter") {
    const query = searchInput.value.trim();
    if (query) {
      searchQuery = query;
      isExactSearch = false;
      resetAndRender();
      searchDropdown.classList.remove("is-visible");
    }
  }
});

document.addEventListener("click", (e) => {
  if (
    searchBar.classList.contains("is-active") &&
    !searchBar.contains(e.target) &&
    e.target !== searchIcon
  ) {
    hideSearch();
  }
});
