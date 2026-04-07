// ===== HEBREW READING APP =====

// ===== GAMIFICATION CONSTANTS =====
const XP_PER_CORRECT   = 10;
const XP_PER_WRONG     = 0;
const XP_LEVEL_BONUS   = 25;
const XP_PERFECT_BONUS = 50;

const RANKS = [
    { minXP: 0,    icon: '🐣', title: 'מַתְחִיל',  titleEn: 'Beginner'  },
    { minXP: 50,   icon: '📖', title: 'לוֹמֵד',    titleEn: 'Learner'   },
    { minXP: 150,  icon: '✏️', title: 'קוֹרֵא',    titleEn: 'Reader'    },
    { minXP: 300,  icon: '🎓', title: 'מוּמְחֶה',  titleEn: 'Expert'    },
    { minXP: 500,  icon: '👑', title: 'אַלּוּף',   titleEn: 'Champion'  },
    { minXP: 800,  icon: '🌟', title: 'גֵּאוּנֵי', titleEn: 'Genius'    },
];

const COMBO_THRESHOLDS = [
    { streak: 2,  multiplier: 2, label: 'x2 🔥',   bg: '#FF8C6B' },
    { streak: 4,  multiplier: 3, label: 'x3 🔥🔥',  bg: '#FF6B9D' },
    { streak: 7,  multiplier: 5, label: 'x5 🔥🔥🔥', bg: '#A78BFA' },
];

// ===== APP =====
class ReadingApp {
    constructor() {
        this.currentScreen    = 'home';
        this.currentLevel     = null;
        this.learnItems       = [];
        this.currentIndex     = 0;
        this.practiceQuestions     = [];
        this.practiceQuestionIndex = 0;
        this.practiceCorrect       = 0;
        this.practiceTotal         = 0;

        // Gamification state (persisted)
        this.progress   = JSON.parse(localStorage.getItem('rap-progress')  || '{}');
        this.totalStars = parseInt(localStorage.getItem('rap-stars')       || '0');
        this.totalXP    = parseInt(localStorage.getItem('rap-xp')          || '0');
        this.bestStreak = parseInt(localStorage.getItem('rap-beststreak')  || '0');

        // Session state (not persisted)
        this.sessionStreak   = 0;
        this.sessionXP       = 0;
        this.sessionCombo    = 1;
    }

    // ── helpers ──────────────────────────────────────────
    _save() {
        localStorage.setItem('rap-progress',   JSON.stringify(this.progress));
        localStorage.setItem('rap-stars',       this.totalStars.toString());
        localStorage.setItem('rap-xp',          this.totalXP.toString());
        localStorage.setItem('rap-beststreak',  this.bestStreak.toString());
    }

    getRank(xp = this.totalXP) {
        let rank = RANKS[0];
        for (const r of RANKS) { if (xp >= r.minXP) rank = r; }
        return rank;
    }

    getNextRank(xp = this.totalXP) {
        for (const r of RANKS) { if (xp < r.minXP) return r; }
        return null;
    }

    getCombo(streak) {
        let combo = { multiplier: 1, label: '' };
        for (const c of COMBO_THRESHOLDS) { if (streak >= c.streak) combo = c; }
        return combo;
    }

    // ── navigation ───────────────────────────────────────
    navigateTo(screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(`screen-${screen}`).classList.add('active');
        this.currentScreen = screen;
        if (screen === 'levels') this.renderLevels();
        if (screen === 'home')   this.renderHomeStats();
    }

    renderHomeStats() {
        const rank = this.getRank();
        const el = document.getElementById('home-rank');
        if (el) el.innerHTML = `<span class="home-rank-icon">${rank.icon}</span><span>${rank.title}</span>`;
        const xpEl = document.getElementById('home-xp');
        if (xpEl) xpEl.textContent = `${this.totalXP} XP`;
    }

    // ── levels screen ────────────────────────────────────
    renderLevels() {
        const rank = this.getRank();
        document.getElementById('total-stars').textContent = this.totalStars;
        document.getElementById('total-xp').textContent   = `${this.totalXP} XP`;
        document.getElementById('rank-display').innerHTML = `${rank.icon} ${rank.title}`;

        const container = document.getElementById('levels-container');
        container.innerHTML = HEBREW_DATA.levels.map((level) => {
            const completed = this.progress[level.id];
            const stars     = this.progress[level.id + '-stars'] || 0;
            return `
                <div class="level-card ${completed ? 'completed' : ''}"
                     onclick="app.startLevel('${level.id}')"
                     style="--card-color:${level.color}">
                    ${completed ? '<div class="level-card-badge">✓</div>' : ''}
                    <span class="level-card-icon">${level.icon}</span>
                    <div class="level-card-title">${level.name}</div>
                    <div class="level-card-desc">${level.desc || ''}</div>
                    <div class="level-card-stars">
                        ${[1,2,3].map(n => n <= stars ? '⭐' : '☆').join('')}
                    </div>
                </div>`;
        }).join('');
    }

