// ===== MAIN APP =====

class ReadingApp {
    constructor() {
        this.currentScreen = 'home';
        this.currentLevel = null;
        this.currentIndex = 0;
        this.practiceCorrect = 0;
        this.practiceTotal = 0;
        this.practiceQuestions = [];
        this.practiceQuestionIndex = 0;

        // Load progress from localStorage
        this.progress = JSON.parse(localStorage.getItem('reading-app-progress') || '{}');
        this.totalStars = parseInt(localStorage.getItem('reading-app-stars') || '0');
    }

    // ===== NAVIGATION =====
    navigateTo(screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(`screen-${screen}`).classList.add('active');
        this.currentScreen = screen;

        if (screen === 'levels') this.renderLevels();
    }

    // ===== LEVELS =====
    renderLevels() {
        const container = document.getElementById('levels-container');
        document.getElementById('total-stars').textContent = this.totalStars;

        container.innerHTML = HEBREW_DATA.levels.map((level, i) => {
            const completed = this.progress[level.id];
            const stars = this.progress[level.id + '-stars'] || 0;
            // First level is always unlocked; others unlock when previous is completed
            const unlocked = i === 0 || this.progress[HEBREW_DATA.levels[i - 1].id];

            return `
                <div class="level-card ${completed ? 'completed' : ''} ${!unlocked ? 'locked' : ''}"
                     onclick="${unlocked ? `app.startLevel('${level.id}')` : ''}"
                     style="border-top: 4px solid ${level.color}">
                    ${completed ? '<div class="level-card-badge">✓</div>' : ''}
                    <span class="level-card-icon">${level.icon}</span>
                    <div class="level-card-title">${level.name}</div>
                    <div class="level-card-stars">
                        ${stars >= 1 ? '⭐' : '☆'}${stars >= 2 ? '⭐' : '☆'}${stars >= 3 ? '⭐' : '☆'}
                    </div>
                </div>
            `;
        }).join('');
    }

    startLevel(levelId) {
        const level = HEBREW_DATA.levels.find(l => l.id === levelId);
        if (!level) return;
        this.currentLevel = level;
        this.currentIndex = 0;

        switch (level.type) {
            case 'learn-letters':
                this.startLearnLetters(level);
                break;
            case 'learn-vowels':
                this.startLearnVowels(level);
                break;
            case 'learn-syllables':
                this.startLearnSyllables(level);
                break;
            case 'learn-words':
                this.startLearnWords(level);
                break;
        }
    }

    replayLevel() {
        if (this.currentLevel) {
            this.startLevel(this.currentLevel.id);
        }
    }

    // ===== LEARN LETTERS =====
    startLearnLetters(level) {
        const [start, end] = level.dataSlice;
        this.learnItems = HEBREW_DATA.letters.slice(start, end);
        this.currentIndex = 0;
        document.getElementById('learn-title').textContent = level.name;
        this.navigateTo('learn');
        this.renderLearnLetter();
    }

    renderLearnLetter() {
        const item = this.learnItems[this.currentIndex];
        const total = this.learnItems.length;
        const progress = ((this.currentIndex + 1) / total) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;

        const container = document.getElementById('learn-container');
        container.innerHTML = `
            <div class="learn-card">
                <div class="learn-letter" onclick="audio.speak('${item.name}')">${item.letter}</div>
                <div class="learn-letter-name">${item.name}</div>
                <div class="learn-letter-sound">צליל: ${item.sound}</div>
                <div class="learn-hint">${item.hint}</div>
            </div>
            <div class="learn-nav">
                <button class="btn-nav btn-nav-listen" onclick="audio.speak('${item.name}')">🔊</button>
                ${this.currentIndex > 0 ? '<button class="btn-nav btn-nav-prev" onclick="app.prevLearnItem()">הקודם</button>' : ''}
                <button class="btn-nav btn-nav-next" onclick="app.nextLearnItem()">
                    ${this.currentIndex < total - 1 ? 'הבא' : 'תרגול! 🎯'}
                </button>
            </div>
        `;

        // Auto-speak the letter name
        setTimeout(() => audio.speak(item.name), 300);
    }

    // ===== LEARN VOWELS =====
    startLearnVowels(level) {
        this.learnItems = HEBREW_DATA.vowels;
        this.currentIndex = 0;
        document.getElementById('learn-title').textContent = level.name;
        this.navigateTo('learn');
        this.renderLearnVowel();
    }

