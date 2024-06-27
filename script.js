const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('results');

function searchRecipes() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm !== '') {
    fetch(`https://api.edamam.com/search?q=${searchTerm}&app_id=ef084de4&app_key=589865c2d7f86a30ce904ed6f247981d   `)
      .then(response => response.json())
      .then(data => displayRecipes(data.hits))
      .catch(error => console.error('Error fetching data:', error));
  } else {
    resultsContainer.innerHTML = '<p>Please enter a search term</p>';
  }
}

function displayRecipes(recipes) {
  resultsContainer.innerHTML = '';

  if (recipes.length === 0) {
    resultsContainer.innerHTML = '<p>No recipes found</p>';
    return;
  }

  recipes.forEach(recipe => {
    const { label, image, url } = recipe.recipe;
    const recipeElement = `
      <div class="recipe">
        <h2>${label}</h2>
        <img src="${image}" alt="${label}" /><br>
        <a href="${url}" target="_blank">View Recipe</a>
      </div>
    `;
    resultsContainer.innerHTML += recipeElement;
  });
}
