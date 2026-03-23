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

// 2. API CONFIGURATION
const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

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
    // Fetch data from API
    const response = await fetch(`${API_URL}${word.toLowerCase()}`);

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
    displayResult(data[0]);
    hideError();
    hideLoading();

  } catch (error) {
    console.error('Error:', error);
    showError('An error occurred. Please try again!');
    hideLoading();
  }
}

// 5. DISPLAY RESULT FUNCTION
function displayResult(wordData) {
  // Extract data
  const word = wordData.word;
  const phonetic = wordData.phonetic || '';
  const meanings = wordData.meanings || [];
  const phonetics = wordData.phonetics || [];
  const sourceUrls = wordData.sourceUrls || [];

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
      synDiv.style.marginTop = 'var(--spacing-md)';
      synDiv.innerHTML = '<strong style="color: var(--text-dark);">Synonyms:</strong>';
      const synList = document.createElement('div');
      synList.style.display = 'flex';
      synList.style.flexWrap = 'wrap';
      synList.style.gap = 'var(--spacing-sm)';
      synList.style.marginTop = 'var(--spacing-sm)';

      synonyms.slice(0, 5).forEach((syn) => {
        const synTag = document.createElement('span');
        synTag.className = 'synonym-tag';
        synTag.textContent = syn;
        synTag.style.cursor = 'pointer';
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
      antDiv.style.marginTop = 'var(--spacing-md)';
      antDiv.innerHTML = '<strong style="color: var(--text-dark);">Antonyms:</strong>';
      const antList = document.createElement('div');
      antList.style.display = 'flex';
      antList.style.flexWrap = 'wrap';
      antList.style.gap = 'var(--spacing-sm)';
      antList.style.marginTop = 'var(--spacing-sm)';

      antonyms.slice(0, 5).forEach((ant) => {
        const antTag = document.createElement('span');
        antTag.className = 'antonym-tag';
        antTag.textContent = ant;
        antTag.style.cursor = 'pointer';
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
  if (sourceUrls.length > 0) {
    const sourceDiv = document.getElementById('sourceSection');
    sourceDiv.classList.remove('hidden');
    const sourceLink = document.getElementById('sourceLink');
    sourceLink.href = sourceUrls[0];
    sourceLink.textContent = sourceUrls[0];
  }

  // Show result
  showResult();
}

// 6. PLAY AUDIO FUNCTION
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

// 7. UI HELPER FUNCTIONS
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

// 8. FOCUS ON INPUT WHEN PAGE LOADS
window.addEventListener('load', () => {
  searchInput.focus();
});