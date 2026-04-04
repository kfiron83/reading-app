// ===== AUDIO SYSTEM =====
// Uses Web Speech API for Hebrew text-to-speech

class AudioManager {
    constructor() {
        this.synth = window.speechSynthesis;
        this.hebrewVoice = null;
        this.ready = false;
        this._initVoices();
    }

    _initVoices() {
        const findHebrew = () => {
            const voices = this.synth.getVoices();
            // Try to find a Hebrew voice
            this.hebrewVoice = voices.find(v => v.lang.startsWith('he')) ||
                               voices.find(v => v.lang.startsWith('iw')) || // older code for Hebrew
                               null;
            this.ready = true;
        };

        // Voices may load async
        if (this.synth.getVoices().length > 0) {
            findHebrew();
        }
        this.synth.onvoiceschanged = () => findHebrew();
    }

    speak(text, rate = 0.8) {
        if (!this.synth) return;

        // Cancel any ongoing speech
        this.synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'he-IL';
        utterance.rate = rate;
        utterance.pitch = 1.1;
        utterance.volume = 1;

        if (this.hebrewVoice) {
            utterance.voice = this.hebrewVoice;
        }

        this.synth.speak(utterance);
    }

    speakSlow(text) {
        this.speak(text, 0.5);
    }

    // Play a success sound effect
    playSuccess() {
        this._playTone([523.25, 659.25, 783.99], 0.15); // C-E-G chord
    }

    // Play an error sound effect
    playError() {
        this._playTone([200, 150], 0.2);
    }

    // Play celebration sound
    playCelebration() {
        const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.5];
        notes.forEach((freq, i) => {
            setTimeout(() => this._playTone([freq], 0.12), i * 100);
        });
    }

    _playTone(frequencies, duration) {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            frequencies.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.frequency.value = freq;
                osc.type = 'sine';
                gain.gain.value = 0.1;
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration + i * 0.05);
                osc.start(ctx.currentTime + i * 0.05);
                osc.stop(ctx.currentTime + duration + i * 0.05 + 0.1);
            });
        } catch (e) {
            // Audio context not available - silently fail
        }
    }
}

const audio = new AudioManager();
