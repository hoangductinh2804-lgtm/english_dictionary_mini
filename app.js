const API_BASE = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
const TRANSLATE_API = 'https://api.mymemory.translated.net/get';
const MAX_DEFINITIONS = 5;
const MAX_SYNONYMS = 10;

const POS_VI = {
  noun: 'Danh từ',
  verb: 'Động từ',
  adjective: 'Tính từ',
  adverb: 'Trạng từ',
  pronoun: 'Đại từ',
  preposition: 'Giới từ',
  conjunction: 'Liên từ',
  interjection: 'Thán từ',
  exclamation: 'Thán từ',
  article: 'Mạo từ',
  abbreviation: 'Từ viết tắt',
  idiom: 'Thành ngữ',
  phrase: 'Cụm từ',
  suffix: 'Hậu tố',
  prefix: 'Tiền tố',
  numeral: 'Số từ',
  determiner: 'Từ hạn định',
  'auxiliary verb': 'Trợ động từ',
  'modal verb': 'Động từ tình thái',
};

const wordInput = document.getElementById('wordInput');
const searchBtn = document.getElementById('searchBtn');
const errorMsg = document.getElementById('errorMsg');
const loading = document.getElementById('loading');
const result = document.getElementById('result');
const wordTitle = document.getElementById('wordTitle');
const phoneticsDiv = document.getElementById('phonetics');
const meaningsDiv = document.getElementById('meanings');

async function translateText(text) {
  if (!text || !text.trim()) return text;
  try {
    const response = await fetch(
      `${TRANSLATE_API}?q=${encodeURIComponent(text)}&langpair=en|vi`
    );
    if (!response.ok) return text;
    const data = await response.json();
    if (data.responseStatus === 200 && data.responseData?.translatedText) {
      return data.responseData.translatedText;
    }
  } catch {
    // fall through on error
  }
  return text;
}

async function lookupWord(word) {
  if (!word.trim()) return;

  setLoading(true);
  hideError();
  hideResult();

  try {
    const response = await fetch(`${API_BASE}${encodeURIComponent(word.trim())}`);

    if (!response.ok) {
      if (response.status === 404) {
        const errorText = document.createElement('span');
        errorText.textContent = `Không tìm thấy định nghĩa cho "${word.trim()}". Vui lòng kiểm tra lại chính tả và thử lại.`;
        showErrorNode(errorText);
      } else {
        showError('Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại.');
      }
      return;
    }

    const data = await response.json();
    const entry = data[0];

    // Translate all definitions and examples to Vietnamese
    const translationJobs = [];
    if (entry.meanings) {
      entry.meanings.forEach(meaning => {
        meaning.definitions.slice(0, MAX_DEFINITIONS).forEach(def => {
          translationJobs.push(
            translateText(def.definition).then(t => { def.definition = t; })
          );
          if (def.example) {
            translationJobs.push(
              translateText(def.example).then(t => { def.example = t; })
            );
          }
        });
      });
    }
    await Promise.all(translationJobs);

    renderResult(entry);
  } catch (err) {
    showError('Lỗi mạng. Vui lòng kiểm tra kết nối và thử lại.');
  } finally {
    setLoading(false);
  }
}

function renderResult(entry) {
  // Word title
  wordTitle.textContent = entry.word;

  // Phonetics
  phoneticsDiv.innerHTML = '';
  const phoneticText = entry.phonetic || (entry.phonetics && entry.phonetics.find(p => p.text)?.text);
  if (phoneticText) {
    const span = document.createElement('span');
    span.className = 'phonetic-text';
    span.textContent = phoneticText;
    phoneticsDiv.appendChild(span);
  }

  let currentAudio = null;

  if (entry.phonetics) {
    entry.phonetics.forEach(phonetic => {
      if (phonetic.audio) {
        const btn = document.createElement('button');
        btn.className = 'audio-btn';
        btn.textContent = '🔊 Phát âm';
        btn.addEventListener('click', () => {
          if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
          }
          currentAudio = new Audio(phonetic.audio);
          currentAudio.play();
        });
        phoneticsDiv.appendChild(btn);
      }
    });
  }

  // Meanings
  meaningsDiv.innerHTML = '';
  if (entry.meanings) {
    entry.meanings.forEach(meaning => {
      const block = document.createElement('div');
      block.className = 'meaning-block';

      const pos = document.createElement('span');
      pos.className = 'part-of-speech';
      pos.dataset.pos = meaning.partOfSpeech.toLowerCase();
      pos.textContent = POS_VI[meaning.partOfSpeech.toLowerCase()] || meaning.partOfSpeech;
      block.appendChild(pos);

      const defList = document.createElement('ul');
      defList.className = 'definitions-list';

      meaning.definitions.slice(0, MAX_DEFINITIONS).forEach((def, idx) => {
        const li = document.createElement('li');

        const numSpan = document.createElement('span');
        numSpan.className = 'def-num';
        numSpan.textContent = idx + 1;

        const bodySpan = document.createElement('span');
        bodySpan.className = 'def-body';
        bodySpan.textContent = def.definition;

        if (def.example) {
          const example = document.createElement('div');
          example.className = 'definition-example';
          example.textContent = `"${def.example}"`;
          bodySpan.appendChild(example);
        }

        li.appendChild(numSpan);
        li.appendChild(bodySpan);
        defList.appendChild(li);
      });

      block.appendChild(defList);

      // Synonyms (from meaning-level or definition-level)
      const synonyms = collectSynonyms(meaning);
      if (synonyms.length > 0) {
        const synSection = document.createElement('div');
        synSection.className = 'synonyms-section';

        const label = document.createElement('div');
        label.className = 'synonyms-label';
        label.textContent = 'Từ đồng nghĩa:';
        synSection.appendChild(label);

        const tags = document.createElement('div');
        tags.className = 'synonyms-tags';
        synonyms.forEach(syn => {
          const tag = document.createElement('span');
          tag.className = 'synonym-tag';
          tag.textContent = syn;
          tag.addEventListener('click', () => {
            wordInput.value = syn;
            lookupWord(syn);
          });
          tags.appendChild(tag);
        });

        synSection.appendChild(tags);
        block.appendChild(synSection);
      }

      meaningsDiv.appendChild(block);
    });
  }

  showResult();
}

function collectSynonyms(meaning) {
  const synSet = new Set();

  if (meaning.synonyms) {
    meaning.synonyms.forEach(s => synSet.add(s));
  }

  if (meaning.definitions) {
    meaning.definitions.forEach(def => {
      if (def.synonyms) {
        def.synonyms.forEach(s => synSet.add(s));
      }
    });
  }

  return Array.from(synSet).slice(0, MAX_SYNONYMS);
}

function setLoading(isLoading) {
  searchBtn.disabled = isLoading;
  loading.classList.toggle('hidden', !isLoading);
}

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.classList.remove('hidden');
}

function showErrorNode(node) {
  errorMsg.textContent = '';
  errorMsg.appendChild(node);
  errorMsg.classList.remove('hidden');
}

function hideError() {
  errorMsg.classList.add('hidden');
}

function showResult() {
  result.classList.remove('hidden');
}

function hideResult() {
  result.classList.add('hidden');
}

searchBtn.addEventListener('click', () => lookupWord(wordInput.value));

wordInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') lookupWord(wordInput.value);
});
