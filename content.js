/* This script is designed to replace accented characters in address fields to ensure
 * compatibility with external validation systems, specifically when interacting 
 * with the Canada Post database. 
 * Accented characters in addresses can cause issues with certain third-party processes,  
 * so this extension standardizes text content to prevent such disruptions.
 * 
 * Note: This extension is intended for use to improve the accuracy and reliability 
 * of address handling workflows with Canada Post.
 */

const charMap = {
  'á': 'a', 'à': 'a', 'ä': 'a', 'â': 'a', 'ã': 'a', 'å': 'a',
  'ç': 'c',
  'é': 'e', 'è': 'e', 'ë': 'e', 'ê': 'e',
  'í': 'i', 'ì': 'i', 'ï': 'i', 'î': 'i',
  'ñ': 'n',
  'ó': 'o', 'ò': 'o', 'ö': 'o', 'ô': 'o', 'õ': 'o',
  'ú': 'u', 'ù': 'u', 'ü': 'u', 'û': 'u',
  'ý': 'y', 'ÿ': 'y',
  'Á': 'A', 'À': 'A', 'Ä': 'A', 'Â': 'A', 'Ã': 'A', 'Å': 'A',
  'Ç': 'C',
  'É': 'E', 'È': 'E', 'Ë': 'E', 'Ê': 'E',
  'Í': 'I', 'Ì': 'I', 'Ï': 'I', 'Î': 'I',
  'Ñ': 'N',
  'Ó': 'O', 'Ò': 'O', 'Ö': 'O', 'Ô': 'O', 'Õ': 'O',
  'Ú': 'U', 'Ù': 'U', 'Ü': 'U', 'Û': 'U',
  'Ý': 'Y'
};

function replaceaccentedChars(str) {
  return str.split('').map(char => charMap[char] || char).join('');
}

function replaceTextInNode(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    node.textContent = replaceaccentedChars(node.textContent);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    node.childNodes.forEach(replaceTextInNode);
  }
}

function replaceAddressText() {
  const addressElements = document.querySelectorAll('.result, .postal-code-text');

  addressElements.forEach(element => {
    replaceTextInNode(element);
  });

  console.log('Replaced accented characters in displayed address.');
}

function observeDynamicChanges() {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      mutation.addedNodes.forEach(node => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          replaceTextInNode(node);
        }
      });

      if (mutation.type === 'attributes') {
        replaceAddressText();
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true 
  });
}

function initializeReplacements() {
  replaceAddressText();
  observeDynamicChanges();
}

window.addEventListener('load', initializeReplacements);