# Google Cloud Vision API Setup

## 🔑 Get API Key (Free Tier Available)

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create new project** or select existing one
3. **Enable Vision API**:
   - Go to "APIs & Services" > "Library"
   - Search "Cloud Vision API"
   - Click "Enable"
4. **Create API Key**:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "API Key"
   - Copy your API key

## 🛠️ Setup Instructions

1. **Replace API Key** in `script.js`:
   ```javascript
   // Find this line:
   const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=YOUR_API_KEY'
   
   // Replace YOUR_API_KEY with your actual key:
   const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyC...'
   ```

2. **Enable HTTPS** (required for camera access):
   - Use a local server like `python -m http.server 8000`
   - Or deploy to GitHub Pages, Netlify, etc.

## 💰 Pricing (Very Affordable)

- **Free Tier**: 1,000 requests/month
- **After free tier**: $1.50 per 1,000 requests
- Perfect for personal recipe scanning!

## 🚀 Alternative: Tesseract.js (Offline)

If you prefer offline processing, keep the current Tesseract.js setup:

```javascript
// Add this to index.html head:
<script src="https://unpkg.com/tesseract.js@v4.1.1/dist/tesseract.min.js"></script>

// Replace processImageWithOCR function:
async function processImageWithOCR(imageBlob) {
    const { data: { text } } = await Tesseract.recognize(imageBlob, 'eng');
    document.getElementById('recipeText').value = text;
}
```

## ✅ Recommendation

**Use Google Vision API** for best results - it's specifically designed for mobile photos and has much better accuracy than Tesseract.js for recipe scanning.