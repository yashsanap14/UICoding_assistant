/**
 * UI Code Assistant - LLM Integration
 */

// LLM API configuration
let apiKey = localStorage.getItem('llm_api_key') || '';
let apiEndpoint = localStorage.getItem('llm_api_endpoint') || 'https://openrouter.ai/api/v1/chat/completions'; // Default to OpenRouter
let apiModel = localStorage.getItem('llm_api_model') || 'mistralai/mistral-small-3.1-24b-instruct:free'; // Default to Mistral Small

// Function to set API key
function setApiKey(key) {
    apiKey = key;
    localStorage.setItem('llm_api_key', key);
    console.log('API key saved to localStorage');
}

// Function to set API endpoint
function setApiEndpoint(endpoint) {
    apiEndpoint = endpoint;
    localStorage.setItem('llm_api_endpoint', endpoint);
    console.log('API endpoint saved to localStorage');
}

// Function to set API model
function setApiModel(model) {
    apiModel = model;
    localStorage.setItem('llm_api_model', model);
    console.log('API model saved to localStorage:', model);
}

// Function to check if API key is set
function hasValidApiKey() {
    console.log('Checking API key validity:', apiKey ? 'Key exists' : 'No key found');
    return apiKey && apiKey.length > 0;
}

// Function to generate code using LLM
async function generateCodeWithLLM(prompt) {
    console.log('Starting code generation with prompt:', prompt.substring(0, 30) + '...');
    
    if (!hasValidApiKey()) {
        const error = new Error('No valid API key found. Please set your LLM API key in settings.');
        console.error(error);
        throw error;
    }

    try {
        console.log('Making API request to:', apiEndpoint);
        console.log('Using model:', apiModel);
        
        const requestBody = {
            model: apiModel,
            messages: [
                {
                    role: 'system',
                    content: 'You are an expert UI developer. Generate a complete signup page using only a single HTML file. All CSS and JavaScript must be written inline, inside <style> and <script> tags. Your response should include: - Clean, modern, and accessible design - HTML form with Full Name, Email, Password, Confirm Password - Inline CSS for styling - Inline JavaScript for basic form validation. IMPORTANT: Provide improvement suggestions directly as **code comments** inside the HTML, CSS, or JS. These comments should guide the user on how to further enhance visuals, UX, accessibility, responsiveness, interactivity, or security. Avoid writing a separate explanation section at the end. All suggestions must be embedded as comments inside the code.Do NOT include any triple backticks (like \`\`\`html or \`\`\`) in your response. Just return the raw HTML content starting with <!DOCTYPE html>. Do NOT include any triple backticks (like \`\`\`) in your response. Just return the raw HTML content starting with \`\`\`'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 2000
        };
        
        console.log('Request payload:', JSON.stringify(requestBody));
        
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API response error:', errorText);
            throw new Error(`API request failed: ${response.statusText} (${response.status})`);
        }

        const data = await response.json();
        console.log('API response received:', data);
        
        if (!data.choices || data.choices.length === 0) {
            throw new Error('Invalid API response format');
        }
        
        return data.choices[0].message.content;
    } catch (error) {
        console.error('LLM API Error:', error);
        throw error;
    }
}

// Function to analyze code and suggest improvements using LLM
async function analyzeCodeWithLLM(code, focus) {
    console.log('Starting code analysis with focus:', focus);
    
    if (!hasValidApiKey()) {
        const error = new Error('No valid API key found. Please set your LLM API key in settings.');
        console.error(error);
        throw error;
    }

    try {
        console.log('Making API request to:', apiEndpoint);
        console.log('Using model:', apiModel);
        
        const requestBody = {
            model: apiModel,
            messages: [
                {
                    role: 'system',
                    content: `You are an expert UI developer. Analyze the provided code and suggest improvements focusing on ${focus}. Include specific code examples for improvements.`
                },
                {
                    role: 'user',
                    content: `Here's the code to analyze:\n\n${code}\n\nFocus on: ${focus}`
                }
            ],
            temperature: 0.7,
            max_tokens: 2000
        };
        
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        console.log('Response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API response error:', errorText);
            throw new Error(`API request failed: ${response.statusText} (${response.status})`);
        }

        const data = await response.json();
        console.log('API response received');
        
        if (!data.choices || data.choices.length === 0) {
            throw new Error('Invalid API response format');
        }
        
        return data.choices[0].message.content;
    } catch (error) {
        console.error('LLM API Error:', error);
        throw error;
    }
}