    startLevel(levelId) {
        const level = HEBREW_DATA.levels.find(l => l.id === levelId);
        if (!level) return;
        this.currentLevel = level;
        this.currentIndex = 0;
        switch (level.type) {
            case 'learn-letters':   this.startLearnLetters(level);    break;
            case 'learn-vowels':    this.startLearnVowels(level);     break;
            case 'learn-syllables': this.startLearnSyllables(level);  break;
            case 'learn-words':     this.startLearnWords(level);      break;
        }
    }

    replayLevel() { if (this.currentLevel) this.startLevel(this.currentLevel.id); }

    // ── learn: letters ───────────────────────────────────
    startLearnLetters(level) {
        const [s, e] = level.dataSlice;
        this.learnItems  = HEBREW_DATA.letters.slice(s, e);
        this.currentIndex = 0;
        document.getElementById('learn-title').textContent = level.name;
        this.navigateTo('learn');
        this.renderLearnLetter();
    }

    renderLearnLetter() {
        const item  = this.learnItems[this.currentIndex];
        const total = this.learnItems.length;
        this._setProgress((this.currentIndex + 1) / total);
        document.getElementById('learn-container').innerHTML = `
            <div class="learn-card">
                <div class="learn-letter" onclick="audio.speak('${item.name}')">${item.letter}</div>
                <div class="learn-letter-name">${item.name}</div>
                <div class="learn-letter-sound">צליל: ${item.sound}</div>
                <div class="learn-hint">
                    <span class="hint-example">${item.example}</span>
                    ${item.hint}
                </div>
            </div>
            ${this._learnNav(total)}`;
        setTimeout(() => audio.speak(item.name), 300);
    }

    // ── learn: vowels ────────────────────────────────────
    startLearnVowels(level) {
        this.learnItems  = HEBREW_DATA.vowels;
        this.currentIndex = 0;
        document.getElementById('learn-title').textContent = level.name;
        this.navigateTo('learn');
        this.renderLearnVowel();
    }

    renderLearnVowel() {
        const item  = this.learnItems[this.currentIndex];
        const total = this.learnItems.length;
        this._setProgress((this.currentIndex + 1) / total);
        document.getElementById('learn-container').innerHTML = `
            <div class="learn-card">
                <div class="learn-letter" onclick="audio.speak('${item.name}')" style="background:linear-gradient(135deg,#FF8C6B,#FFE66D);-webkit-background-clip:text;background-clip:text;">${item.example}</div>
                <div class="learn-letter-name">${item.name}</div>
                <div class="learn-letter-sound">צליל: ${item.sound}</div>
                <div class="learn-hint">${item.hint}</div>
            </div>
            ${this._learnNav(total)}`;
        setTimeout(() => audio.speak(item.name), 300);
    }

    // ── learn: syllables ─────────────────────────────────
    startLearnSyllables(level) {
        const group      = HEBREW_DATA.syllableGroups[level.groupIndex];
        this.learnItems  = group.syllables;
        this.syllableGroup = group;
        this.currentIndex = 0;
        document.getElementById('learn-title').textContent = level.name;
        this.navigateTo('learn');
        this.renderLearnSyllable();
    }

    renderLearnSyllable() {
        const item  = this.learnItems[this.currentIndex];
        const total = this.learnItems.length;
        this._setProgress((this.currentIndex + 1) / total);
        document.getElementById('learn-container').innerHTML = `
            <div class="learn-card">
                <div class="syllable-display">
                    <div class="syllable-part combined" onclick="audio.speak('${item.text}')">${item.text}</div>
                </div>
                <div class="learn-letter-sound">${item.sound}</div>
                <div class="learn-hint">לחצו על ההברה כדי לשמוע 🔊</div>
            </div>
            ${this._learnNav(total)}`;
        setTimeout(() => audio.speak(item.text), 300);
    }

    // ── learn: words ─────────────────────────────────────
    startLearnWords(level) {
        const group      = HEBREW_DATA.wordGroups[level.groupIndex];
        this.learnItems  = group.words;
        this.currentIndex = 0;
        document.getElementById('learn-title').textContent = level.name;
        this.navigateTo('learn');
        this.renderLearnWord();
    }

