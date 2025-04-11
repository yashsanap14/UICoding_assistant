/**
 * UI Code Assistant - LLM Settings Icon
 * This file adds a settings icon to manage LLM settings
 */

class LLMSettingsIcon {
    constructor() {
        this.active = false;
        this.createSettingsIcon();
    }

    createSettingsIcon() {
        // Create the settings icon container
        const iconContainer = document.createElement('div');
        iconContainer.className = 'llm-settings-icon';
        iconContainer.innerHTML = `
            <button id="toggleLLMSettings" class="llm-settings-btn" aria-label="Toggle LLM Settings">
                <i class="bi bi-gear-fill"></i>
            </button>
        `;
        
        // Add the icon to the page
        document.body.appendChild(iconContainer);
        
        // Setup event listener for the icon
        this.setupEventListener();
    }

    setupEventListener() {
        // Toggle LLM settings panel when icon is clicked
        document.getElementById('toggleLLMSettings').addEventListener('click', () => {
            this.toggleSettingsPanel();
        });
    }

    toggleSettingsPanel() {
        // Toggle active state for the button
        const button = document.getElementById('toggleLLMSettings');
        this.active = !this.active;
        
        if (this.active) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }

        // Check if LLMHandler exists and has the setupLLMSettings function
        if (window.LLMHandler && typeof window.LLMHandler.setupLLMSettings === 'function') {
            // Setup LLM settings panel
            window.LLMHandler.setupLLMSettings();
            
            // Toggle visibility of the settings panel
            const settingsCard = document.querySelector('.llm-settings-card');
            if (settingsCard) {
                if (this.active) {
                    // Show the settings panel
                    settingsCard.style.display = 'block';
                    // Position the settings panel below the icon
                    const iconRect = button.getBoundingClientRect();
                    settingsCard.style.position = 'fixed';
                    settingsCard.style.top = (iconRect.bottom + 10) + 'px';
                    settingsCard.style.right = '20px';
                    settingsCard.style.zIndex = '999';
                    settingsCard.style.width = '350px';
                    settingsCard.style.maxHeight = '80vh';
                    settingsCard.style.overflowY = 'auto';
                } else {
                    // Hide the settings panel
                    settingsCard.style.display = 'none';
                }
            }
        } else {
            console.error('LLM Handler not properly initialized or missing setupLLMSettings function');
        }
    }
}

// Initialize the LLM settings icon when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.llmSettingsIcon = new LLMSettingsIcon();
});