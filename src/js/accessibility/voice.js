/**
 * UI Code Assistant - Voice Control for Accessibility
 * Handles voice recognition functionality
 */

class VoiceControl {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.commands = {
            'generate': () => document.getElementById('generateBtn').click(),
            'analyze design': () => document.getElementById('analyzeDesignBtn').click(),
            'analyze code': () => document.getElementById('analyzeCodeBtn').click(),
            'accessibility check': () => document.getElementById('accessibilityBtn').click(),
            'ai assistant': () => document.getElementById('aiAssistantBtn').click(),
            'submit': () => document.getElementById('submitBtn').click(),
            'copy': () => document.getElementById('copyBtn').click(),
            'download': () => document.getElementById('downloadBtn').click(),
            'clear': () => document.getElementById('codeInput').value = ''
        };
        
        this.initRecognition();
    }
    
    initRecognition() {
        // Check if browser supports speech recognition
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.setupRecognition();
        } else if ('SpeechRecognition' in window) {
            this.recognition = new SpeechRecognition();
            this.setupRecognition();
        } else {
            console.warn('Speech recognition not supported in this browser');
        }
    }
    
    setupRecognition() {
        if (!this.recognition) return;
        
        this.recognition.continuous = true;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
        
        this.recognition.onresult = (event) => {
            const last = event.results.length - 1;
            const command = event.results[last][0].transcript.trim().toLowerCase();
            
            console.log('Voice command recognized:', command);
            this.processCommand(command);
            
            // Show feedback
            this.showFeedback(command);
        };
        
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
        };
    }
    
    start() {
        if (this.recognition && !this.isListening) {
            this.recognition.start();
            this.isListening = true;
            console.log('Voice recognition started');
        }
    }
    
    stop() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            console.log('Voice recognition stopped');
        }
    }
    
    processCommand(command) {
        // Check for exact matches
        if (this.commands[command]) {
            this.commands[command]();
            return;
        }
        
        // Check for partial matches
        for (const [key, action] of Object.entries(this.commands)) {
            if (command.includes(key)) {
                action();
                return;
            }
        }
        
        console.log('Unknown command:', command);
    }
    
    showFeedback(command) {
        // Create or get feedback element
        let feedback = document.querySelector('.voice-active');
        
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'voice-active';
            document.body.appendChild(feedback);
        }
        
        // Show the command
        feedback.textContent = `Voice: ${command}`;
        feedback.classList.add('show');
        
        // Hide after animation
        setTimeout(() => {
            feedback.classList.remove('show');
        }, 2000);
    }
}