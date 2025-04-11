/**
 * UI Code Assistant - Speech Manager for Accessibility
 * Handles text-to-speech functionality
 */

class SpeechManager {
    constructor() {
        this.synth = window.speechSynthesis;
        this.utterance = null;
        this.voices = [];
        this.voice = null;
        this.rate = 1.0;
        this.pitch = 1.0;
        this.volume = 1.0;
        this.paused = false;
        
        // Load available voices
        this.loadVoices();
        
        // Some browsers need a delay to load voices
        if (this.synth.onvoiceschanged !== undefined) {
            this.synth.onvoiceschanged = this.loadVoices.bind(this);
        }
    }
    
    loadVoices() {
        this.voices = this.synth.getVoices();
        
        // Set default voice (preferably English)
        if (this.voices.length > 0) {
            // Try to find an English voice
            const englishVoice = this.voices.find(voice => voice.lang.includes('en'));
            this.voice = englishVoice || this.voices[0];
            
            // Notify accessibility controls to update voice selection
            if (window.accessibilityControls) {
                window.accessibilityControls.populateVoices();
            }
        }
    }
    
    speak(text) {
        // Cancel any ongoing speech
        this.stop();
        
        if (!text) return;
        
        this.utterance = new SpeechSynthesisUtterance(text);
        
        // Apply settings
        if (this.voice) this.utterance.voice = this.voice;
        this.utterance.rate = this.rate;
        this.utterance.pitch = this.pitch;
        this.utterance.volume = this.volume;
        
        // Start speaking
        this.synth.speak(this.utterance);
        this.paused = false;
    }
    
    pause() {
        if (this.synth.speaking) {
            this.synth.pause();
            this.paused = true;
        }
    }
    
    resume() {
        if (this.paused) {
            this.synth.resume();
            this.paused = false;
        }
    }
    
    stop() {
        this.synth.cancel();
        this.paused = false;
    }
}