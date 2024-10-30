document.addEventListener('DOMContentLoaded', function() {
    const defaultSettings = {
        cerebrasApiKey: '',
        zhToEnPrompt: 'You are restricted to only output the english translation of user\'s input.',
        enToZhPrompt: 'You are restricted to only output the chinese translation of user\'s input.',
        translationStyle: 'accurate',
        temperature: 0.2,
        topP: 1.0
    };

    // Load saved settings
    chrome.storage.sync.get(defaultSettings, function(settings) {
        document.getElementById('apiKey').value = settings.cerebrasApiKey;
        document.getElementById('zhToEnPrompt').value = settings.zhToEnPrompt;
        document.getElementById('enToZhPrompt').value = settings.enToZhPrompt;
        document.getElementById('translationStyle').value = settings.translationStyle;
        document.getElementById('temperature').value = settings.temperature;
        document.getElementById('topP').value = settings.topP;
        
        // Update range value displays
        document.getElementById('temperatureValue').textContent = settings.temperature;
        document.getElementById('topPValue').textContent = settings.topP;
    });

    // Handle range input changes
    document.getElementById('temperature').addEventListener('input', function(e) {
        document.getElementById('temperatureValue').textContent = e.target.value;
    });

    document.getElementById('topP').addEventListener('input', function(e) {
        document.getElementById('topPValue').textContent = e.target.value;
    });

    // Save settings
    document.getElementById('save').addEventListener('click', function() {
        const settings = {
            cerebrasApiKey: document.getElementById('apiKey').value,
            zhToEnPrompt: document.getElementById('zhToEnPrompt').value || defaultSettings.zhToEnPrompt,
            enToZhPrompt: document.getElementById('enToZhPrompt').value || defaultSettings.enToZhPrompt,
            translationStyle: document.getElementById('translationStyle').value,
            temperature: parseFloat(document.getElementById('temperature').value),
            topP: parseFloat(document.getElementById('topP').value)
        };

        chrome.storage.sync.set(settings, function() {
            const status = document.getElementById('status');
            status.textContent = 'Settings saved successfully!';
            status.className = 'success';
            status.style.display = 'block';
            setTimeout(function() {
                status.style.display = 'none';
            }, 2000);
        });
    });

    // Apply translation style presets
    document.getElementById('translationStyle').addEventListener('change', function(e) {
        const style = e.target.value;
        const temperatureInput = document.getElementById('temperature');
        const topPInput = document.getElementById('topP');
        
        switch(style) {
            case 'accurate':
                temperatureInput.value = '0.2';
                topPInput.value = '1.0';
                break;
            case 'casual':
                temperatureInput.value = '0.5';
                topPInput.value = '0.9';
                break;
            case 'literary':
                temperatureInput.value = '0.7';
                topPInput.value = '0.95';
                break;
            case 'technical':
                temperatureInput.value = '0.1';
                topPInput.value = '1.0';
                break;
        }

        // Update range value displays
        document.getElementById('temperatureValue').textContent = temperatureInput.value;
        document.getElementById('topPValue').textContent = topPInput.value;
    });
});