    renderLearnWord() {
        const item  = this.learnItems[this.currentIndex];
        const total = this.learnItems.length;
        this._setProgress((this.currentIndex + 1) / total);
        const syllablesHtml = item.syllables.map(s =>
            `<span class="word-syllable" onclick="audio.speak('${s}')">${s}</span>`
        ).join('');
        document.getElementById('learn-container').innerHTML = `
            <div class="learn-card">
                <div class="word-image">${item.image}</div>
                <div class="word-display" onclick="audio.speak('${item.word}')">${item.word}</div>
                <div class="word-meaning">${item.meaning}</div>
                <div class="word-syllables">${syllablesHtml}</div>
                <div class="learn-hint">לחצו על המילה לשמוע 🔊</div>
            </div>
            ${this._learnNav(total)}`;
        setTimeout(() => audio.speak(item.word), 300);
    }

    // ── shared learn nav ─────────────────────────────────
    _learnNav(total) {
        const last = this.currentIndex >= total - 1;
        return `<div class="learn-nav">
            <button class="btn-nav btn-nav-listen" onclick="app._speakCurrent()">🔊</button>
            ${this.currentIndex > 0 ? '<button class="btn-nav btn-nav-prev" onclick="app.prevLearnItem()">→</button>' : ''}
            <button class="btn-nav btn-nav-next" onclick="app.nextLearnItem()">
                ${last ? '🎯 לתרגול!' : 'הבא ←'}
            </button>
        </div>`;
    }

    _speakCurrent() {
        const item = this.learnItems[this.currentIndex];
        if (!item) return;
        const text = item.name || item.text || item.word || '';
        audio.speak(text);
    }

    _setProgress(ratio) {
        document.getElementById('progress-fill').style.width = `${Math.round(ratio * 100)}%`;
    }

    prevLearnItem() {
        if (this.currentIndex > 0) { this.currentIndex--; this._renderCurrent(); }
    }

    nextLearnItem() {
        if (this.currentIndex < this.learnItems.length - 1) {
            this.currentIndex++;
            this._renderCurrent();
        } else {
            this.startPractice();
        }
    }

    _renderCurrent() {
        switch (this.currentLevel.type) {
            case 'learn-letters':   this.renderLearnLetter();   break;
            case 'learn-vowels':    this.renderLearnVowel();    break;
            case 'learn-syllables': this.renderLearnSyllable(); break;
            case 'learn-words':     this.renderLearnWord();     break;
        }
    }

    // ── PRACTICE ─────────────────────────────────────────
    startPractice() {
        this.practiceCorrect       = 0;
        this.practiceTotal         = 0;
        this.practiceQuestionIndex = 0;
        this.sessionStreak         = 0;
        this.sessionXP             = 0;
        this.sessionCombo          = 1;
        this.practiceQuestions     = this._generateQuestions();

        document.getElementById('practice-title').textContent = 'תרגול — ' + this.currentLevel.name;
        this._updatePracticeHUD();
        this.navigateTo('practice');
        this.renderPracticeQuestion();
    }

    _updatePracticeHUD() {
        document.getElementById('practice-correct').textContent = this.practiceCorrect;
        document.getElementById('practice-total').textContent   = this.practiceQuestions.length;
        document.getElementById('practice-xp').textContent      = `+${this.sessionXP} XP`;
        const combo = this.getCombo(this.sessionStreak);
        const comboEl = document.getElementById('practice-combo');
        if (combo.multiplier > 1) {
            comboEl.textContent = combo.label;
            comboEl.style.display = 'inline-block';
        } else {
            comboEl.style.display = 'none';
        }
    }

    _generateQuestions() {
        const level = this.currentLevel;
        const numQ  = Math.min(10, this.learnItems.length);
        const shuffled = [...this.learnItems].sort(() => Math.random() - 0.5);
        const selected = shuffled.slice(0, numQ);

        return selected.map(item => {
            const others = this.learnItems.filter(x => x !== item).sort(() => Math.random() - 0.5).slice(0, 3);
            switch (level.type) {
                case 'learn-letters': {
                    const opts = [item, ...others].sort(() => Math.random() - 0.5);
                    return { type: 'identify', prompt: 'מה שם האות?', display: item.letter,
                        correctAnswer: item.name, speakOnShow: item.name,
                        options: opts.map(o => ({ text: o.name, correct: o === item })) };
                }
                case 'learn-vowels': {
                    const opts = [item, ...others].sort(() => Math.random() - 0.5);
                    return { type: 'identify', prompt: 'מה שם הניקוד?', display: item.example,
                        correctAnswer: item.name, speakOnShow: item.name,
                        options: opts.map(o => ({ text: o.name, correct: o === item })) };
                }
                case 'learn-syllables': {
                    const opts = [item, ...others].sort(() => Math.random() - 0.5);
                    return { type: 'identify', prompt: 'איזו הברה זו?', display: item.text,
                        correctAnswer: item.text, speakOnShow: item.text,
                        options: opts.map(o => ({ text: o.text, correct: o === item })) };
                }
                case 'learn-words': {
                    const opts = [item, ...others].sort(() => Math.random() - 0.5);
                    return { type: 'identify', prompt: 'איזו מילה מתאימה לתמונה?', display: item.image,
                        correctAnswer: item.word, speakOnShow: null,
                        options: opts.map(o => ({ text: o.word, correct: o === item })) };
                }
                default: return null;
            }
        }).filter(Boolean);
    }

