// ============================================
// ENGLISH DICTIONARY MINI - JAVASCRIPT
// ============================================

// 1. GET DOM ELEMENTS
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error');
const loadingDiv = document.getElementById('loading');
const playSound = document.getElementById('playSound');
const wordImageSection = document.getElementById('wordImageSection');
const wordImage = document.getElementById('wordImage');

// 2. API CONFIGURATION
const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const WIKI_IMG_API = 'https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=600&origin=*&titles=';

// 3. EVENT LISTENERS
searchBtn.addEventListener('click', searchWord);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchWord();
  }
});

playSound.addEventListener('click', playAudio);

// 4. SEARCH WORD FUNCTION
async function searchWord() {
  const word = searchInput.value.trim();

  // Validate input
  if (!word) {
    showError('Please enter a word!');
    hideResult();
    return;
  }

  // Show loading, hide error
  showLoading();
  hideError();
  hideResult();

  try {
    // Fetch dictionary data and image in parallel
    const [response, imageUrl] = await Promise.all([
      fetch(`${API_URL}${word.toLowerCase()}`),
      fetchWordImage(word)
    ]);

    // Handle 404 error
    if (!response.ok) {
      if (response.status === 404) {
        showError(`Sorry, we couldn't find the word "${word}". Try another one!`);
      } else {
        showError('An error occurred. Please try again!');
      }
      hideLoading();
      return;
    }

    // Parse response
    const data = await response.json();
    
    // Display results
    displayResult(data[0], imageUrl);
    hideError();
    hideLoading();

  } catch (error) {
    console.error('Error:', error);
    showError('An error occurred. Please try again!');
    hideLoading();
  }
}

// 5. FETCH WORD IMAGE FROM WIKIPEDIA
async function fetchWordImage(word) {
  try {
    const response = await fetch(`${WIKI_IMG_API}${encodeURIComponent(word)}`);
    if (!response.ok) return null;
    const data = await response.json();
    const pages = data.query && data.query.pages;
    if (!pages) return null;
    const pageId = Object.keys(pages)[0];
    if (pageId === '-1') return null;
    const thumbnail = pages[pageId].thumbnail;
    return thumbnail ? thumbnail.source : null;
  } catch (error) {
    console.log('Could not fetch word image');
    return null;
  }
}

