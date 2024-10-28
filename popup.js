document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const translateBtn = document.getElementById('translateBtn');
    const clearBtn = document.getElementById('clearInput');
    const copyBtn = document.getElementById('copyOutput');
    const zhToEnBtn = document.getElementById('zhToEn');
    const enToZhBtn = document.getElementById('enToZh');
    const errorDiv = document.getElementById('error');

    const API_BASE_URL = 'https://api.cerebras.ai/v1';
    let currentMode = 'zhToEn'; // Default translation mode

    // Language switch handlers
    zhToEnBtn.addEventListener('click', () => {
        currentMode = 'zhToEn';
        zhToEnBtn.classList.add('active');
        enToZhBtn.classList.remove('active');
        updatePlaceholders();
    });

    enToZhBtn.addEventListener('click', () => {
        currentMode = 'enToZh';
        enToZhBtn.classList.add('active');
        zhToEnBtn.classList.remove('active');
        updatePlaceholders();
    });

    function updatePlaceholders() {
        inputText.placeholder = currentMode === 'zhToEn' ? 
            '请输入中文...' : 
            'Enter English text...';
        outputText.placeholder = currentMode === 'zhToEn' ? 
            'English translation will appear here...' : 
            '中文翻译将显示在这里...';
    }

    // Translation function
    async function translate() {
        const text = inputText.value.trim();
        if (!text) {
            showError('Please enter text to translate');
            return;
        }

        translateBtn.disabled = true;
        try {
            const systemPrompt = currentMode === 'zhToEn' ?
                "You are restricted to only output the english translation of user's input." :
                "You are restricted to only output the chinese translation of user's input.";

            const response = await fetch(`${API_BASE_URL}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${await getCerebrasApiKey()}`
                },
                body: JSON.stringify({
                    messages: [
                        {
                            "role": "system",
                            "content": systemPrompt
                        },
                        {
                            "role": "user",
                            "content": text
                        }
                    ],
                    model: 'llama3.1-70b',
                    stream: false,
                    max_completion_tokens: 1024,
                    temperature: 0.2,
                    top_p: 1
                })
            });

            if (!response.ok) {
                throw new Error('Translation failed');
            }

            const data = await response.json();
            outputText.value = data.choices[0].message.content.trim();
            hideError();
        } catch (error) {
            showError('Translation failed. Please check your API key and try again.');
            console.error('Translation error:', error);
        } finally {
            translateBtn.disabled = false;
        }
    }

    // Get API key from storage
    async function getCerebrasApiKey() {
        return new Promise((resolve) => {
            chrome.storage.sync.get(['cerebrasApiKey'], function(result) {
                resolve(result.cerebrasApiKey || '');
            });
        });
    }

    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }

    function hideError() {
        errorDiv.style.display = 'none';
    }

    // Event Listeners
    translateBtn.addEventListener('click', translate);

    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        outputText.value = '';
        hideError();
    });

    copyBtn.addEventListener('click', () => {
        outputText.select();
        document.execCommand('copy');
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    });

    // Initialize placeholders
    updatePlaceholders();
});