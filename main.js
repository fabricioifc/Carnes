async function loadRecipes() {
    try {
      const response = await fetch("receitas.json");
      return await response.json();
    } catch (error) {
      console.error("Erro ao carregar receitas:", error);
      return [];
    }
  }

  function createRecipeCard(recipe) {
    return `
      <div class="column is-12-mobile is-12-tablet is-6-desktop">
        <div class="card recipe-card">
          <div class="card-image recipe-image-container">
            <figure class="image is-16by9">
              <img
                src="${recipe.image}"
                alt="${recipe.title}"
                class="recipe-image"
              />
            </figure>
          </div>
          <div class="card-content">
            <p class="title is-4">${recipe.title}</p>
            <p class="subtitle is-6">${recipe.description}</p>
            <div class="content">
              <h5 class="has-text-weight-bold">Ingredientes:</h5>
              <ul>${recipe.ingredients
                .map((ing) => `<li>${ing}</li>`)
                .join("")}</ul>
              <h5 class="has-text-weight-bold">Base de Segurança:</h5>
              <ul>${recipe.base.map((b) => `<li>${b}</li>`).join("")}</ul>
              <h5 class="has-text-weight-bold">Modo de Preparo:</h5>
              <ol>${recipe.preparation
                .map((step) => `<li>${step}</li>`)
                .join("")}</ol>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  document.addEventListener("DOMContentLoaded", async () => {
    const recipesContainer = document.getElementById("recipes");
    const darkModeToggle = document.getElementById("darkModeToggle");

    const darkMode = localStorage.getItem("dark-mode");
    if (darkMode === "enabled") {
      document.body.classList.add("dark-mode");
      darkModeToggle.textContent = "☀️";
      darkModeToggle.classList.replace("is-light", "is-dark");
    }

    const recipes = await loadRecipes();
    recipes.forEach((recipe) => {
      recipesContainer.innerHTML += createRecipeCard(recipe);
    });

    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDarkMode = document.body.classList.contains("dark-mode");
      darkModeToggle.textContent = isDarkMode ? "☀️" : "🌓";
      darkModeToggle.classList.toggle("is-light", !isDarkMode);
      darkModeToggle.classList.toggle("is-dark", isDarkMode);
      localStorage.setItem(
        "dark-mode",
        isDarkMode ? "enabled" : "disabled"
      );
    });
  });