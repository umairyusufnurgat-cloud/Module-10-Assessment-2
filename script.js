let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
let currentRecipeId = null;
let stream = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadRecipes();
});

// Show main view
function showMain() {
    hideAllViews();
    document.getElementById('mainView').classList.remove('hidden');
    loadRecipes();
}

// Show add form
function showAddForm() {
    hideAllViews();
    document.getElementById('formView').classList.remove('hidden');
    document.getElementById('formTitle').textContent = 'Add Recipe';
    document.getElementById('recipeName').value = '';
    document.getElementById('recipeText').value = '';
    currentRecipeId = null;
}

// Hide all views
function hideAllViews() {
    document.querySelectorAll('#mainView, #cameraView, #processingView, #formView').forEach(view => {
        view.classList.add('hidden');
    });
}

// Start camera
async function startCamera() {
    try {
        hideAllViews();
        document.getElementById('cameraView').classList.remove('hidden');
        
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                facingMode: 'environment',
                width: { ideal: 1280 },
                height: { ideal: 720 }
            } 
        });
        
        document.getElementById('camera').srcObject = stream;
    } catch (err) {
        alert('Camera access denied. Please use file upload instead.');
        showMain();
    }
}

// Stop camera
function stopCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    showMain();
}

// Capture photo and process with OCR
async function capturePhoto() {
    const video = document.getElementById('camera');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    
    stopCamera();
    
    // Show processing view
    hideAllViews();
    document.getElementById('processingView').classList.remove('hidden');
    
    // Convert canvas to blob
    canvas.toBlob(async (blob) => {
        await processImageWithOCR(blob);
    }, 'image/jpeg', 0.8);
}

// Process image with Google Cloud Vision API
async function processImageWithOCR(imageBlob) {
    const progressBar = document.getElementById('progressBar');
    const statusText = document.getElementById('statusText');
    
    try {
        progressBar.style.width = '20%';
        statusText.textContent = 'Preparing image...';
        
        // Convert blob to base64
        const base64 = await blobToBase64(imageBlob);
        
        progressBar.style.width = '50%';
        statusText.textContent = 'Analyzing with Google Vision...';
        
        // Google Cloud Vision API call
        const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCNetldSuYGRmrT4EgSxlkkayb6kSJMnlw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                requests: [{
                    image: {
                        content: base64.split(',')[1] // Remove data:image/jpeg;base64, prefix
                    },
                    features: [{
                        type: 'TEXT_DETECTION',
                        maxResults: 1
                    }]
                }]
            })
        });
        
        progressBar.style.width = '80%';
        statusText.textContent = 'Processing results...';
        
        const result = await response.json();
        
        if (result.responses && result.responses[0] && result.responses[0].textAnnotations) {
            const extractedText = result.responses[0].textAnnotations[0].description;
            
            progressBar.style.width = '100%';
            statusText.textContent = 'Text extracted successfully!';
            
            // Auto-detect recipe name (first line)
            const lines = extractedText.split('\n');
            const recipeName = lines[0] || 'Scanned Recipe';
            
            // Show form with extracted text
            setTimeout(() => {
                hideAllViews();
                document.getElementById('formView').classList.remove('hidden');
                document.getElementById('formTitle').textContent = 'Scanned Recipe';
                document.getElementById('recipeName').value = recipeName;
                document.getElementById('recipeText').value = extractedText;
            }, 1000);
        } else {
            throw new Error('No text found in image');
        }
        
    } catch (error) {
        console.error('OCR Error:', error);
        statusText.textContent = 'Scan failed. Please try again.';
        setTimeout(() => showMain(), 2000);
    }
}

// Convert blob to base64
function blobToBase64(blob) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}

// Save recipe
function saveRecipe() {
    const name = document.getElementById('recipeName').value.trim();
    const text = document.getElementById('recipeText').value.trim();
    
    if (!name || !text) {
        alert('Please fill in both name and recipe text');
        return;
    }
    
    if (currentRecipeId) {
        // Update existing recipe
        const index = recipes.findIndex(r => r.id === currentRecipeId);
        if (index !== -1) {
            recipes[index] = { ...recipes[index], name, text };
        }
    } else {
        // Add new recipe
        recipes.unshift({
            id: Date.now(),
            name,
            text,
            date: new Date().toLocaleDateString()
        });
    }
    
    localStorage.setItem('recipes', JSON.stringify(recipes));
    showMain();
}

// Load and display recipes
function loadRecipes() {
    const container = document.getElementById('recipesList');
    
    if (recipes.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; margin: 40px 0;">No recipes yet. Scan your first recipe!</p>';
        return;
    }
    
    container.innerHTML = recipes.map(recipe => `
        <div class="recipe-card" onclick="viewRecipe(${recipe.id})">
            <h3>${recipe.name}</h3>
            <p style="color: #666; margin: 5px 0;">${recipe.date}</p>
            <p style="color: #888; font-size: 14px;">${recipe.text.substring(0, 100)}...</p>
        </div>
    `).join('');
}

// View recipe details
function viewRecipe(id) {
    const recipe = recipes.find(r => r.id === id);
    if (!recipe) return;
    
    currentRecipeId = id;
    hideAllViews();
    document.getElementById('formView').classList.remove('hidden');
    document.getElementById('formTitle').textContent = recipe.name;
    document.getElementById('recipeName').value = recipe.name;
    document.getElementById('recipeText').value = recipe.text;
}
