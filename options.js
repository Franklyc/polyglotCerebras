document.addEventListener('DOMContentLoaded', function() {
    // Load saved API key
    chrome.storage.sync.get(['cerebrasApiKey'], function(result) {
        document.getElementById('apiKey').value = result.cerebrasApiKey || '';
    });

    // Save API key
    document.getElementById('save').addEventListener('click', function() {
        const apiKey = document.getElementById('apiKey').value;
        chrome.storage.sync.set({
            cerebrasApiKey: apiKey
        }, function() {
            const status = document.getElementById('status');
            status.textContent = 'Settings saved successfully!';
            status.className = 'success';
            status.style.display = 'block';
            setTimeout(function() {
                status.style.display = 'none';
            }, 2000);
        });
    });
});
