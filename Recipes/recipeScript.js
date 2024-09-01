
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");
    
    const recipesContainer = document.getElementById('recipes');
    console.log("Recipes container found:", recipesContainer);

    // Only fetch data if it hasn't already been done
    if (recipesContainer.childElementCount === 0) {
        fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert')
            .then(response => response.json())
            .then(data => {
                console.log("Data fetched from API:", data);

                if (!data || !data.meals) {
                    console.error("No meals found in the data");
                    recipesContainer.innerHTML = '<p>No recipes found.</p>';
                    return;
                }

                data.meals.forEach(recipe => {
                    console.log("Processing recipe:", recipe);

                    if (recipe.strMealThumb && recipe.strMeal) {
                        const recipeCard = document.createElement('div');
                        recipeCard.className = 'card';
                        recipeCard.innerHTML = `
                            <img src="${recipe.strMealThumb}" class="card-img-top" alt="${recipe.strMeal}">
                            <div class="card-body">
                                <h5 class="card-title">${recipe.strMeal}</h5>
                            </div>
                        `;

                        recipeCard.addEventListener('click', () => {
                            console.log("Recipe clicked:", recipe.strMeal);
                            openRecipeDetail(recipe.idMeal);
                        });

                        recipesContainer.appendChild(recipeCard);
                    }
                });
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
                recipesContainer.innerHTML = '<p>Error loading recipes. Please try again later.</p>';
            });
    }

    // Close recipe detail when clicking outside of it
    document.addEventListener('click', (event) => {
        const recipeDetailContainer = document.getElementById('recipe-detail');
        if (recipeDetailContainer.classList.contains('open') &&
            !recipeDetailContainer.contains(event.target) &&
            !event.target.closest('.card')) {
            closeRecipeDetail();
        }
    });
});

function openRecipeDetail(recipeId) {
    console.log("Opening recipe detail for ID:", recipeId);

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
        .then(response => response.json())
        .then(data => {
            console.log("Full recipe details fetched:", data);

            const recipe = data.meals[0];
            const recipeDetailContainer = document.getElementById('recipe-detail');
            recipeDetailContainer.innerHTML = `
                <span class="close-btn">&times;</span>
                <h2>${recipe.strMeal}</h2>
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
                <h3>Ingredients:</h3>
                <ul>
                    ${Object.keys(recipe)
                    .filter(key => key.startsWith('strIngredient') && recipe[key])
                    .map(key => {
                        const index = key.replace('strIngredient', '');
                        const measure = recipe[`strMeasure${index}`] || 'No measurement provided';
                        return `<li>${recipe[key]} - ${measure}</li>`;
                    })
                    .join('')}
                </ul>
                <h3>Instructions:</h3>
                <p>${recipe.strInstructions}</p>
            `;
            recipeDetailContainer.classList.add('open');
            document.body.classList.add('no-scroll');

            // Attach the close button event listener after it's added to the DOM
            const closeBtn = document.querySelector('.close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    closeRecipeDetail();
                });
            }
        })
        .catch(error => {
            console.error('Error fetching recipe details:', error);
        });
}

function closeRecipeDetail() {
    const recipeDetailContainer = document.getElementById('recipe-detail');
    recipeDetailContainer.classList.remove('open');
    document.body.classList.remove('no-scroll');
}