    renderLearnVowel() {
        const item = this.learnItems[this.currentIndex];
        const total = this.learnItems.length;
        const progress = ((this.currentIndex + 1) / total) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;

        const container = document.getElementById('learn-container');
        container.innerHTML = `
            <div class="learn-card">
                <div class="learn-letter" onclick="audio.speak('${item.name}')" style="color: #e53e3e;">${item.example}</div>
                <div class="learn-letter-name">${item.name}</div>
                <div class="learn-letter-sound">צליל: ${item.sound}</div>
                <div class="learn-hint">${item.hint}</div>
            </div>
            <div class="learn-nav">
                <button class="btn-nav btn-nav-listen" onclick="audio.speak('${item.name}')">🔊</button>
                ${this.currentIndex > 0 ? '<button class="btn-nav btn-nav-prev" onclick="app.prevLearnItem()">הקודם</button>' : ''}
                <button class="btn-nav btn-nav-next" onclick="app.nextLearnItem()">
                    ${this.currentIndex < total - 1 ? 'הבא' : 'תרגול! 🎯'}
                </button>
            </div>
        `;

        setTimeout(() => audio.speak(item.name), 300);
    }

    // ===== LEARN SYLLABLES =====
    startLearnSyllables(level) {
        const group = HEBREW_DATA.syllableGroups[level.groupIndex];
        this.learnItems = group.syllables;
        this.syllableGroup = group;
        this.currentIndex = 0;
        document.getElementById('learn-title').textContent = level.name;
        this.navigateTo('learn');
        this.renderLearnSyllable();
    }

    renderLearnSyllable() {
        const item = this.learnItems[this.currentIndex];
        const total = this.learnItems.length;
        const progress = ((this.currentIndex + 1) / total) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;

        const container = document.getElementById('learn-container');
        container.innerHTML = `
            <div class="learn-card">
                <div class="syllable-display">
                    <div class="syllable-part combined" onclick="audio.speak('${item.text}')">${item.text}</div>
                </div>
                <div class="learn-letter-sound">${item.sound}</div>
                <div class="learn-hint">לחצו על ההברה כדי לשמוע 🔊</div>
            </div>
            <div class="learn-nav">
                <button class="btn-nav btn-nav-listen" onclick="audio.speak('${item.text}')">🔊</button>
                ${this.currentIndex > 0 ? '<button class="btn-nav btn-nav-prev" onclick="app.prevLearnItem()">הקודם</button>' : ''}
                <button class="btn-nav btn-nav-next" onclick="app.nextLearnItem()">
                    ${this.currentIndex < total - 1 ? 'הבא' : 'תרגול! 🎯'}
                </button>
            </div>
        `;

        setTimeout(() => audio.speak(item.text), 300);
    }

    // ===== LEARN WORDS =====
    startLearnWords(level) {
        const group = HEBREW_DATA.wordGroups[level.groupIndex];
        this.learnItems = group.words;
        this.currentIndex = 0;
        document.getElementById('learn-title').textContent = level.name;
        this.navigateTo('learn');
        this.renderLearnWord();
    }

    renderLearnWord() {
        const item = this.learnItems[this.currentIndex];
        const total = this.learnItems.length;
        const progress = ((this.currentIndex + 1) / total) * 100;
        document.getElementById('progress-fill').style.width = `${progress}%`;

        const syllablesHtml = item.syllables.map(s =>
            `<span class="word-syllable" onclick="audio.speak('${s}')">${s}</span>`
        ).join('');

        const container = document.getElementById('learn-container');
        container.innerHTML = `
            <div class="learn-card">
                <div class="word-image">${item.image}</div>
                <div class="word-display" onclick="audio.speak('${item.word}')">${item.word}</div>
                <div class="word-meaning">${item.meaning}</div>
                <div class="word-syllables">${syllablesHtml}</div>
                <div class="learn-hint">לחצו על המילה או ההברות לשמוע 🔊</div>
            </div>
            <div class="learn-nav">
                <button class="btn-nav btn-nav-listen" onclick="audio.speakSlow('${item.word}')">🔊</button>
                ${this.currentIndex > 0 ? '<button class="btn-nav btn-nav-prev" onclick="app.prevLearnItem()">הקודם</button>' : ''}
                <button class="btn-nav btn-nav-next" onclick="app.nextLearnItem()">
                    ${this.currentIndex < total - 1 ? 'הבא' : 'תרגול! 🎯'}
                </button>
            </div>
        `;

        setTimeout(() => audio.speak(item.word), 300);
    }