    renderPracticeQuestion() {
        if (this.practiceQuestionIndex >= this.practiceQuestions.length) {
            this.finishPractice();
            return;
        }
        const q = this.practiceQuestions[this.practiceQuestionIndex];
        const combo = this.getCombo(this.sessionStreak);
        const qNum  = this.practiceQuestionIndex + 1;
        const total = this.practiceQuestions.length;

        document.getElementById('practice-container').innerHTML = `
            <div class="practice-progress-dots">
                ${Array.from({length: total}, (_, i) => {
                    const cls = i < this.practiceQuestionIndex ? 'dot-done'
                              : i === this.practiceQuestionIndex ? 'dot-current' : 'dot-pending';
                    return `<span class="progress-dot ${cls}"></span>`;
                }).join('')}
            </div>
            <div class="practice-card">
                <div class="practice-prompt">${q.prompt}</div>
                <div class="practice-question" onclick="${q.speakOnShow ? `audio.speak('${q.speakOnShow}')` : ''}">${q.display}</div>
                <div class="practice-options">
                    ${q.options.map((opt, i) => `
                        <button class="practice-option" onclick="app.checkAnswer(${i})" id="opt-${i}">
                            ${opt.text}
                        </button>`).join('')}
                </div>
                <div class="practice-feedback" id="practice-feedback"></div>
                <button class="practice-next-btn" id="practice-next" onclick="app.nextPracticeQuestion()">הבא ←</button>
            </div>`;

        this._updatePracticeHUD();
        if (q.speakOnShow) setTimeout(() => audio.speak(q.speakOnShow), 300);
    }

    checkAnswer(optionIndex) {
        const q   = this.practiceQuestions[this.practiceQuestionIndex];
        const opt = q.options[optionIndex];
        document.querySelectorAll('.practice-option').forEach(b => b.style.pointerEvents = 'none');

        const feedback = document.getElementById('practice-feedback');
        const nextBtn  = document.getElementById('practice-next');
        this.practiceTotal++;

        if (opt.correct) {
            // Streak & combo
            this.sessionStreak++;
            if (this.sessionStreak > this.bestStreak) this.bestStreak = this.sessionStreak;
            const combo = this.getCombo(this.sessionStreak);
            this.sessionCombo = combo.multiplier;
            const earned = XP_PER_CORRECT * this.sessionCombo;
            this.sessionXP  += earned;
            this.totalXP    += earned;
            this.practiceCorrect++;

            document.getElementById(`opt-${optionIndex}`).classList.add('correct');
            feedback.className  = 'practice-feedback show correct';
            feedback.innerHTML  = this._correctFeedback(earned, combo);
            audio.playSuccess();
            this._spawnXPPopup(earned, combo);
            if (q.speakOnShow) setTimeout(() => audio.speak(q.speakOnShow), 500);
        } else {
            this.sessionStreak = 0;
            this.sessionCombo  = 1;
            document.getElementById(`opt-${optionIndex}`).classList.add('wrong');
            q.options.forEach((o, i) => { if (o.correct) document.getElementById(`opt-${i}`).classList.add('correct'); });
            feedback.className = 'practice-feedback show wrong';
            feedback.innerHTML = '💪 לא נורא — ננסה שוב!<br><small>הסתכלו על התשובה הנכונה</small>';
            audio.playError();
        }

        nextBtn.classList.add('show');
        this._updatePracticeHUD();
        this._save();
    }

