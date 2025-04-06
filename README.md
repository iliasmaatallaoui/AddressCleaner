# 🇨🇦 Address Accented Character Normalizer

This JavaScript utility replaces accented characters in address fields in the Canada Post "Find A postal Code" page with their unaccented equivalents to ensure compatibility with systems such as Salesforce/UPS Address validation APIs.

✨ **Already available as a Chrome Extension on the Chrome Web Store!**  
This repo provides the standalone code and implementation details for transparency, self-hosting, or extension of the logic.

---

## 🔧 Why This Exists

Accented characters in user-submitted address fields can cause issues in third-party integrations (e.g., UPS's validation services). This script ensures that only standard ASCII characters are used in address outputs by:

- Replacing accented characters on **initial page load**
- Observing dynamic DOM changes and replacing new characters automatically

---

## ✨ Features

- ✅ Replaces accented characters (e.g., `é` → `e`, `ü` → `u`)
- 🔄 Watches for and handles dynamic content changes
- ⚡ Lightweight and dependency-free
- 💼 Used in production via a published Chrome Extension

---

## 🚀 Usage

You can use this code in two ways:

### Option 1: As a Chrome Extension (already published)

Search for **"AddressCleaner"** on the [Chrome Web Store](https://chrome.google.com/webstore/). Or use this [link](https://chromewebstore.google.com/detail/addresscleaner/bmicgfnhadidhjcfelhebjcjibnkjcld) and install directly.

### Option 2: Include in your own project

Customise the script as needed and Include it in your page or bundle it into your app:

```html
<script src="path/to/replaceAccentedCharacters.js"></script> 
```
Or via ES module:
```
import './replaceAccentedCharacters.js';
```

## 🔍 How It Works

1. Targets address elements using the selectors:

    - .result

    - .postal-code-text

2. Replaces accented characters using a defined character map

3. Uses a MutationObserver to detect:

    -  New DOM nodes

    - Attribute changes

    - Character data edits

4. Automatically updates those elements in real time

## Example

Before:
```
123 Crémazie St, Montréal, QC
```

After:
```
123 Cremazie St, Montreal, QC
```


## 🛠️ Customization

To target additional or different elements on your site:
```
const addressElements = document.querySelectorAll('.your-custom-class');
```
Update the replaceAddressText() and replaceTextInNode() functions accordingly to include your custom selectors.

## 📄 License

MIT License