    // ===== NAVIGATION HELPERS =====
    prevLearnItem() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this._renderCurrentLearn();
        }
    }

    nextLearnItem() {
        if (this.currentIndex < this.learnItems.length - 1) {
            this.currentIndex++;
            this._renderCurrentLearn();
        } else {
            // Start practice
            this.startPractice();
        }
    }

    _renderCurrentLearn() {
        const level = this.currentLevel;
        switch (level.type) {
            case 'learn-letters': this.renderLearnLetter(); break;
            case 'learn-vowels': this.renderLearnVowel(); break;
            case 'learn-syllables': this.renderLearnSyllable(); break;
            case 'learn-words': this.renderLearnWord(); break;
        }
    }

    // ===== PRACTICE =====
    startPractice() {
        this.practiceCorrect = 0;
        this.practiceTotal = 0;
        this.practiceQuestionIndex = 0;

        // Generate practice questions based on level type
        this.practiceQuestions = this._generateQuestions();

        document.getElementById('practice-title').textContent = 'תרגול - ' + this.currentLevel.name;
        document.getElementById('practice-correct').textContent = '0';
        document.getElementById('practice-total').textContent = this.practiceQuestions.length;
        this.navigateTo('practice');
        this.renderPracticeQuestion();
    }

    _generateQuestions() {
        const level = this.currentLevel;
        const questions = [];
        const numQuestions = Math.min(8, this.learnItems.length);

        // Shuffle learn items and pick some for questions
        const shuffled = [...this.learnItems].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, numQuestions);

        selected.forEach(item => {
            // Get 3 wrong options from the remaining items
            const others = this.learnItems.filter(x => x !== item).sort(() => Math.random() - 0.5).slice(0, 3);

            switch (level.type) {
                case 'learn-letters': {
                    const options = [item, ...others].sort(() => Math.random() - 0.5);
                    questions.push({
                        type: 'identify',
                        prompt: 'מה שם האות?',
                        display: item.letter,
                        correctAnswer: item.name,
                        options: options.map(o => ({ text: o.name, correct: o === item })),
                        speakOnShow: item.name,
                    });
                    break;
                }
                case 'learn-vowels': {
                    const options = [item, ...others].sort(() => Math.random() - 0.5);
                    questions.push({
                        type: 'identify',
                        prompt: 'מה שם הניקוד?',
                        display: item.example,
                        correctAnswer: item.name,
                        options: options.map(o => ({ text: o.name, correct: o === item })),
                        speakOnShow: item.name,
                    });
                    break;
                }
                case 'learn-syllables': {
                    const options = [item, ...others].sort(() => Math.random() - 0.5);
                    questions.push({
                        type: 'identify',
                        prompt: 'מה ההברה הזאת?',
                        display: item.text,
                        correctAnswer: item.text,
                        options: options.map(o => ({ text: o.text, correct: o === item })),
                        speakOnShow: item.text,
                    });
                    break;
                }
                case 'learn-words': {
                    // Question type: show image, pick the word
                    const options = [item, ...others].sort(() => Math.random() - 0.5);
                    questions.push({
                        type: 'identify',
                        prompt: 'מה המילה שמתאימה לתמונה?',
                        display: item.image,
                        correctAnswer: item.word,
                        options: options.map(o => ({ text: o.word, correct: o === item })),
                        speakOnShow: null,
                    });
                    break;
                }
            }
        });

        return questions;
    }

    renderPracticeQuestion() {
        if (this.practiceQuestionIndex >= this.practiceQuestions.length) {
            this.finishPractice();
            return;
        }

        const q = this.practiceQuestions[this.practiceQuestionIndex];
        const container = document.getElementById('practice-container');

        container.innerHTML = `
            <div class="practice-card">
                <div class="practice-prompt">${q.prompt}</div>
                <div class="practice-question" onclick="${q.speakOnShow ? `audio.speak('${q.speakOnShow}')` : ''}">${q.display}</div>
                <div class="practice-options">
                    ${q.options.map((opt, i) => `
                        <button class="practice-option" onclick="app.checkAnswer(${i})" id="opt-${i}">
                            ${opt.text}
                        </button>
                    `).join('')}
                </div>
                <div class="practice-feedback" id="practice-feedback"></div>
                <button class="practice-next-btn" id="practice-next" onclick="app.nextPracticeQuestion()">הבא →</button>
            </div>
        `;

        if (q.speakOnShow) {
            setTimeout(() => audio.speak(q.speakOnShow), 300);
        }
    }

    checkAnswer(optionIndex) {
        const q = this.practiceQuestions[this.practiceQuestionIndex];
        const option = q.options[optionIndex];
        const feedback = document.getElementById('practice-feedback');
        const nextBtn = document.getElementById('practice-next');

        // Disable all options
        document.querySelectorAll('.practice-option').forEach(btn => {
            btn.style.pointerEvents = 'none';
        });

        if (option.correct) {
            document.getElementById(`opt-${optionIndex}`).classList.add('correct');
            feedback.textContent = 'נכון! כל הכבוד! 🌟';
            feedback.className = 'practice-feedback show correct';
            this.practiceCorrect++;
            audio.playSuccess();

            // Speak the correct answer
            if (q.speakOnShow) {
                setTimeout(() => audio.speak(q.speakOnShow), 500);
            }
        } else {
            document.getElementById(`opt-${optionIndex}`).classList.add('wrong');
            // Highlight the correct one
            q.options.forEach((opt, i) => {
                if (opt.correct) document.getElementById(`opt-${i}`).classList.add('correct');
            });
            feedback.textContent = 'לא נורא, ננסה שוב! 💪';
            feedback.className = 'practice-feedback show wrong';
            audio.playError();
        }

        this.practiceTotal++;
        document.getElementById('practice-correct').textContent = this.practiceCorrect;
        nextBtn.classList.add('show');
    }

    nextPracticeQuestion() {
        this.practiceQuestionIndex++;
        this.renderPracticeQuestion();
    }

    finishPractice() {
        const total = this.practiceQuestions.length;
        const correct = this.practiceCorrect;
        const percent = Math.round((correct / total) * 100);

        // Calculate stars (1-3)
        let stars = 0;
        if (percent >= 40) stars = 1;
        if (percent >= 70) stars = 2;
        if (percent >= 90) stars = 3;

        // Save progress
        const levelId = this.currentLevel.id;
        const prevStars = this.progress[levelId + '-stars'] || 0;
        if (stars > prevStars) {
            this.totalStars += (stars - prevStars);
            this.progress[levelId + '-stars'] = stars;
        }
        if (stars >= 1) {
            this.progress[levelId] = true;
        }

        localStorage.setItem('reading-app-progress', JSON.stringify(this.progress));
        localStorage.setItem('reading-app-stars', this.totalStars.toString());

        // Show celebration
        this.showCelebration(correct, total, stars);
    }

    showCelebration(correct, total, stars) {
        document.getElementById('celebrate-message').textContent =
            `ענית נכון על ${correct} מתוך ${total} שאלות`;
        document.getElementById('celebrate-score').innerHTML =
            '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

        // Falling stars animation
        const starsContainer = document.getElementById('celebrate-stars');
        starsContainer.innerHTML = '';
        const emojis = ['⭐', '🌟', '✨', '🎉', '🎊', '💫', '🌈'];
        for (let i = 0; i < 20; i++) {
            const star = document.createElement('div');
            star.className = 'celebrate-star';
            star.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            star.style.left = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 2 + 's';
            star.style.animationDuration = (2 + Math.random() * 2) + 's';
            starsContainer.appendChild(star);
        }

        this.navigateTo('celebrate');
        audio.playCelebration();

        // Confetti!
        this.spawnConfetti();
    }

    spawnConfetti() {
        const colors = ['#667eea', '#f093fb', '#4fd1c5', '#48bb78', '#f6ad55', '#fc8181', '#ffd700'];
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.width = (5 + Math.random() * 10) + 'px';
                confetti.style.height = confetti.style.width;
                document.body.appendChild(confetti);
                setTimeout(() => confetti.remove(), 2000);
            }, i * 50);
        }
    }
}

// ===== INIT =====
const app = new ReadingApp();