// Function to handle LLM settings in the UI
function setupLLMSettings() {
    console.log('Setting up LLM settings panel');
    
    // Remove any existing settings panel to avoid duplicates
    $('.llm-settings-card').remove();
    
    const settingsHtml = `
        <div class="card mb-4 llm-settings-card" style="display: none;">
            <div class="card-header bg-secondary text-white d-flex justify-content-between align-items-center">
                <h2 class="h5 mb-0">LLM Settings</h2>
                <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label for="apiProvider" class="form-label">API Provider</label>
                    <select class="form-select" id="apiProvider">
                        <option value="openrouter" selected>OpenRouter</option>
                        <option value="openai">OpenAI</option>
                    </select>
                    <div class="form-text">Select your preferred API provider</div>
                </div>
                <div class="mb-3">
                    <label for="apiKey" class="form-label">API Key</label>
                    <input type="password" class="form-control" id="apiKey" value="${apiKey}">
                    <div class="form-text">Enter your API key to enable AI-powered features.</div>
                </div>
                <div class="mb-3">
                    <label for="apiEndpoint" class="form-label">API Endpoint</label>
                    <select class="form-select" id="apiEndpoint">
                        <optgroup label="OpenAI Endpoints">
                            <option value="https://api.openai.com/v1/chat/completions" ${apiEndpoint === 'https://api.openai.com/v1/chat/completions' ? 'selected' : ''}>OpenAI Chat Completions</option>
                            <option value="https://api.openai.com/v1/completions" ${apiEndpoint === 'https://api.openai.com/v1/completions' ? 'selected' : ''}>OpenAI Completions</option>
                        </optgroup>
                        <optgroup label="OpenRouter Endpoints">
                            <option value="https://openrouter.ai/api/v1/chat/completions" ${apiEndpoint === 'https://openrouter.ai/api/v1/chat/completions' ? 'selected' : ''}>OpenRouter Chat Completions</option>
                            <option value="https://openrouter.ai/api/v1/completions" ${apiEndpoint === 'https://openrouter.ai/api/v1/completions' ? 'selected' : ''}>OpenRouter Completions</option>
                        </optgroup>
                    </select>
                    <div class="form-text">Select the appropriate API endpoint for your provider</div>
                </div>
                <div class="mb-3">
                    <label for="apiModel" class="form-label">LLM Model</label>
                    <select class="form-select" id="apiModel">
                        <optgroup label="Free Models">
                            <option value="mistralai/mistral-small-3.1-24b-instruct:free">Mistral Small 24B</option>
                            <option value="open-r1/olympiccoder-7b:free">OlympicCoder 7B</option>
                            <option value="google/gemini-2.5-pro-exp-03-25:free">Gemini Pro 2.5</option>
                            <option value="qwen/qwen2.5-vl-3b-instruct:free">Qwen 2.5 VL</option>
                        </optgroup>
                        
                        <optgroup label="Premium Models">
                            <option value="anthropic/claude-3-opus-20240229">Claude 3 Opus</option>
                            <option value="anthropic/claude-3-sonnet-20240229">Claude 3 Sonnet</option>
                            <option value="anthropic/claude-3-haiku-20240307">Claude 3 Haiku</option>
                        </optgroup>
                        <optgroup label="OpenAI Models">
                            <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                            <option value="gpt-4">GPT-4</option>
                            <option value="gpt-4o">GPT-4o</option>
                        </optgroup>
                    </select>
                    <div class="form-text">Select the LLM model to use. Different providers support different models.</div>
                </div>
                <button id="saveLLMSettings" class="btn btn-primary">Save Settings</button>
                <button id="testLLMConnection" class="btn btn-outline-secondary ms-2">Test Connection</button>
                <a href="src/test-llm.html" target="_blank" class="btn btn-outline-info ms-2">Advanced Testing</a>
                <div id="llmConnectionStatus" class="mt-2"></div>
            </div>
        </div>
    `;

    // Add settings to the options panel or body depending on context
    if (document.querySelector('.llm-settings-icon')) {
        // If called from settings icon, append to body
        $('body').append(settingsHtml);
        
        // Add close button functionality
        $('.llm-settings-card .btn-close').click(function() {
            $('.llm-settings-card').hide();
            $('#toggleLLMSettings').removeClass('active');
            if (window.llmSettingsIcon) {
                window.llmSettingsIcon.active = false;
            }
        });
    } else {
        // If called from AI Assistant panel, append to options panel
        $('#optionsPanel .card-body').append(settingsHtml);
    }

    // Handle provider change
    $('#apiProvider').change(function() {
        const provider = $(this).val();
        const endpointSelect = $('#apiEndpoint');
        
        if (provider === 'openai') {
            endpointSelect.val('https://api.openai.com/v1/chat/completions');
        } else if (provider === 'openrouter') {
            endpointSelect.val('https://openrouter.ai/api/v1/chat/completions');
        }
    });

    // Handle save settings
    $('#saveLLMSettings').click(function() {
        const newApiKey = $('#apiKey').val();
        const newEndpoint = $('#apiEndpoint').val();
        const newModel = $('#apiModel').val();
        const provider = $('#apiProvider').val();
        
        if (newApiKey) {
            setApiKey(newApiKey);
            setApiEndpoint(newEndpoint);
            setApiModel(newModel);
            localStorage.setItem('llm_api_provider', provider);
            $('#llmConnectionStatus').html('<div class="alert alert-success">Settings saved successfully!</div>');
        } else {
            $('#llmConnectionStatus').html('<div class="alert alert-danger">Please enter a valid API key</div>');
        }
    });
    
    // Handle test connection
    $('#testLLMConnection').click(async function() {
        const statusElement = $('#llmConnectionStatus');
        statusElement.html('<div class="spinner-border spinner-border-sm text-primary" role="status"><span class="visually-hidden">Loading...</span></div> Testing connection...');
        
        if (!hasValidApiKey()) {
            statusElement.html('<div class="alert alert-danger">No valid API key found. Please set your API key first.</div>');
            return;
        }
        
        try {
            const provider = $('#apiProvider').val();
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            };

            // Add OpenRouter specific headers
            if (provider === 'openrouter') {
                headers['HTTP-Referer'] = window.location.origin;
                headers['X-Title'] = 'UI Code Assistant';
            }
            
            // Simple test request
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({
                    model: apiModel,
                    messages: [
                        { role: 'user', content: 'Test connection' }
                    ],
                    max_tokens: 5
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                statusElement.html('<div class="alert alert-success">Connection successful!</div>');
                console.log('Test response:', data);
            } else {
                const errorText = await response.text();
                statusElement.html(`<div class="alert alert-danger">Connection failed: ${response.status} ${response.statusText}</div>`);
                console.error('Test error:', errorText);
            }
        } catch (error) {
            console.error('Connection test error:', error);
            statusElement.html(`<div class="alert alert-danger">Connection failed: ${error.message}</div>`);
        }
    });
}

// Export functions
window.LLMHandler = {
    generateCodeWithLLM,
    analyzeCodeWithLLM,
    setupLLMSettings,
    hasValidApiKey,
    getModel: () => apiModel
};