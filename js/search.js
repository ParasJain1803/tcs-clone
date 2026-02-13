let searchCards = [];

const searchIcon = document.getElementById('searchIcon');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');
const searchClose = document.getElementById('searchClose');
const searchDropdown = document.getElementById('searchDropdown');

function openSearchBar() {
  searchBar.classList.add('is-active');
  setTimeout(() => {
    searchInput.focus();
  }, 100);
}

function closeSearchBar() {
  searchBar.classList.remove('is-active');
  searchDropdown.classList.remove('is-visible');
  searchInput.value = '';
  searchDropdown.innerHTML = '';
}

function renderSearchResults(results, query) {
  searchDropdown.innerHTML = '';

  if (results.length === 0) {
    searchDropdown.innerHTML = `
      <div class="nav__search-no-results">
        No results found for "${query}"
      </div>
    `;
    searchDropdown.classList.add('is-visible');
    return;
  }

  const fragment = document.createDocumentFragment();

  results.forEach((card) => {
    const resultItem = document.createElement('div');
    resultItem.className = 'nav__search-result';
    
    const title = document.createElement('h4');
    title.className = 'nav__search-result-title';
    title.textContent = card.title;
    
    const category = document.createElement('span');
    category.className = 'nav__search-result-category';
    category.textContent = card.tag;
    
    resultItem.appendChild(title);
    resultItem.appendChild(category);
    
    resultItem.addEventListener('click', () => {
      filterCardsByTitle(card.title);
      closeSearchBar();
    });
    
    fragment.appendChild(resultItem);
  });

  searchDropdown.appendChild(fragment);
  searchDropdown.classList.add('is-visible');
}

function filterCardsByTitle(title) {
  const allCardElements = document.querySelectorAll('.card');
  
  allCardElements.forEach((cardElement) => {
    const cardTitle = cardElement.querySelector('.card__title');
    if (cardTitle && cardTitle.textContent === title) {
      cardElement.style.display = 'flex';
      cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      cardElement.style.display = 'none';
    }
  });
}

function performSearch(query) {
  if (!query.trim()) {
    searchDropdown.classList.remove('is-visible');
    searchDropdown.innerHTML = '';
    return;
  }

  const results = searchCards.filter((card) =>
    card.title.toLowerCase().includes(query.toLowerCase())
  );

  renderSearchResults(results, query);
}

searchIcon.addEventListener('click', openSearchBar);

searchClose.addEventListener('click', closeSearchBar);

searchInput.addEventListener('input', (e) => {
  performSearch(e.target.value);
});

searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSearchBar();
  }
});

document.addEventListener('click', (e) => {
  if (searchBar.classList.contains('is-active') && 
      !searchBar.contains(e.target) && 
      e.target !== searchIcon) {
    closeSearchBar();
  }
});

async function loadSearchData() {
  try {
    const response = await fetch('./assets/data/cards.json');
    searchCards = await response.json();
  } catch (error) {
    console.error('Error loading search data:', error);
  }
}

loadSearchData();
