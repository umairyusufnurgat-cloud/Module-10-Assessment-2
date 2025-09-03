// Sample recipe data
let recipes = JSON.parse(localStorage.getItem('recipes')) || [
    {
        id: 1,
        name: 'Classic Chocolate Chip Cookies',
        category: 'dessert',
        time: '25 mins',
        difficulty: 'Easy',
        servings: 24,
        image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&h=400&fit=crop',
        ingredients: [
            '2¼ cups all-purpose flour',
            '1 tsp baking soda',
            '1 tsp salt',
            '1 cup butter, softened',
            '¾ cup granulated sugar',
            '¾ cup brown sugar',
            '2 large eggs',
            '2 tsp vanilla extract',
            '2 cups chocolate chips'
        ],
        instructions: [
            'Preheat oven to 375°F (190°C)',
            'Mix flour, baking soda, and salt in a bowl',
            'Cream butter and sugars until fluffy',
            'Beat in eggs and vanilla',
            'Gradually blend in flour mixture',
            'Stir in chocolate chips',
            'Drop rounded tablespoons onto ungreased cookie sheets',
            'Bake 9-11 minutes until golden brown'
        ]
    },
    {
        id: 2,
        name: 'Mediterranean Quinoa Salad',
        category: 'lunch',
        time: '20 mins',
        difficulty: 'Easy',
        servings: 4,
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
        ingredients: [
            '1 cup quinoa',
            '2 cups vegetable broth',
            '1 cucumber, diced',
            '2 tomatoes, chopped',
            '½ red onion, finely chopped',
            '½ cup kalamata olives',
            '½ cup feta cheese, crumbled',
            '¼ cup olive oil',
            '2 tbsp lemon juice',
            'Fresh herbs (parsley, mint)'
        ],
        instructions: [
            'Rinse quinoa under cold water',
            'Bring broth to boil, add quinoa',
            'Reduce heat, simmer covered for 15 minutes',
            'Let quinoa cool completely',
            'Dice cucumber and tomatoes',
            'Chop red onion and herbs',
            'Whisk olive oil and lemon juice',
            'Combine all ingredients and toss',
            'Chill for 30 minutes before serving'
        ]
    },
    {
        id: 3,
        name: 'Fluffy Pancakes',
        category: 'breakfast',
        time: '15 mins',
        difficulty: 'Easy',
        servings: 4,
        image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop',
        ingredients: [
            '2 cups all-purpose flour',
            '2 tbsp sugar',
            '2 tsp baking powder',
            '1 tsp salt',
            '2 large eggs',
            '1¾ cups milk',
            '¼ cup melted butter',
            '1 tsp vanilla extract',
            'Butter for cooking'
        ],
        instructions: [
            'Mix dry ingredients in a large bowl',
            'Whisk eggs, milk, melted butter, and vanilla',
            'Pour wet ingredients into dry ingredients',
            'Stir until just combined (lumps are okay)',
            'Heat griddle or pan over medium heat',
            'Pour ¼ cup batter for each pancake',
            'Cook until bubbles form on surface',
            'Flip and cook until golden brown'
        ]
    }
];

let currentFilter = 'all';
let currentRecipeId = null;

// DOM Elements
const recipesGrid = document.getElementById('recipesGrid');
const searchInput = document.getElementById('searchInput');
const recipeModal = document.getElementById('recipeModal');
const addRecipeModal = document.getElementById('addRecipeModal');
const recipeForm = document.getElementById('recipeForm');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    renderRecipes();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    recipeForm.addEventListener('submit', handleAddRecipe);
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === recipeModal) closeRecipeModal();
        if (e.target === addRecipeModal) hideAddRecipe();
    });
}

// Render recipes
function renderRecipes(recipesToRender = recipes) {
    if (recipesToRender.length === 0) {
        recipesGrid.innerHTML = '<p style="text-align: center; color: white; font-size: 1.2rem; grid-column: 1/-1;">No recipes found. Try a different search or category.</p>';
        return;
    }
    recipesGrid.innerHTML = recipesToRender.map(recipe => `
        <div class="recipe-card" onclick="showRecipeDetail(${recipe.id})">
            <img src="${recipe.image}" alt="${recipe.name}" class="recipe-image" 
                 onerror="this.src='https://via.placeholder.com/600x400/f0f0f0/999?text=Recipe+Image'">
            <div class="recipe-info">
                <h3 class="recipe-title">${recipe.name}</h3>
                <div class="recipe-meta">
                    <span class="meta-item">⏱️ ${recipe.time}</span>
                    <span class="meta-item difficulty-${recipe.difficulty.toLowerCase()}">${getDifficultyIcon(recipe.difficulty)} ${recipe.difficulty}</span>
                    <span class="meta-item">👥 ${recipe.servings} servings</span>
                </div>
                <p class="recipe-preview">${recipe.ingredients.slice(0, 3).join(', ')}...</p>
            </div>
        </div>
    `).join('');
}

// Get difficulty icon
function getDifficultyIcon(difficulty) {
    const icons = { Easy: '🟢', Medium: '🟡', Hard: '🔴' };
    return icons[difficulty] || '⚪';
}

// Filter recipes by category
function filterRecipes(category) {
    currentFilter = category;
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Filter and render
    const filtered = category === 'all' ? recipes : recipes.filter(r => r.category === category);
    renderRecipes(filtered);
}

// Handle search
function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const filtered = recipes.filter(recipe => 
        recipe.name.toLowerCase().includes(query) ||
        recipe.ingredients.some(ing => ing.toLowerCase().includes(query)) ||
        recipe.category.toLowerCase().includes(query)
    );
    
    // Apply category filter if active
    const finalFiltered = currentFilter === 'all' ? filtered : 
        filtered.filter(r => r.category === currentFilter);
    
    renderRecipes(finalFiltered);
}