    _correctFeedback(earned, combo) {
        const phrases = ['כל הכבוד! 🌟', 'יופי! 🎉', 'מצוין! ✨', 'מדהים! 🏆', 'נכון! 💫'];
        const phrase  = phrases[Math.floor(Math.random() * phrases.length)];
        const comboText = combo.multiplier > 1 ? `<span class="combo-badge">${combo.label}</span>` : '';
        return `${phrase} ${comboText}<br><span class="xp-earned">+${earned} XP</span>`;
    }

    _spawnXPPopup(xp, combo) {
        const el = document.createElement('div');
        el.className = 'xp-popup';
        el.textContent = `+${xp} XP${combo.multiplier > 1 ? ` ${combo.label}` : ''}`;
        el.style.left   = (30 + Math.random() * 40) + '%';
        el.style.top    = '40%';
        el.style.background = combo.multiplier > 1 ? combo.bg : '#4ECDC4';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1400);
    }

    nextPracticeQuestion() {
        this.practiceQuestionIndex++;
        this.renderPracticeQuestion();
    }

    finishPractice() {
        const total   = this.practiceQuestions.length;
        const correct = this.practiceCorrect;
        const pct     = Math.round((correct / total) * 100);

        let stars = 0;
        if (pct >= 40) stars = 1;
        if (pct >= 70) stars = 2;
        if (pct >= 90) stars = 3;

        // Bonus XP
        let bonus = XP_LEVEL_BONUS;
        if (pct === 100) bonus += XP_PERFECT_BONUS;
        this.sessionXP += bonus;
        this.totalXP   += bonus;

        // Persist stars
        const id        = this.currentLevel.id;
        const prevStars = this.progress[id + '-stars'] || 0;
        if (stars > prevStars) {
            this.totalStars += (stars - prevStars);
            this.progress[id + '-stars'] = stars;
        }
        if (stars >= 1) this.progress[id] = true;
        this._save();

        this._showCelebration(correct, total, stars, bonus, pct);
    }

    _showCelebration(correct, total, stars, bonus, pct) {
        const rank     = this.getRank();
        const nextRank = this.getNextRank();
        const xpToNext = nextRank ? nextRank.minXP - this.totalXP : 0;

        document.getElementById('celebrate-message').innerHTML =
            `ענית נכון על ${correct} מתוך ${total} שאלות (${pct}%)`;
        document.getElementById('celebrate-score').innerHTML =
            [1,2,3].map(n => n <= stars ? '⭐' : '☆').join('');
        document.getElementById('celebrate-xp').innerHTML =
            `<span class="cel-xp">+${this.sessionXP} XP</span>`;
        document.getElementById('celebrate-rank').innerHTML =
            `${rank.icon} ${rank.title}` +
            (nextRank ? `<span class="cel-next-rank">עוד ${xpToNext} XP → ${nextRank.icon} ${nextRank.title}</span>` : '<span class="cel-next-rank">🏆 הגעת לדרגה הכי גבוהה!</span>');
        document.getElementById('celebrate-streak').innerHTML =
            this.sessionStreak > 1 ? `🔥 שיא רצף: ${this.sessionStreak}` : '';

        // Stars rain
        const rain = document.getElementById('celebrate-stars');
        rain.innerHTML = '';
        const emojis = ['⭐','🌟','✨','🎉','🎊','💫','🌈','💎'];
        for (let i = 0; i < 24; i++) {
            const s = document.createElement('div');
            s.className = 'celebrate-star';
            s.textContent = emojis[i % emojis.length];
            s.style.left  = Math.random() * 100 + '%';
            s.style.animationDelay    = (Math.random() * 2.5) + 's';
            s.style.animationDuration = (2 + Math.random() * 2)  + 's';
            rain.appendChild(s);
        }

        this.navigateTo('celebrate');
        audio.playCelebration();
        this._spawnConfetti();
    }

    _spawnConfetti() {
        const colors = ['#FF6B9D','#FFE66D','#4ECDC4','#A78BFA','#7BE495','#FF8C6B','#6BCBFF'];
        for (let i = 0; i < 60; i++) {
            setTimeout(() => {
                const c = document.createElement('div');
                c.className = 'confetti';
                c.style.left = Math.random() * 100 + 'vw';
                c.style.background = colors[Math.floor(Math.random() * colors.length)];
                c.style.width  = (6 + Math.random() * 10) + 'px';
                c.style.height = c.style.width;
                c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
                document.body.appendChild(c);
                setTimeout(() => c.remove(), 2200);
            }, i * 40);
        }
    }
}

// ===== BOOT =====
const app = new ReadingApp();
// On page load show home rank
document.addEventListener('DOMContentLoaded', () => { app.renderHomeStats(); });
// Also call immediately in case DOMContentLoaded already fired
app.renderHomeStats();
