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
    },
    {
        id: 4,
        name: 'Beef Stir Fry',
        category: 'dinner',
        time: '30 mins',
        difficulty: 'Medium',
        servings: 4,
        image: 'data:image/webp;base64,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',
        ingredients: [
            '1 lb beef sirloin, sliced thin',
            '2 tbsp vegetable oil',
            '1 bell pepper, sliced',
            '1 onion, sliced',
            '2 cloves garlic, minced',
            '1 tbsp ginger, minced',
            '3 tbsp soy sauce',
            '2 tbsp oyster sauce',
            '1 tbsp cornstarch',
            'Green onions for garnish'
        ],
        instructions: [
            'Slice beef against the grain',
            'Marinate beef in soy sauce and cornstarch',
            'Heat oil in wok or large skillet',
            'Stir-fry beef until browned, remove',
            'Add vegetables to pan',
            'Stir-fry until crisp-tender',
            'Add garlic and ginger',
            'Return beef to pan with sauces',
            'Toss everything together and serve'
        ]
    },
    {
        id: 5,
        name: 'Avocado Toast',
        category: 'breakfast',
        time: '10 mins',
        difficulty: 'Easy',
        servings: 2,
        image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=600&h=400&fit=crop',
        ingredients: [
            '2 slices whole grain bread',
            '1 ripe avocado',
            '1 tbsp lemon juice',
            'Salt and pepper to taste',
            '2 eggs (optional)',
            'Red pepper flakes',
            'Everything bagel seasoning'
        ],
        instructions: [
            'Toast bread until golden brown',
            'Mash avocado with lemon juice',
            'Season with salt and pepper',
            'Spread avocado on toast',
            'Top with fried egg if desired',
            'Sprinkle with seasonings',
            'Serve immediately'
        ]
    },
    {
        id: 6,
        name: 'Chicken Caesar Salad',
        category: 'lunch',
        time: '25 mins',
        difficulty: 'Medium',
        servings: 4,
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600&h=400&fit=crop',
        ingredients: [
            '2 chicken breasts',
            '1 head romaine lettuce',
            '½ cup parmesan cheese',
            '1 cup croutons',
            '¼ cup caesar dressing',
            '2 tbsp olive oil',
            'Salt and pepper',
            'Lemon wedges'
        ],
        instructions: [
            'Season chicken with salt and pepper',
            'Cook chicken in olive oil until done',
            'Let chicken rest, then slice',
            'Wash and chop romaine lettuce',
            'Toss lettuce with caesar dressing',
            'Add chicken, croutons, and parmesan',
            'Serve with lemon wedges'
        ]
    },
    {
        id: 7,
        name: 'Spaghetti Carbonara',
        category: 'dinner',
        time: '20 mins',
        difficulty: 'Medium',
        servings: 4,
        image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=600&h=400&fit=crop',
        ingredients: [
            '1 lb spaghetti',
            '6 oz pancetta or bacon',
            '4 large eggs',
            '1 cup parmesan cheese',
            '2 cloves garlic',
            'Black pepper',
            'Salt',
            'Fresh parsley'
        ],
        instructions: [
            'Cook spaghetti according to package directions',
            'Cook pancetta until crispy',
            'Whisk eggs with parmesan and pepper',
            'Add minced garlic to pancetta',
            'Drain pasta, reserve pasta water',
            'Toss hot pasta with egg mixture',
            'Add pancetta and pasta water as needed',
            'Garnish with parsley and serve'
        ]
    },

    {
        id: 9,
        name: 'Trail Mix',
        category: 'snack',
        time: '5 mins',
        difficulty: 'Easy',
        servings: 8,
        image: 'data:image/webp;base64,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',
        ingredients: [
            '1 cup almonds',
            '1 cup cashews',
            '½ cup dried cranberries',
            '½ cup chocolate chips',
            '¼ cup sunflower seeds',
            '¼ cup pumpkin seeds',
            'Pinch of sea salt'
        ],
        instructions: [
            'Combine all nuts in a large bowl',
            'Add dried cranberries',
            'Mix in chocolate chips',
            'Add seeds and salt',
            'Toss everything together',
            'Store in airtight container',
            'Enjoy as needed'
        ]
    },
    {
        id: 10,
        name: 'French Toast',
        category: 'breakfast',
        time: '20 mins',
        difficulty: 'Easy',
        servings: 4,
        image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&h=400&fit=crop',
        ingredients: [
            '8 slices thick bread',
            '4 large eggs',
            '1 cup milk',
            '2 tbsp sugar',
            '1 tsp vanilla',
            '½ tsp cinnamon',
            'Butter for cooking',
            'Maple syrup'
        ],
        instructions: [
            'Whisk eggs, milk, sugar, vanilla, and cinnamon',
            'Heat butter in large skillet',
            'Dip bread in egg mixture',
            'Cook until golden on both sides',
            'Keep warm in oven if needed',
            'Serve with maple syrup',
            'Dust with powdered sugar if desired'
        ]
    },
    {
        id: 11,
        name: 'Grilled Salmon',
        category: 'dinner',
        time: '25 mins',
        difficulty: 'Medium',
        servings: 4,
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop',
        ingredients: [
            '4 salmon fillets',
            '2 tbsp olive oil',
            '2 tbsp lemon juice',
            '2 cloves garlic, minced',
            '1 tsp dried dill',
            'Salt and pepper',
            'Lemon slices',
            'Fresh herbs'
        ],
        instructions: [
            'Preheat grill to medium-high',
            'Mix olive oil, lemon juice, garlic, and dill',
            'Season salmon with salt and pepper',
            'Brush with oil mixture',
            'Grill 4-6 minutes per side',
            'Check for doneness',
            'Garnish with lemon and herbs',
            'Serve immediately'
        ]
    },
    {
        id: 12,
        name: 'Caprese Salad',
        category: 'lunch',
        time: '10 mins',
        difficulty: 'Easy',
        servings: 4,
        image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600&h=400&fit=crop',
        ingredients: [
            '4 large tomatoes',
            '8 oz fresh mozzarella',
            'Fresh basil leaves',
            '¼ cup olive oil',
            '2 tbsp balsamic vinegar',
            'Salt and pepper',
            'Balsamic glaze'
        ],
        instructions: [
            'Slice tomatoes and mozzarella',
            'Arrange alternating on plate',
            'Tuck basil leaves between slices',
            'Drizzle with olive oil',
            'Add balsamic vinegar',
            'Season with salt and pepper',
            'Finish with balsamic glaze'
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
    console.log('Recipes loaded:', recipes.length);
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
    console.log('Rendering recipes:', recipesToRender.length);
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

// Handle OCR scan upload
function handleScanUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const scanProgress = document.getElementById('scanProgress');
    const progressFill = document.getElementById('progressFill');
    const scanStatus = document.getElementById('scanStatus');
    
    scanProgress.style.display = 'block';
    scanStatus.textContent = 'Processing image...';
    progressFill.style.width = '0%';
    
    // Use Tesseract.js for OCR
    Tesseract.recognize(
        file,
        'eng',
        {
            logger: m => {
                if (m.status === 'recognizing text') {
                    const progress = Math.round(m.progress * 100);
                    progressFill.style.width = progress + '%';
                    scanStatus.textContent = `Scanning... ${progress}%`;
                }
            }
        }
    ).then(({ data: { text } }) => {
        scanStatus.textContent = 'Extracting recipe data...';
        progressFill.style.width = '100%';
        
        // Parse the extracted text into recipe components
        parseRecipeText(text);
        
        setTimeout(() => {
            scanProgress.style.display = 'none';
            showNotification('Recipe scanned successfully! 📷');
        }, 1000);
        
    }).catch(err => {
        console.error('OCR Error:', err);
        scanProgress.style.display = 'none';
        showNotification('Scan failed. Please try again. ❌');
    });
}

// Parse extracted text into recipe components
function parseRecipeText(text) {
    const lines = text.split('\n').filter(line => line.trim());
    
    let recipeName = '';
    let ingredients = [];
    let instructions = [];
    let servings = '';
    let time = '';
    
    let currentSection = 'title';
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const lowerLine = line.toLowerCase();
        
        // Detect recipe name (usually first significant line)
        if (currentSection === 'title' && line.length > 3 && !recipeName) {
            recipeName = line;
            continue;
        }
        
        // Detect sections
        if (lowerLine.includes('ingredient') || lowerLine.includes('you need') || lowerLine.includes('materials')) {
            currentSection = 'ingredients';
            continue;
        }
        
        if (lowerLine.includes('instruction') || lowerLine.includes('method') || lowerLine.includes('direction') || lowerLine.includes('steps')) {
            currentSection = 'instructions';
            continue;
        }
        
        // Extract servings
        if (lowerLine.includes('serves') || lowerLine.includes('serving')) {
            const match = line.match(/\d+/);
            if (match) servings = match[0];
            continue;
        }
        
        // Extract time
        if (lowerLine.includes('time') || lowerLine.includes('min') || lowerLine.includes('hour')) {
            const timeMatch = line.match(/(\d+\s*(min|hour|hr))/i);
            if (timeMatch) time = timeMatch[0];
            continue;
        }
        
        // Add to current section
        if (currentSection === 'ingredients' && line.length > 2) {
            // Clean up ingredient lines
            let ingredient = line.replace(/^[\u2022\u25cf\u25e6\u2023\u2043*\-\d+\.\)\s]+/, '').trim();
            if (ingredient) ingredients.push(ingredient);
        } else if (currentSection === 'instructions' && line.length > 5) {
            // Clean up instruction lines
            let instruction = line.replace(/^[\u2022\u25cf\u25e6\u2023\u2043*\-\d+\.\)\s]+/, '').trim();
            if (instruction) instructions.push(instruction);
        }
    }
    
    // Auto-fill the form
    if (recipeName) document.getElementById('recipeName').value = recipeName;
    if (servings) document.getElementById('recipeServings').value = servings;
    if (time) document.getElementById('recipeTime').value = time;
    if (ingredients.length > 0) document.getElementById('recipeIngredients').value = ingredients.join('\n');
    if (instructions.length > 0) document.getElementById('recipeInstructions').value = instructions.join('\n');
    
    // Set default category if not detected
    if (!document.getElementById('recipeCategory').value) {
        document.getElementById('recipeCategory').value = 'lunch';
    }
    
    // Set default difficulty
    if (!document.getElementById('recipeDifficulty').value) {
        document.getElementById('recipeDifficulty').value = 'Medium';
    }
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