// Show recipe detail modal
function showRecipeDetail(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;
    
    currentRecipeId = recipeId;
    
    document.getElementById('modalImage').src = recipe.image;
    document.getElementById('modalTitle').textContent = recipe.name;
    document.getElementById('modalTime').innerHTML = `⏱️ ${recipe.time}`;
    document.getElementById('modalDifficulty').innerHTML = `${getDifficultyIcon(recipe.difficulty)} ${recipe.difficulty}`;
    document.getElementById('modalServings').innerHTML = `👥 ${recipe.servings} servings`;
    
    document.getElementById('modalIngredients').innerHTML = recipe.ingredients
        .map(ing => `<li>${ing}</li>`).join('');
    
    document.getElementById('modalInstructions').innerHTML = recipe.instructions
        .map(inst => `<li>${inst}</li>`).join('');
    
    recipeModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Edit recipe function
function editRecipe() {
    if (!currentRecipeId) return;
    
    const recipe = recipes.find(r => r.id === currentRecipeId);
    if (!recipe) return;
    
    // Populate edit form with current recipe data
    document.getElementById('recipeName').value = recipe.name;
    document.getElementById('recipeCategory').value = recipe.category;
    document.getElementById('recipeTime').value = recipe.time;
    document.getElementById('recipeDifficulty').value = recipe.difficulty;
    document.getElementById('recipeServings').value = recipe.servings;
    document.getElementById('recipeImage').value = recipe.image;
    document.getElementById('recipeIngredients').value = recipe.ingredients.join('\n');
    document.getElementById('recipeInstructions').value = recipe.instructions.join('\n');
    
    // Close recipe modal and show edit modal
    closeRecipeModal();
    showAddRecipe();
    
    // Change form title and button text
    document.querySelector('.add-recipe-form h2').textContent = 'Edit Recipe';
    document.querySelector('.submit-btn').textContent = 'Update Recipe';
}

// Delete recipe function
function deleteRecipe() {
    if (!currentRecipeId) return;
    
    if (confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
        recipes = recipes.filter(r => r.id !== currentRecipeId);
        saveRecipes();
        renderRecipes();
        closeRecipeModal();
        showNotification('Recipe deleted successfully! 🗑️');
        currentRecipeId = null;
    }
}

// Close recipe modal
function closeRecipeModal() {
    recipeModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentRecipeId = null;
}

// Show add recipe modal
function showAddRecipe() {
    addRecipeModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Hide add recipe modal
function hideAddRecipe() {
    addRecipeModal.style.display = 'none';
    document.body.style.overflow = 'auto';
    recipeForm.reset();
    currentRecipeId = null;
    
    // Reset form title and button text
    document.querySelector('.add-recipe-form h2').textContent = 'Create New Recipe';
    document.querySelector('.submit-btn').textContent = 'Create Recipe';
    
    // Hide image preview
    document.getElementById('imagePreview').style.display = 'none';
}

// Handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;
            document.getElementById('recipeImage').value = imageData;
            
            // Show preview
            const preview = document.getElementById('imagePreview');
            const previewImg = document.getElementById('previewImg');
            previewImg.src = imageData;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

// Handle add recipe form submission
function handleAddRecipe(e) {
    e.preventDefault();
    
    const isEditing = currentRecipeId !== null;
    const imageValue = document.getElementById('recipeImage').value || 'https://via.placeholder.com/600x400/f0f0f0/999?text=Recipe+Image';
    
    if (isEditing) {
        // Update existing recipe
        const recipeIndex = recipes.findIndex(r => r.id === currentRecipeId);
        if (recipeIndex !== -1) {
            recipes[recipeIndex] = {
                ...recipes[recipeIndex],
                name: document.getElementById('recipeName').value,
                category: document.getElementById('recipeCategory').value,
                time: document.getElementById('recipeTime').value,
                difficulty: document.getElementById('recipeDifficulty').value,
                servings: parseInt(document.getElementById('recipeServings').value),
                image: imageValue,
                ingredients: document.getElementById('recipeIngredients').value.split('\n').filter(ing => ing.trim()),
                instructions: document.getElementById('recipeInstructions').value.split('\n').filter(inst => inst.trim())
            };
        }
        showNotification('Recipe updated successfully! ✏️');
    } else {
        // Add new recipe
        const newRecipe = {
            id: Date.now(),
            name: document.getElementById('recipeName').value,
            category: document.getElementById('recipeCategory').value,
            time: document.getElementById('recipeTime').value,
            difficulty: document.getElementById('recipeDifficulty').value,
            servings: parseInt(document.getElementById('recipeServings').value),
            image: imageValue,
            ingredients: document.getElementById('recipeIngredients').value.split('\n').filter(ing => ing.trim()),
            instructions: document.getElementById('recipeInstructions').value.split('\n').filter(inst => inst.trim())
        };
        
        recipes.unshift(newRecipe);
        showNotification('Recipe added successfully! 🎉');
    }
    
    saveRecipes();
    renderRecipes();
    hideAddRecipe();
}

// Save recipes to localStorage
function saveRecipes() {
    localStorage.setItem('recipes', JSON.stringify(recipes));
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #ff6b6b, #feca57);
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        box-shadow: 0 15px 35px rgba(0,0,0,0.2);
        z-index: 1001;
        animation: slideIn 0.4s ease;
        font-weight: 600;
        backdrop-filter: blur(20px);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);