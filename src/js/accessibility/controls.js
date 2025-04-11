/**
 * UI Code Assistant - Accessibility Controls
 */

class AccessibilityControls {
    constructor() {
        this.speechManager = new SpeechManager();
        this.voiceControl = new VoiceControl();
        this.active = false;
        this.settings = {
            highContrast: false,
            largeText: false,
            reducedMotion: false,
            screenReaderOptimized: false
        };
        this.loadSettings();
        this.createControlPanel();
        this.applySettings();
    }

    createControlPanel() {
        const panel = document.createElement('div');
        panel.className = 'accessibility-panel';
        panel.innerHTML = `
            <div class="accessibility-controls">
                <button id="toggleA11y" class="btn btn-primary" aria-label="Toggle Accessibility Features">
                    <i class="bi bi-universal-access"></i>
                </button>
                <div class="control-panel" style="display: none;">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="h6 mb-0">Accessibility Controls</h3>
                        </div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Accessibility Settings</label>
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="highContrastToggle">
                                    <label class="form-check-label" for="highContrastToggle">High Contrast Mode</label>
                                </div>
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="largeTextToggle">
                                    <label class="form-check-label" for="largeTextToggle">Large Text</label>
                                </div>
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="reducedMotionToggle">
                                    <label class="form-check-label" for="reducedMotionToggle">Reduced Motion</label>
                                </div>
                                <div class="form-check form-switch mb-2">
                                    <input class="form-check-input" type="checkbox" id="screenReaderOptimizedToggle">
                                    <label class="form-check-label" for="screenReaderOptimizedToggle">Screen Reader Optimized</label>
                                </div>
                            </div>
                            <hr>
                            <div class="mb-3">
                                <label class="form-label">Screen Reader</label>
                                <div class="btn-group w-100" role="group">
                                    <button id="startReading" class="btn btn-outline-primary">
                                        <i class="bi bi-play-fill"></i> Start
                                    </button>
                                    <button id="pauseReading" class="btn btn-outline-primary">
                                        <i class="bi bi-pause-fill"></i> Pause
                                    </button>
                                    <button id="stopReading" class="btn btn-outline-primary">
                                        <i class="bi bi-stop-fill"></i> Stop
                                    </button>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Voice Control</label>
                                <div class="btn-group w-100" role="group">
                                    <button id="startVoice" class="btn btn-outline-primary">
                                        <i class="bi bi-mic-fill"></i> Start
                                    </button>
                                    <button id="stopVoice" class="btn btn-outline-primary">
                                        <i class="bi bi-mic-mute-fill"></i> Stop
                                    </button>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="voiceSelect" class="form-label">Screen Reader Voice</label>
                                <select id="voiceSelect" class="form-select">
                                    <!-- Voices will be populated dynamically -->
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="readingSpeed" class="form-label">Reading Speed</label>
                                <input type="range" class="form-range" id="readingSpeed" min="0.5" max="2" step="0.1" value="1">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(panel);
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Toggle panel
        document.getElementById('toggleA11y').addEventListener('click', () => {
            const panel = document.querySelector('.control-panel');
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        });

        // Accessibility settings toggles
        document.getElementById('highContrastToggle').addEventListener('change', (e) => {
            this.settings.highContrast = e.target.checked;
            this.applySettings();
            this.saveSettings();
        });

        document.getElementById('largeTextToggle').addEventListener('change', (e) => {
            this.settings.largeText = e.target.checked;
            this.applySettings();
            this.saveSettings();
        });

        document.getElementById('reducedMotionToggle').addEventListener('change', (e) => {
            this.settings.reducedMotion = e.target.checked;
            this.applySettings();
            this.saveSettings();
        });

        document.getElementById('screenReaderOptimizedToggle').addEventListener('change', (e) => {
            this.settings.screenReaderOptimized = e.target.checked;
            this.applySettings();
            this.saveSettings();
        });

        // Screen reader controls
        document.getElementById('startReading').addEventListener('click', () => {
            const text = this.getPageContent();
            this.speechManager.speak(text);
        });

        document.getElementById('pauseReading').addEventListener('click', () => {
            if (this.speechManager.paused) {
                this.speechManager.resume();
            } else {
                this.speechManager.pause();
            }
        });

        document.getElementById('stopReading').addEventListener('click', () => {
            this.speechManager.stop();
        });

        // Voice control
        document.getElementById('startVoice').addEventListener('click', () => {
            this.voiceControl.start();
        });

        document.getElementById('stopVoice').addEventListener('click', () => {
            this.voiceControl.stop();
        });

        // Voice selection
        const voiceSelect = document.getElementById('voiceSelect');
        voiceSelect.addEventListener('change', () => {
            const selectedVoice = this.speechManager.voices[voiceSelect.selectedIndex];
            this.speechManager.voice = selectedVoice;
        });

        // Reading speed
        document.getElementById('readingSpeed').addEventListener('input', (e) => {
            this.speechManager.rate = parseFloat(e.target.value);
        });
    }

    getPageContent() {
        // Get main content while skipping navigation and other non-essential elements
        const mainContent = document.querySelector('main');
        return mainContent ? mainContent.textContent : document.body.textContent;
    }

    populateVoices() {
        const voiceSelect = document.getElementById('voiceSelect');
        voiceSelect.innerHTML = '';
        
        this.speechManager.voices.forEach((voice, i) => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.setAttribute('data-lang', voice.lang);
            option.setAttribute('data-name', voice.name);
            voiceSelect.appendChild(option);
        });
    }

    loadSettings() {
        try {
            const savedSettings = localStorage.getItem('accessibilitySettings');
            if (savedSettings) {
                this.settings = JSON.parse(savedSettings);
            }
        } catch (error) {
            console.error('Error loading accessibility settings:', error);
        }
    }

    saveSettings() {
        try {
            localStorage.setItem('accessibilitySettings', JSON.stringify(this.settings));
        } catch (error) {
            console.error('Error saving accessibility settings:', error);
        }
    }

    applySettings() {
        // Update toggle states
        if (document.getElementById('highContrastToggle')) {
            document.getElementById('highContrastToggle').checked = this.settings.highContrast;
        }
        if (document.getElementById('largeTextToggle')) {
            document.getElementById('largeTextToggle').checked = this.settings.largeText;
        }
        if (document.getElementById('reducedMotionToggle')) {
            document.getElementById('reducedMotionToggle').checked = this.settings.reducedMotion;
        }
        if (document.getElementById('screenReaderOptimizedToggle')) {
            document.getElementById('screenReaderOptimizedToggle').checked = this.settings.screenReaderOptimized;
        }

        // Apply high contrast mode
        if (this.settings.highContrast) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }

        // Apply large text
        if (this.settings.largeText) {
            document.body.classList.add('large-text');
        } else {
            document.body.classList.remove('large-text');
        }

        // Apply reduced motion
        if (this.settings.reducedMotion) {
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }

        // Apply screen reader optimizations
        if (this.settings.screenReaderOptimized) {
            document.body.classList.add('sr-optimized');
        } else {
            document.body.classList.remove('sr-optimized');
        }
    }
}