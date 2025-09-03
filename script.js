let recipes = JSON.parse(localStorage.getItem('recipeKeeperData')) || [];
let currentRecipeId = null;
let currentCategory = 'all';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadRecipes();
    setupSearch();
    setupImageUpload();
});

// Setup search
function setupSearch() {
    document.getElementById('searchInput').addEventListener('input', loadRecipes);
}

// Setup image upload preview
function setupImageUpload() {
    document.getElementById('recipeImage').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('previewImg').src = e.target.result;
                document.getElementById('imagePreview').style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    });
}

// Load and display recipes
function loadRecipes() {
    const grid = document.getElementById('recipesGrid');
    const emptyState = document.getElementById('emptyState');
    
    let filteredRecipes = recipes;
    
    // Apply category filter
    if (currentCategory !== 'all') {
        filteredRecipes = recipes.filter(r => r.category === currentCategory);
    }
    
    // Apply search filter
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm) {
        filteredRecipes = filteredRecipes.filter(r => 
            r.name.toLowerCase().includes(searchTerm) ||
            r.text.toLowerCase().includes(searchTerm)
        );
    }
    
    if (filteredRecipes.length === 0) {
        grid.style.display = 'none';
        emptyState.style.display = 'block';
    } else {
        grid.style.display = 'grid';
        emptyState.style.display = 'none';
        
        grid.innerHTML = filteredRecipes.map(recipe => `
            <div class="recipe-card" onclick="viewRecipe(${recipe.id})">
                <div class="recipe-image">
                    ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.name}">` : getCategoryIcon(recipe.category)}
                </div>
                <div class="recipe-info">
                    <div class="recipe-title">${recipe.name}</div>
                    <div class="recipe-meta">${recipe.category} • ${recipe.date}</div>
                </div>
            </div>
        `).join('');
    }
}

// Get category icon
function getCategoryIcon(category) {
    const icons = {
        breakfast: '🥞',
        lunch: '🥗',
        dinner: '🍽️',
        dessert: '🍰',
        snack: '🍿'
    };
    return icons[category] || '🍽️';
}

// Filter by category
function filterCategory(category) {
    currentCategory = category;
    
    // Update active chip
    document.querySelectorAll('.category-chip').forEach(chip => {
        chip.classList.remove('active');
    });
    event.target.classList.add('active');
    
    loadRecipes();
}

// Show add options
function showAddOptions() {
    document.getElementById('addOptionsModal').style.display = 'flex';
}

// Scan recipe
async function scanRecipe() {
    closeModal('addOptionsModal');
    
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' } 
        });
        
        // Create video element for capture
        const video = document.createElement('video');
        video.srcObject = stream;
        video.play();
        
        video.onloadedmetadata = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0);
            
            // Stop camera
            stream.getTracks().forEach(track => track.stop());
            
            // Process with OCR
            canvas.toBlob(async (blob) => {
                try {
                    const { data: { text } } = await Tesseract.recognize(blob, 'eng');
                    
                    if (text.trim()) {
                        const lines = text.split('\\n').filter(line => line.trim().length > 2);
                        const recipeName = lines[0] || 'Scanned Recipe';
                        
                        showRecipeForm();
                        document.getElementById('recipeName').value = recipeName.trim();
                        document.getElementById('recipeText').value = text.trim();
                    } else {
                        alert('No text found. Please try again or add manually.');
                        showAddOptions();
                    }
                } catch (err) {
                    alert('Scan failed. Please add manually.');
                    showAddOptions();
                }
            });
        };
        
    } catch (err) {
        alert('Camera access denied. Please add recipe manually.');
        showAddOptions();
    }
}

// Add manually
function addManually() {
    closeModal('addOptionsModal');
    showRecipeForm();
}

// Show recipe form
function showRecipeForm() {
    document.getElementById('formTitle').textContent = currentRecipeId ? 'Edit Recipe' : 'Add Recipe';
    document.getElementById('recipeFormModal').style.display = 'flex';
    
    if (!currentRecipeId) {
        document.getElementById('recipeForm').reset();
        document.getElementById('imagePreview').style.display = 'none';
    }
}

// Close recipe form
function closeRecipeForm() {
    closeModal('recipeFormModal');
    currentRecipeId = null;
    document.getElementById('imagePreview').style.display = 'none';
}

// Handle form submission
document.getElementById('recipeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('recipeName').value.trim();
    const category = document.getElementById('recipeCategory').value;
    const text = document.getElementById('recipeText').value.trim();
    const imageFile = document.getElementById('recipeImage').files[0];
    
    if (!name || !text) {
        alert('Please fill in recipe name and content');
        return;
    }
    
    // Handle image
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
            saveRecipeData(name, category, text, e.target.result);
        };
        reader.readAsDataURL(imageFile);
    } else {
        const existingImage = currentRecipeId ? recipes.find(r => r.id === currentRecipeId)?.image : null;
        saveRecipeData(name, category, text, existingImage);
    }
});

// Save recipe data
function saveRecipeData(name, category, text, image) {
    if (currentRecipeId) {
        // Update existing recipe
        const index = recipes.findIndex(r => r.id === currentRecipeId);
        if (index !== -1) {
            recipes[index] = { ...recipes[index], name, category, text, image };
        }
    } else {
        // Add new recipe
        recipes.unshift({
            id: Date.now(),
            name,
            category,
            text,
            image,
            date: new Date().toLocaleDateString()
        });
    }
    
    localStorage.setItem('recipeKeeperData', JSON.stringify(recipes));
    loadRecipes();
    closeRecipeForm();
}

// View recipe details
function viewRecipe(id) {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;
    
    currentRecipeId = id;
    
    const detailHeader = document.getElementById('recipeDetailHeader');
    if (recipe.image) {
        detailHeader.innerHTML = `
            <button class="close-btn" onclick="closeModal('recipeDetailModal')" style="position: absolute; top: 15px; right: 15px; background: rgba(0,0,0,0.5);">&times;</button>
            <img src="${recipe.image}" alt="${recipe.name}">
        `;
    } else {
        detailHeader.innerHTML = `
            <button class="close-btn" onclick="closeModal('recipeDetailModal')" style="position: absolute; top: 15px; right: 15px; background: rgba(0,0,0,0.5);">&times;</button>
            <div id="recipeDetailIcon">${getCategoryIcon(recipe.category)}</div>
        `;
    }
    
    document.getElementById('recipeDetailTitle').textContent = recipe.name;
    document.getElementById('recipeDetailMeta').textContent = `${recipe.category} • Added ${recipe.date}`;
    document.getElementById('recipeDetailText').textContent = recipe.text;
    
    document.getElementById('recipeDetailModal').style.display = 'flex';
}

// Edit recipe
function editRecipe() {
    const recipe = recipes.find(r => r.id === currentRecipeId);
    if (!recipe) return;
    
    closeModal('recipeDetailModal');
    
    document.getElementById('recipeName').value = recipe.name;
    document.getElementById('recipeCategory').value = recipe.category;
    document.getElementById('recipeText').value = recipe.text;
    
    // Show existing image if available
    if (recipe.image) {
        document.getElementById('previewImg').src = recipe.image;
        document.getElementById('imagePreview').style.display = 'block';
    }
    
    showRecipeForm();
}

// Delete recipe
function deleteRecipe() {
    if (confirm('Delete this recipe permanently?')) {
        recipes = recipes.filter(r => r.id !== currentRecipeId);
        localStorage.setItem('recipeKeeperData', JSON.stringify(recipes));
        loadRecipes();
        closeModal('recipeDetailModal');
        currentRecipeId = null;
    }
}

// Export recipes
function exportRecipes() {
    if (recipes.length === 0) {
        alert('No recipes to export!');
        return;
    }
    
    const dataStr = JSON.stringify(recipes, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-recipes.json';
    link.click();
    
    URL.revokeObjectURL(url);
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}