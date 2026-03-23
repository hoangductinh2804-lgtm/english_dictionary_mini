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
const quickWordButtons = document.querySelectorAll('.quick-word');
const resultMetaDiv = document.getElementById('resultMeta');
const historySection = document.getElementById('historySection');
const historyListDiv = document.getElementById('historyList');
const historyEmpty = document.getElementById('historyEmpty');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');

// 2. API CONFIGURATION
const API_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const TRANSLATE_API_URL = 'https://api.mymemory.translated.net/get';
const SEARCH_HISTORY_KEY = 'dictionary_search_history';
const MAX_HISTORY_ITEMS = 8;
const MAX_TRANSLATE_CHARS = 480; // MyMemory free tier: max ~500 chars per request
const translationCache = new Map();
const PART_OF_SPEECH_LABELS = {
  noun: 'Danh từ',
  verb: 'Động từ',
  adjective: 'Tính từ',
  adverb: 'Trạng từ',
  pronoun: 'Đại từ',
  preposition: 'Giới từ',
  conjunction: 'Liên từ',
  interjection: 'Thán từ',
  article: 'Mạo từ',
  determiner: 'Từ hạn định',
  exclamation: 'Cảm thán',
  modal: 'Động từ khuyết thiếu'
};

// 3. EVENT LISTENERS
searchBtn.addEventListener('click', searchWord);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchWord();
  }
});

playSound.addEventListener('click', playAudio);
quickWordButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const word = button.dataset.word;
    searchInput.value = word;
    searchWord();
  });
});
clearHistoryBtn.addEventListener('click', clearSearchHistory);

