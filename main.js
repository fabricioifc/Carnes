// Função para carregar o JSON
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
            <div class="column is-half-tablet is-half-desktop is-half-widescreen">
                <div class="card recipe-card">
                    <div class="card-image recipe-image-container">
                        <figure class="image is-16by9">
                            <img src="${recipe.image}" alt="${
      recipe.title
    }" class="recipe-image" data-full="${recipe.image}">
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content">
                                <p class="title is-4">${recipe.title}</p>
                                <p class="subtitle is-6">${
                                  recipe.description
                                }</p>
                            </div>
                        </div>
                        <div class="content">
                            <h5 class="has-text-weight-bold">Ingredientes:</h5>
                            <ul>${recipe.ingredients
                              .map((ing) => `<li>${ing}</li>`)
                              .join("")}</ul>
                            <h5 class="has-text-weight-bold">Base de Segurança</h5>
                            <ul>${recipe.base
                              .map((b) => `<li>${b}</li>`)
                              .join("")}</ul>
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
    // Verificar se o dark mode está habilitado
    const darkMode = localStorage.getItem("dark-mode");
    if (darkMode === "enabled") {
      document.body.classList.add("dark-mode");
      darkModeToggle.textContent = "☀️";
      darkModeToggle.classList.remove("is-light");
      darkModeToggle.classList.add("is-dark");
    } else {
      document.body.classList.remove("dark-mode");
      darkModeToggle.textContent = "🌓";
      darkModeToggle.classList.remove("is-dark");
      darkModeToggle.classList.add("is-light");
    }

    // Carregar receitas do JSON
    const recipes = await loadRecipes();

    // Render recipes
    recipes.forEach((recipe) => {
      recipesContainer.innerHTML += createRecipeCard(recipe);
    });

    // Dark Mode Toggle
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      // Update button text based on current mode
      if (document.body.classList.contains("dark-mode")) {
        darkModeToggle.textContent = "☀️";
        darkModeToggle.classList.remove("is-light");
        darkModeToggle.classList.add("is-dark");
        localStorage.setItem("dark-mode", "enabled");
      } else {
        darkModeToggle.textContent = "🌓";
        darkModeToggle.classList.remove("is-dark");
        darkModeToggle.classList.add("is-light");
        localStorage.setItem("dark-mode", "disabled");
      }
    });
  });