// 6. DISPLAY RESULT FUNCTION
function displayResult(wordData, imageUrl) {
  // Extract data
  const word = wordData.word;
  const phonetic = wordData.phonetic || '';
  const meanings = wordData.meanings || [];
  const phonetics = wordData.phonetics || [];
  const sourceUrls = wordData.sourceUrls || [];

  // Display word image
  if (imageUrl) {
    wordImage.src = imageUrl;
    wordImage.alt = `Image for "${word}"`;
    wordImage.onerror = () => {
      wordImageSection.classList.add('hidden');
    };
    wordImageSection.classList.remove('hidden');
  } else {
    wordImageSection.classList.add('hidden');
  }

  // Set word title and phonetic
  document.getElementById('wordTitle').textContent = word;
  document.getElementById('wordPhonetic').textContent = phonetic || '';

  // Store audio URL for play button
  const audioData = phonetics.find(p => p.audio);
  if (audioData) {
    playSound.dataset.audio = audioData.audio;
    playSound.style.opacity = '1';
    playSound.style.cursor = 'pointer';
  } else {
    delete playSound.dataset.audio;
    playSound.style.opacity = '0.5';
    playSound.style.cursor = 'not-allowed';
  }

  // Display meanings
  const partsOfSpeechDiv = document.getElementById('partsOfSpeech');
  partsOfSpeechDiv.innerHTML = '';

  meanings.forEach((meaning) => {
    const partOfSpeech = meaning.partOfSpeech;
    const definitions = meaning.definitions || [];
    const synonyms = meaning.synonyms || [];
    const antonyms = meaning.antonyms || [];

    // Create part of speech section
    const partDiv = document.createElement('div');
    partDiv.className = 'part-of-speech';

    // Part of speech title
    const titleDiv = document.createElement('div');
    titleDiv.className = 'part-of-speech-title';
    titleDiv.textContent = partOfSpeech;

    // Definitions
    const definitionsDiv = document.createElement('div');
    definitionsDiv.className = 'definitions';

    definitions.slice(0, 3).forEach((def) => {
      const defItem = document.createElement('div');
      defItem.className = 'definition-item';

      const defText = document.createElement('div');
      defText.className = 'definition-text';
      defText.textContent = def.definition;

      defItem.appendChild(defText);

      if (def.example) {
        const exampleDiv = document.createElement('div');
        exampleDiv.className = 'definition-example';
        exampleDiv.textContent = `"${def.example}"`;
        defItem.appendChild(exampleDiv);
      }

      definitionsDiv.appendChild(defItem);
    });

    partDiv.appendChild(titleDiv);
    partDiv.appendChild(definitionsDiv);

    // Add synonyms if available
    if (synonyms.length > 0) {
      const synDiv = document.createElement('div');
      synDiv.style.marginTop = 'var(--spacing-sm)';
      synDiv.innerHTML = '<strong style="color: var(--text-dark); font-size: 0.85rem;">✨ Synonyms:</strong>';
      const synList = document.createElement('div');
      synList.style.display = 'flex';
      synList.style.flexWrap = 'wrap';
      synList.style.gap = 'var(--spacing-xs)';
      synList.style.marginTop = '8px';

      synonyms.slice(0, 5).forEach((syn) => {
        const synTag = document.createElement('span');
        synTag.className = 'synonym-tag';
        synTag.textContent = syn;
        synTag.addEventListener('click', () => {
          searchInput.value = syn;
          searchWord();
        });
        synList.appendChild(synTag);
      });

      synDiv.appendChild(synList);
      partDiv.appendChild(synDiv);
    }

    // Add antonyms if available
    if (antonyms.length > 0) {
      const antDiv = document.createElement('div');
      antDiv.style.marginTop = 'var(--spacing-sm)';
      antDiv.innerHTML = '<strong style="color: var(--text-dark); font-size: 0.85rem;">🔄 Antonyms:</strong>';
      const antList = document.createElement('div');
      antList.style.display = 'flex';
      antList.style.flexWrap = 'wrap';
      antList.style.gap = 'var(--spacing-xs)';
      antList.style.marginTop = '8px';

      antonyms.slice(0, 5).forEach((ant) => {
        const antTag = document.createElement('span');
        antTag.className = 'antonym-tag';
        antTag.textContent = ant;
        antTag.addEventListener('click', () => {
          searchInput.value = ant;
          searchWord();
        });
        antList.appendChild(antTag);
      });

      antDiv.appendChild(antList);
      partDiv.appendChild(antDiv);
    }

    partsOfSpeechDiv.appendChild(partDiv);
  });

  // Display source
  const sourceDiv = document.getElementById('sourceSection');
  if (sourceUrls.length > 0) {
    sourceDiv.classList.remove('hidden');
    const sourceLink = document.getElementById('sourceLink');
    sourceLink.href = sourceUrls[0];
    sourceLink.textContent = sourceUrls[0];
  } else {
    sourceDiv.classList.add('hidden');
  }

  // Show result
  showResult();
}

// 7. PLAY AUDIO FUNCTION
function playAudio() {
  const audioUrl = playSound.dataset.audio;

  if (!audioUrl) {
    console.log('No audio available');
    return;
  }

  const audio = new Audio(audioUrl);
  audio.play().catch((error) => {
    console.error('Error playing audio:', error);
  });
}

// 8. UI HELPER FUNCTIONS
function showError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
}

function hideError() {
  errorDiv.textContent = '';
  errorDiv.classList.add('hidden');
}

function showLoading() {
  loadingDiv.classList.remove('hidden');
}

function hideLoading() {
  loadingDiv.classList.add('hidden');
}

function showResult() {
  resultDiv.classList.remove('hidden');
}

function hideResult() {
  resultDiv.classList.add('hidden');
}

// 9. FOCUS ON INPUT WHEN PAGE LOADS
window.addEventListener('load', () => {
  searchInput.focus();
});