// 4. SEARCH WORD FUNCTION
async function searchWord() {
  const word = searchInput.value.trim();

  // Validate input
  if (!word) {
    showError('Vui lòng nhập một từ!');
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
        showError(`Không tìm thấy từ "${word}". Hãy thử từ khác!`);
      } else {
        showError('Đã xảy ra lỗi. Vui lòng thử lại!');
      }
      hideLoading();
      return;
    }

    // Parse response
    const data = await response.json();
    
    // Display results
    displayResult(data[0]);
    addToSearchHistory(data[0].word || word);
    hideError();
    hideLoading();

  } catch (error) {
    console.error('Error:', error);
    showError('Đã xảy ra lỗi. Vui lòng thử lại!');
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
  const totalDefinitions = meanings.reduce((total, meaning) => {
    const definitionCount = (meaning.definitions || []).length;
    return total + definitionCount;
  }, 0);

  // Set word title and phonetic
  document.getElementById('wordTitle').textContent = word;
  document.getElementById('wordPhonetic').textContent = phonetic || '';

  // Reset source section before rendering current result.
  const sourceDiv = document.getElementById('sourceSection');
  const sourceLink = document.getElementById('sourceLink');
  sourceDiv.classList.add('hidden');
  sourceLink.href = '#';
  sourceLink.textContent = '';

  // Store audio URL for play button
  const audioData = phonetics.find(p => p.audio);
  if (audioData) {
    playSound.dataset.audio = audioData.audio;
    playSound.style.opacity = '1';
    playSound.style.cursor = 'pointer';
    playSound.disabled = false;
  } else {
    playSound.removeAttribute('data-audio');
    playSound.style.opacity = '0.5';
    playSound.style.cursor = 'not-allowed';
    playSound.disabled = true;
  }

  resultMetaDiv.textContent = `${meanings.length} nhóm từ loại • ${totalDefinitions} định nghĩa • ${audioData ? 'Có phát âm' : 'Không có phát âm'}`;
  resultMetaDiv.classList.remove('hidden');

  // Display meanings
  const partsOfSpeechDiv = document.getElementById('partsOfSpeech');
  partsOfSpeechDiv.innerHTML = '';

  meanings.forEach((meaning) => {
    const partOfSpeech = formatPartOfSpeech(meaning.partOfSpeech);
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

    const displayedDefinitions = definitions.slice(0, 3);

    if (displayedDefinitions.length === 0) {
      const emptyDef = document.createElement('div');
      emptyDef.className = 'definition-example';
      emptyDef.textContent = 'Chưa có định nghĩa chi tiết.';
      definitionsDiv.appendChild(emptyDef);
    }

    displayedDefinitions.forEach((def) => {
      const defItem = document.createElement('div');
      defItem.className = 'definition-item';

      const defText = document.createElement('div');
      defText.className = 'definition-text';
      defText.textContent = def.definition;
      defItem.appendChild(defText);

      const vnDefDiv = document.createElement('div');
      vnDefDiv.className = 'definition-vi loading-vi';
      vnDefDiv.textContent = 'Đang dịch...';
      defItem.appendChild(vnDefDiv);

      if (def.example) {
        const exampleDiv = document.createElement('div');
        exampleDiv.className = 'definition-example';

        const exEnSpan = document.createElement('span');
        exEnSpan.className = 'example-en';
        exEnSpan.textContent = `"${def.example}"`;
        exampleDiv.appendChild(exEnSpan);

        const vnExDiv = document.createElement('div');
        vnExDiv.className = 'example-vi loading-vi';
        vnExDiv.textContent = 'Đang dịch...';
        exampleDiv.appendChild(vnExDiv);

        defItem.appendChild(exampleDiv);
        translateAndDisplay(def.definition, def.example, vnDefDiv, vnExDiv);
      } else {
        translateAndDisplay(def.definition, null, vnDefDiv, null);
      }

      definitionsDiv.appendChild(defItem);
    });

    partDiv.appendChild(titleDiv);
    partDiv.appendChild(definitionsDiv);

    // Add synonyms if available
    if (synonyms.length > 0) {
      const synDiv = document.createElement('div');
      synDiv.className = 'entry-tag-block';
      synDiv.innerHTML = '<strong style="color: var(--text-dark);">Từ đồng nghĩa:</strong>';
      const synList = document.createElement('div');
      synList.className = 'entry-tag-list';

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
      antDiv.className = 'entry-tag-block';
      antDiv.innerHTML = '<strong style="color: var(--text-dark);">Từ trái nghĩa:</strong>';
      const antList = document.createElement('div');
      antList.className = 'entry-tag-list';

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
    sourceDiv.classList.remove('hidden');
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
    console.log('Không có dữ liệu phát âm');
    return;
  }

  const audio = new Audio(audioUrl);
  audio.play().catch((error) => {
    console.error('Error playing audio:', error);
  });
}

// 7. TRANSLATION FUNCTIONS
async function translateText(text) {
  if (!text || !text.trim()) return '';
  const key = text.trim();
  if (translationCache.has(key)) return translationCache.get(key);
  try {
    const truncated = text.substring(0, MAX_TRANSLATE_CHARS);
    const response = await fetch(
      `${TRANSLATE_API_URL}?q=${encodeURIComponent(truncated)}&langpair=en|vi`
    );
    if (!response.ok) return '';
    const data = await response.json();
    // responseStatus may be number or string depending on API version
    if (data.responseStatus == 200 && data.responseData && data.responseData.translatedText) {
      const result = data.responseData.translatedText;
      translationCache.set(key, result);
      return result;
    }
    return '';
  } catch {
    return '';
  }
}

// Fetch translations and update the corresponding DOM elements.
// Uses isConnected to guard against race conditions where the user
// searches a new word before the previous translations finish loading.
async function translateAndDisplay(definition, example, vnDefDiv, vnExDiv) {
  const translated = await translateText(definition);
  if (vnDefDiv && vnDefDiv.isConnected) {
    if (translated) {
      vnDefDiv.classList.remove('loading-vi');
      vnDefDiv.textContent = `🇻🇳 ${translated}`;
    } else {
      vnDefDiv.remove();
    }
  }
  if (example && vnExDiv && vnExDiv.isConnected) {
    const translatedEx = await translateText(example);
    if (translatedEx) {
      vnExDiv.classList.remove('loading-vi');
      vnExDiv.textContent = `🇻🇳 "${translatedEx}"`;
    } else {
      vnExDiv.remove();
    }
  }
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
  searchBtn.disabled = true;
  searchBtn.textContent = 'Đang tìm...';
}

function hideLoading() {
  loadingDiv.classList.add('hidden');
  searchBtn.disabled = false;
  searchBtn.textContent = '🔍 Tìm kiếm';
}

function showResult() {
  resultDiv.classList.remove('hidden');
}

function hideResult() {
  resultDiv.classList.add('hidden');
  resultMetaDiv.classList.add('hidden');
}

function formatPartOfSpeech(partOfSpeech) {
  if (!partOfSpeech) {
    return 'Khác';
  }

  const key = partOfSpeech.toLowerCase();
  return PART_OF_SPEECH_LABELS[key] || partOfSpeech;
}

function getSearchHistory() {
  try {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Không thể đọc lịch sử tìm kiếm:', error);
    return [];
  }
}

function setSearchHistory(history) {
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
}

function addToSearchHistory(word) {
  const normalizedWord = (word || '').trim().toLowerCase();
  if (!normalizedWord) {
    return;
  }

  const history = getSearchHistory();
  const updatedHistory = [
    normalizedWord,
    ...history.filter((item) => item !== normalizedWord)
  ].slice(0, MAX_HISTORY_ITEMS);

  setSearchHistory(updatedHistory);
  renderSearchHistory();
}

function clearSearchHistory() {
  setSearchHistory([]);
  renderSearchHistory();
}

function renderSearchHistory() {
  const history = getSearchHistory();
  historyListDiv.innerHTML = '';

  if (history.length === 0) {
    historySection.classList.add('hidden');
    historyEmpty.classList.remove('hidden');
    return;
  }

  historySection.classList.remove('hidden');
  historyEmpty.classList.add('hidden');

  history.forEach((word) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'history-chip';
    chip.textContent = word;
    chip.addEventListener('click', () => {
      searchInput.value = word;
      searchWord();
    });
    historyListDiv.appendChild(chip);
  });
}

// 9. FOCUS ON INPUT WHEN PAGE LOADS
window.addEventListener('load', () => {
  renderSearchHistory();
  searchInput.focus();
});