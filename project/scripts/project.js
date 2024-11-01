document.getElementById("currentyear").innerHTML = new Date().getFullYear();
document.getElementById("lastModified").innerHTML = document.lastModified;
document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("favorites.html")) {
        loadFavoriteRecipes();
    } else {
        loadRecipes();
    }
});

const menu = document.getElementById("menu");
const menuButton = document.getElementById("menuButton");
const menuIcon = document.getElementById("menuIcon");

function openMenu() {
    menu.style.left = "0px";
    menuIcon.src = "images/close-square.svg";
}

function closeMenu() {
    menu.style.left = "-250px";
    menuIcon.src = "images/hamburger.svg";
}

menuButton.addEventListener("click", () => {
    if (menu.style.left === "0px") {
        closeMenu();
    } else {
        openMenu();
    }
});

document.addEventListener("click", (event) => {
    const clickInsideMenu = menu.contains(event.target);
    const clickOnButton = menuButton.contains(event.target);

    if (!clickInsideMenu && !clickOnButton && menu.style.left === "0px") {
        closeMenu();
    }
});

function loadRecipes() {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    displayRecipes(recipes);
}

function loadFavoriteRecipes() {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const favoriteRecipes = recipes.filter(recipe => recipe.favorite);
    displayFavoriteRecipes(favoriteRecipes);
}

function displayRecipes(recipes) {
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = "";

    if (recipes.length === 0) {
        recipeList.innerHTML = `
            <div class="no-recipe-message">
            <h2>Welcome to the Recipe Box!</h2>
            <p>It looks like you haven't added any recipes yet. Click the 
            blue '+' button in the lower right corner to add your first
            recipe!</p>
            </div>`;
        return;
    }

    recipes.forEach((recipe, index) => {
        const recipeDiv = document.createElement("div");
        recipeDiv.className = "recipe";
        recipeDiv.dataset.id = index;

        const imageHTML = `<img src="${recipe.image}" loading="lazy" alt="${recipe.title}" class="recipe-image">`;

        recipeDiv.innerHTML = `
            ${imageHTML}
            <h3>${recipe.title}</h3>
            <div class="delete-recipe-button">
            <button onclick="deleteRecipe(${index})">Delete</button>
            </div>
            `;

        recipeDiv.addEventListener("click", () => {
            openRecipeDetailWindow(recipe);
        });

        recipeList.appendChild(recipeDiv);
    });
}

function displayFavoriteRecipes(favoriteRecipes) {
    const favoriteRecipeList = document.getElementById("favorite-recipe-list");
    favoriteRecipeList.innerHTML = "";

    if (favoriteRecipes.length === 0) {
        favoriteRecipeList.innerHTML = `
            <div class="no-recipe-message">
            <h2>No Favorites Yet!</h2>
            <p>Browse to your recipes and add some favorites to see them here!</p>
            </div>`;
        return;
    }

    favoriteRecipes.forEach((recipe, index) => {
        const recipeDiv = document.createElement("div");
        recipeDiv.className = "recipe";
        recipeDiv.dataset.id = index;

        const imageHTML = `<img src="${recipe.image}" loading="lazy" alt="${recipe.title}" class="recipe-image">`;

        recipeDiv.innerHTML = `
            ${imageHTML}
            <h3>${recipe.title}</h3>
            `;

        recipeDiv.addEventListener("click", () => {
            openRecipeDetailWindow(recipe);
        });

        favoriteRecipeList.appendChild(recipeDiv);
    });
}

function openRecipeDetailWindow(recipe) {
    const recipeIndex = JSON.parse(localStorage.getItem("recipes")).findIndex(r => r.title === recipe.title);
    document.getElementById("recipe-detail-title").textContent = recipe.title;
    document.getElementById("recipe-detail-image").src = recipe.image;
    document.getElementById("recipe-detail-ingredients").textContent = recipe.ingredients;
    document.getElementById("recipe-detail-instructions").textContent = recipe.instructions;

    const favoriteButton = document.getElementById("favorite-button");
    favoriteButton.textContent = recipe.favorite ? "★ Favorite" : "☆ Add to Favorites";
    favoriteButton.onclick = () => toggleFavorite(recipeIndex);

    document.getElementById("recipe-detail-window").style.display = "flex";
}

function toggleFavorite(index) {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes[index].favorite = !recipes[index].favorite;
    localStorage.setItem("recipes", JSON.stringify(recipes));

    if (document.getElementById("recipe-list")) {
        loadRecipes();
    } else if (document.getElementById("favorite-recipe-list")) {
        loadFavoriteRecipes();
    }

    openRecipeDetailWindow(recipes[index]);
}

function closeRecipeDetailWindow() {
    document.getElementById("recipe-detail-window").style.display = "none";
}

function saveRecipe(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;
    const imageInput = document.getElementById("image");
    const defaultImage = "images/default-recipe.webp";

    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imageData = e.target.result;

            saveRecipeToLocalStorage(title, ingredients, instructions, imageData);
            closeRecipeWindow();
            loadRecipes();
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        saveRecipeToLocalStorage(title, ingredients, instructions, defaultImage);
        closeRecipeWindow();
        loadRecipes();
    }
}

function saveRecipeToLocalStorage(title, ingredients, instructions, imageData) {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    recipes.push({ title, ingredients, instructions, image: imageData });
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

function searchRecipes() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    const filteredRecipes = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(query) ||
        recipe.ingredients.toLowerCase().includes(query)
    );
    displayRecipes(filteredRecipes);
}

function deleteRecipe(index) {
    const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
    event.stopPropagation();

    recipes.splice(index, 1);

    localStorage.setItem("recipes", JSON.stringify(recipes));

    if (window.location.pathname.includes("favorites.html")) {
        loadFavoriteRecipes();
    } else {
        loadRecipes();
    }
}

function openRecipeWindow() {
    document.getElementById("recipe-window").style.display = "flex";
}

function closeRecipeWindow() {
    document.getElementById("recipe-window").style.display = "none";
    document.getElementById("title").value = "";
    document.getElementById("ingredients").value = "";
    document.getElementById("instructions").value = "";
}