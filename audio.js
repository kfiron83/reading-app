// ===== AUDIO SYSTEM =====
// Real human recordings from Wikimedia Commons (CC-BY-SA, speaker: Uziel302 / Buffer)
// Used for Hebrew letter names. Syllables/words use Web Speech API.

const WM = 'https://upload.wikimedia.org/wikipedia/commons';

// Map: first character of Hebrew letter → MP3 URL of native speaker saying the letter name
const LETTER_AUDIO = {
    'א': `${WM}/b/b0/LL-Q9288_%28heb%29-Uziel302-%D7%90.wav/LL-Q9288_%28heb%29-Uziel302-%D7%90.wav.mp3`,
    'ב': `${WM}/8/82/LL-Q9288_%28heb%29-Uziel302-%D7%91.wav/LL-Q9288_%28heb%29-Uziel302-%D7%91.wav.mp3`,
    'ג': `${WM}/2/2b/LL-Q9288_%28heb%29-Uziel302-%D7%92.wav/LL-Q9288_%28heb%29-Uziel302-%D7%92.wav.mp3`,
    'ד': `${WM}/2/2a/LL-Q9288_%28heb%29-Uziel302-%D7%93.wav/LL-Q9288_%28heb%29-Uziel302-%D7%93.wav.mp3`,
    'ה': `${WM}/a/a8/LL-Q9288_%28heb%29-Uziel302-%D7%94.wav/LL-Q9288_%28heb%29-Uziel302-%D7%94.wav.mp3`,
    'ו': `${WM}/9/95/LL-Q9288_%28heb%29-Buffer-%D7%95.wav/LL-Q9288_%28heb%29-Buffer-%D7%95.wav.mp3`,
    'ז': `${WM}/3/33/LL-Q9288_%28heb%29-Uziel302-%D7%96.wav/LL-Q9288_%28heb%29-Uziel302-%D7%96.wav.mp3`,
    'ח': `${WM}/a/ac/LL-Q9288_%28heb%29-Uziel302-%D7%97.wav/LL-Q9288_%28heb%29-Uziel302-%D7%97.wav.mp3`,
    'ט': `${WM}/c/ca/LL-Q9288_%28heb%29-Uziel302-%D7%98.wav/LL-Q9288_%28heb%29-Uziel302-%D7%98.wav.mp3`,
    'י': `${WM}/7/76/LL-Q9288_%28heb%29-Uziel302-%D7%99.wav/LL-Q9288_%28heb%29-Uziel302-%D7%99.wav.mp3`,
    'כ': `${WM}/f/f2/LL-Q9288_%28heb%29-Uziel302-%D7%9B.wav/LL-Q9288_%28heb%29-Uziel302-%D7%9B.wav.mp3`,
    'ל': `${WM}/8/82/LL-Q9288_%28heb%29-Uziel302-%D7%9C.wav/LL-Q9288_%28heb%29-Uziel302-%D7%9C.wav.mp3`,
    'מ': `${WM}/d/d5/LL-Q9288_%28heb%29-Uziel302-%D7%9E.wav/LL-Q9288_%28heb%29-Uziel302-%D7%9E.wav.mp3`,
    'נ': `${WM}/5/54/LL-Q9288_%28heb%29-Uziel302-%D7%A0.wav/LL-Q9288_%28heb%29-Uziel302-%D7%A0.wav.mp3`,
    'ס': `${WM}/4/43/LL-Q9288_%28heb%29-Uziel302-%D7%A1.wav/LL-Q9288_%28heb%29-Uziel302-%D7%A1.wav.mp3`,
    'ע': `${WM}/e/ef/LL-Q9288_%28heb%29-Uziel302-%D7%A2.wav/LL-Q9288_%28heb%29-Uziel302-%D7%A2.wav.mp3`,
    'פ': `${WM}/f/f0/LL-Q9288_%28heb%29-Uziel302-%D7%A4.wav/LL-Q9288_%28heb%29-Uziel302-%D7%A4.wav.mp3`,
    'צ': `${WM}/f/f0/LL-Q9288_%28heb%29-Uziel302-%D7%A6.wav/LL-Q9288_%28heb%29-Uziel302-%D7%A6.wav.mp3`,
    'ק': `${WM}/9/91/LL-Q9288_%28heb%29-Uziel302-%D7%A7.wav/LL-Q9288_%28heb%29-Uziel302-%D7%A7.wav.mp3`,
    'ר': `${WM}/4/4c/LL-Q9288_%28heb%29-Uziel302-%D7%A8.wav/LL-Q9288_%28heb%29-Uziel302-%D7%A8.wav.mp3`,
    'ש': `${WM}/d/dd/LL-Q9288_%28heb%29-Uziel302-%D7%A9.wav/LL-Q9288_%28heb%29-Uziel302-%D7%A9.wav.mp3`,
    'ת': `${WM}/f/f1/LL-Q9288_%28heb%29-Uziel302-%D7%AA.wav/LL-Q9288_%28heb%29-Uziel302-%D7%AA.wav.mp3`,
    // Final forms → same recording as their base letter
    'ך': `${WM}/f/f2/LL-Q9288_%28heb%29-Uziel302-%D7%9B.wav/LL-Q9288_%28heb%29-Uziel302-%D7%9B.wav.mp3`,
    'ם': `${WM}/d/d5/LL-Q9288_%28heb%29-Uziel302-%D7%9E.wav/LL-Q9288_%28heb%29-Uziel302-%D7%9E.wav.mp3`,
    'ן': `${WM}/5/54/LL-Q9288_%28heb%29-Uziel302-%D7%A0.wav/LL-Q9288_%28heb%29-Uziel302-%D7%A0.wav.mp3`,
    'ף': `${WM}/f/f0/LL-Q9288_%28heb%29-Uziel302-%D7%A4.wav/LL-Q9288_%28heb%29-Uziel302-%D7%A4.wav.mp3`,
    'ץ': `${WM}/f/f0/LL-Q9288_%28heb%29-Uziel302-%D7%A6.wav/LL-Q9288_%28heb%29-Uziel302-%D7%A6.wav.mp3`,
};

