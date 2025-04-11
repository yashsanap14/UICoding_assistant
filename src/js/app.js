/**
 * UI Code Assistant - Main Application Logic
 */

$(document).ready(function() {
    // Initialize variables
    let currentMode = '';
    const templatesModal = new bootstrap.Modal(document.getElementById('templatesModal'));
    
    // Initialize accessibility settings button
    $('#accessibilitySettingsBtn').click(function() {
        // Toggle the accessibility panel
        if (window.accessibilityControls) {
            const panel = document.querySelector('.control-panel');
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        }
    });
    
    // Feature buttons click handlers
    $('#generateBtn').click(function() {
        setMode('generate');
        showOptionsForMode('generate');
        updatePlaceholderText('Describe the component you need (e.g., "A login form with email and password fields")');
    });
    
    $('#analyzeDesignBtn').click(function() {
        setMode('analyzeDesign');
        showOptionsForMode('analyzeDesign');
        updatePlaceholderText('Paste your HTML/CSS code here for design analysis');
    });
    
    $('#analyzeCodeBtn').click(function() {
        setMode('analyzeCode');
        showOptionsForMode('analyzeCode');
        updatePlaceholderText('Paste your HTML/CSS/JavaScript code here for code analysis');
    });
    
    $('#accessibilityBtn').click(function() {
        setMode('accessibility');
        showOptionsForMode('accessibility');
        updatePlaceholderText('Paste your HTML code here for accessibility analysis');
    });

    // Add new AI Assistant button
    $('#aiAssistantBtn').click(function() {
        setMode('aiAssistant');
        showOptionsForMode('aiAssistant');
        updatePlaceholderText('Describe what you need help with (e.g., "Create a responsive dashboard with charts")');
    });
    
    // Submit button click handler
    $('#submitBtn').click(async function() {
        const inputCode = $('#codeInput').val().trim();
        
        if (!inputCode) {
            alert('Please enter some code or requirements first');
            return;
        }
        
        // Show loading indicator
        $('#loadingIndicator').removeClass('d-none');
        
        try {
            // Process the input based on current mode
            if (currentMode === 'aiAssistant') {
                if (!window.LLMHandler || typeof window.LLMHandler.hasValidApiKey !== 'function') {
                    $('#analysisOutput').html('<div class="alert alert-danger">Error: LLM Handler not properly initialized. Please refresh the page and try again.</div>').removeClass('d-none');
                    console.error('LLM Handler not properly initialized', window.LLMHandler);
                    $('#loadingIndicator').addClass('d-none');
                    return;
                }
                
                if (!window.LLMHandler.hasValidApiKey()) {
                    $('#analysisOutput').html('<div class="alert alert-danger">Please set your LLM API key in settings to use the AI Assistant feature.</div>').removeClass('d-none');
                    $('#loadingIndicator').addClass('d-none');
                    return;
                }

                try {
                    const focusArea = $('#aiFocus').val() || 'code';
                    console.log('AI Assistant processing with focus:', focusArea);
                    
                    let result;
                    if (focusArea === 'code') {
                        result = await window.LLMHandler.generateCodeWithLLM(inputCode);
                    } else {
                        result = await window.LLMHandler.analyzeCodeWithLLM(inputCode, focusArea);
                    }
                    
                    if (focusArea === 'code') {
                        $('#codeOutput').text(result);
                        $('#codeOutput').attr('class', 'language-markup');
                        Prism.highlightElement(document.getElementById('codeOutput'));
                        $('#copyBtn, #downloadBtn').prop('disabled', false);
                        $('#analysisOutput').addClass('d-none');
                    } else {
                        $('#analysisOutput').html('<div class="analysis-result">' + result.replace(/\n/g, '<br>') + '</div>').removeClass('d-none');
                        $('#codeOutput').text('');
                        $('#copyBtn, #downloadBtn').prop('disabled', true);
                    }
                } catch (apiError) {
                    console.error('API Error:', apiError);
                    $('#analysisOutput').html(`<div class="alert alert-danger">API Error: ${apiError.message}</div>`).removeClass('d-none');
                }
            } else {
                processInput(inputCode, currentMode);
            }
        } catch (error) {
            console.error('Processing Error:', error);
            $('#analysisOutput').html(`<div class="alert alert-danger">Error: ${error.message}</div>`).removeClass('d-none');
        } finally {
            // Hide loading indicator
            $('#loadingIndicator').addClass('d-none');
        }
    });
    
    // Copy button click handler
    $('#copyBtn').click(function() {
        const outputCode = $('#codeOutput').text();
        if (outputCode) {
            navigator.clipboard.writeText(outputCode)
                .then(() => {
                    const originalText = $(this).text();
                    $(this).text('Copied!');
                    setTimeout(() => {
                        $(this).text(originalText);
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                    alert('Failed to copy to clipboard');
                });
        }
    });
    
    // Download button click handler
    $('#downloadBtn').click(function() {
        const outputCode = $('#codeOutput').text();
        if (outputCode) {
            const fileType = getFileType();
            const blob = new Blob([outputCode], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `ui-component.${fileType}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    });
    
    // Helper functions
    function setMode(mode) {
        currentMode = mode;
        $('.list-group-item').removeClass('active');
        $(`#${mode}Btn`).addClass('active');
        
        // Reset output
        $('#codeOutput').text('');
        $('#analysisOutput').addClass('d-none');
        $('#copyBtn, #downloadBtn').prop('disabled', true);
    }
    
    function showOptionsForMode(mode) {
        const optionsPanel = $('#optionsPanel');
        optionsPanel.removeClass('d-none');
        
        // Clear previous content
        optionsPanel.find('.card-body').html('');
        
        let optionsHTML = '';
        
        switch(mode) {
            case 'generate':
                optionsHTML = `
                    <div class="mb-3">
                        <label for="componentType" class="form-label">Component Type</label>
                        <select id="componentType" class="form-select">
                            <option value="form">Form</option>
                            <option value="navbar">Navigation Bar</option>
                            <option value="card">Card</option>
                            <option value="table">Table</option>
                            <option value="modal">Modal Dialog</option>
                            <option value="custom">Custom (describe in input)</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="styleType" class="form-label">Style Framework</label>
                        <select id="styleType" class="form-select">
                            <option value="bootstrap">Bootstrap 5</option>
                            <option value="tailwind">Tailwind CSS</option>
                            <option value="plain">Plain CSS</option>
                        </select>
                    </div>
                    <button id="browseTemplatesBtn" class="btn btn-outline-secondary btn-sm">Browse Templates</button>
                `;
                break;
                
            case 'analyzeDesign':
                optionsHTML = `
                    <div class="mb-3">
                        <label class="form-label">Analysis Focus</label>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="layout" id="layoutCheck" checked>
                            <label class="form-check-label" for="layoutCheck">Layout Structure</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="colors" id="colorsCheck" checked>
                            <label class="form-check-label" for="colorsCheck">Color Scheme</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="spacing" id="spacingCheck" checked>
                            <label class="form-check-label" for="spacingCheck">Spacing & Alignment</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="responsiveness" id="responsivenessCheck" checked>
                            <label class="form-check-label" for="responsivenessCheck">Responsiveness</label>
                        </div>
                    </div>
                `;
                break;
                
            case 'analyzeCode':
                optionsHTML = `
                    <div class="mb-3">
                        <label class="form-label">Analysis Focus</label>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="performance" id="performanceCheck" checked>
                            <label class="form-check-label" for="performanceCheck">Performance Issues</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="bestPractices" id="bestPracticesCheck" checked>
                            <label class="form-check-label" for="bestPracticesCheck">Best Practices</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="compatibility" id="compatibilityCheck" checked>
                            <label class="form-check-label" for="compatibilityCheck">Browser Compatibility</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="maintainability" id="maintainabilityCheck" checked>
                            <label class="form-check-label" for="maintainabilityCheck">Code Maintainability</label>
                        </div>
                    </div>
                `;
                break;
                
            case 'accessibility':
                optionsHTML = `
                    <div class="mb-3">
                        <label class="form-label">Accessibility Level</label>
                        <select id="accessibilityLevel" class="form-select">
                            <option value="A">WCAG 2.1 Level A</option>
                            <option value="AA" selected>WCAG 2.1 Level AA</option>
                            <option value="AAA">WCAG 2.1 Level AAA</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">Focus Areas</label>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="keyboard" id="keyboardCheck" checked>
                            <label class="form-check-label" for="keyboardCheck">Keyboard Navigation</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="screenReader" id="screenReaderCheck" checked>
                            <label class="form-check-label" for="screenReaderCheck">Screen Reader Compatibility</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="contrast" id="contrastCheck" checked>
                            <label class="form-check-label" for="contrastCheck">Color Contrast</label>
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="semantics" id="semanticsCheck" checked>
                            <label class="form-check-label" for="semanticsCheck">Semantic HTML</label>
                        </div>
                    </div>
                `;
                break;

            case 'aiAssistant':
                optionsHTML = `
                    <div class="alert alert-info">
                        <i class="bi bi-info-circle"></i> This feature requires a valid LLM API key. Set your API key in settings.
                    </div>
                    <div class="mb-3">
                        <label for="aiFocus" class="form-label">Focus Area</label>
                        <select id="aiFocus" class="form-select">
                            <option value="code">Code Generation</option>
                            <option value="improvement">Code Improvement</option>
                            <option value="design">Design Suggestions</option>
                            <option value="accessibility">Accessibility</option>
                        </select>
                    </div>
                `;
                break;
                
            default:
                optionsHTML = '<p>Select an option from the list</p>';
        }
        
        optionsPanel.find('.card-body').html(optionsHTML);
        
        // Add event listener for template browsing button if it exists
        $('#browseTemplatesBtn').on('click', function() {
            openTemplatesModal();
        });

        // Setup LLM settings if in AI Assistant mode
        if (mode === 'aiAssistant' && window.LLMHandler && typeof window.LLMHandler.setupLLMSettings === 'function') {
            try {
                // Only setup LLM settings in the options panel if the settings icon doesn't exist
                if (!document.querySelector('.llm-settings-icon')) {
                    window.LLMHandler.setupLLMSettings();
                } else {
                    // If settings icon exists, just add a note about using the settings icon
                    optionsPanel.find('.card-body').append('<div class="alert alert-info mt-3">Click the settings icon in the top-right corner to configure LLM settings.</div>');
                }
            } catch (error) {
                console.error('Error setting up LLM settings:', error);
                optionsPanel.find('.card-body').append('<div class="alert alert-danger mt-3">Error initializing LLM settings</div>');
            }
        }
    }
    
    function updatePlaceholderText(text) {
        $('#codeInput').attr('placeholder', text);
    }
    
    function getFileType() {
        // Determine file type based on content and mode
        if (currentMode === 'generate') {
            const componentType = $('#componentType').val();
            if (componentType === 'form' || componentType === 'navbar' || componentType === 'card' || componentType === 'table' || componentType === 'modal') {
                return 'html';
            }
        }
        
        // Default to html if can't determine
        return 'html';
    }
    
    function openTemplatesModal() {
        // Populate templates
        populateTemplates();
        templatesModal.show();
    }
    
    function processInput(input, mode) {
        // Simulate processing time
        setTimeout(() => {
            let result = '';
            
            switch(mode) {
                case 'generate':
                    result = handleGeneration(input);
                    $('#codeOutput').text(result);
                    $('#codeOutput').attr('class', 'language-markup');
                    Prism.highlightElement(document.getElementById('codeOutput'));
                    $('#copyBtn, #downloadBtn').prop('disabled', false);
                    $('#analysisOutput').addClass('d-none');
                    break;
                    
                case 'analyzeDesign':
                    result = handleDesignAnalysis(input);
                    $('#analysisOutput').html(result).removeClass('d-none');
                    $('#codeOutput').text('');
                    $('#copyBtn, #downloadBtn').prop('disabled', true);
                    break;
                    
                case 'analyzeCode':
                    result = handleCodeAnalysis(input);
                    $('#analysisOutput').html(result).removeClass('d-none');
                    $('#codeOutput').text('');
                    $('#copyBtn, #downloadBtn').prop('disabled', true);
                    break;
                    
                case 'accessibility':
                    result = handleAccessibilityAnalysis(input);
                    $('#analysisOutput').html(result).removeClass('d-none');
                    $('#codeOutput').text('');
                    $('#copyBtn, #downloadBtn').prop('disabled', true);
                    break;
                    
                default:
                    result = 'Please select a feature first.';
                    $('#analysisOutput').html(`<div class="alert alert-warning">${result}</div>`).removeClass('d-none');
            }
            
            // Hide loading indicator
            $('#loadingIndicator').addClass('d-none');
        }, 1000); 
    }
    
    // Initialize with generate mode
    $('#generateBtn').click();
});