class AudioManager {
    constructor() {
        this.synth = window.speechSynthesis;
        this.hebrewVoice = null;
        this._currentAudio = null;
        this._initVoices();
    }

    _initVoices() {
        const find = () => {
            const voices = this.synth.getVoices();
            // Prefer Apple/Google neural Hebrew voices
            this.hebrewVoice =
                voices.find(v => v.lang.startsWith('he') && /carmit|yossi/i.test(v.name)) ||
                voices.find(v => v.lang.startsWith('he') && /google/i.test(v.name)) ||
                voices.find(v => v.lang.startsWith('he')) ||
                voices.find(v => v.lang.startsWith('iw')) ||
                null;
        };
        if (this.synth.getVoices().length > 0) find();
        this.synth.onvoiceschanged = find;
    }

    // ── public API ──────────────────────────────────────

    /** Speak any Hebrew text. Uses real recording for single letters, TTS for rest. */
    speak(text, rate = 0.85) {
        if (!text) return;
        // Strip nikud (vowel marks) to get the base letter for lookup
        const base = text.replace(/[\u05b0-\u05c7]/g, '').trim();
        const firstChar = base[0];

        if (LETTER_AUDIO[firstChar] && base.length === 1) {
            // Single letter → play real human recording
            this._playURL(LETTER_AUDIO[firstChar]);
        } else {
            // Syllable / word / letter name → use TTS
            this._tts(text, rate);
        }
    }

    speakSlow(text) {
        this.speak(text, 0.6);
    }

    /** Play a real recording for a letter character directly */
    speakLetter(char) {
        const base = char.replace(/[\u05b0-\u05c7]/g, '').trim()[0];
        const url = LETTER_AUDIO[base];
        if (url) {
            this._playURL(url);
        } else {
            this._tts(char, 0.7);
        }
    }

    playSuccess() {
        this._playTone([523.25, 659.25, 783.99], 0.15);
    }

    playError() {
        this._playTone([200, 160], 0.22);
    }

    playCelebration() {
        [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5]
            .forEach((f, i) => setTimeout(() => this._playTone([f], 0.1), i * 90));
    }

    // ── private ─────────────────────────────────────────

    _playURL(url) {
        try {
            if (this._currentAudio) {
                this._currentAudio.pause();
                this._currentAudio.currentTime = 0;
            }
            this.synth.cancel();
            const a = new Audio(url);
            a.playbackRate = 0.92; // very slightly slower = more natural for kids
            this._currentAudio = a;
            a.play().catch(() => {
                // If audio fails (network issue), fall back to TTS
                this._tts(url.includes('%D7%90') ? 'אָלֶף' : '', 0.7);
            });
        } catch (e) {
            // silent fail
        }
    }

    _tts(text, rate) {
        if (!this.synth || !text) return;
        this.synth.cancel();
        const utt = new SpeechSynthesisUtterance(text);
        utt.lang   = 'he-IL';
        utt.rate   = rate;
        utt.pitch  = 1.05;
        utt.volume = 1;
        if (this.hebrewVoice) utt.voice = this.hebrewVoice;
        this.synth.speak(utt);
    }

    _playTone(freqs, dur) {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            freqs.forEach((freq, i) => {
                const osc  = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.value = freq;
                osc.type = 'sine';
                gain.gain.value = 0.1;
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur + i * 0.06);
                osc.start(ctx.currentTime + i * 0.06);
                osc.stop(ctx.currentTime + dur + i * 0.06 + 0.1);
            });
        } catch (e) { /* silent */ }
    }
}

const audio = new AudioManager();
