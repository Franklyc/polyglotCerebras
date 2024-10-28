# Cerebras Translator

**Cerebras Translator** is a sleek, user-friendly Chrome extension designed for quick and easy Chinese-English translation. Powered by the Cerebras AI, it provides reliable translations with just a click, making it perfect for language learners, travelers, and anyone working with bilingual text.

## Features

- **Instant Translation**: Translates text between Chinese and English with a simple interface.
- **Language Toggle**: Switch seamlessly between Chinese-to-English and English-to-Chinese translation modes.
- **Copy and Clear Options**: Easily copy translation results or clear input text fields with a single click.
- **API Key Management**: Securely store and manage your Cerebras API key through the extension's settings page.
- **Error Handling**: Built-in notifications for failed translations or missing API keys.
- **Responsive UI**: Beautiful, minimalist design with a clean layout and intuitive buttons.

## Getting Started

### Prerequisites
- A valid **Cerebras API Key** for accessing the translation service.
- Google Chrome browser.

### Installation

1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer Mode**.
4. Click on **Load unpacked** and select the directory of this project.
5. The extension icon will now appear in your Chrome toolbar.

### Setting up the API Key

1. Click the extension icon in the Chrome toolbar to open the popup.
2. Go to **Options** (Settings) to enter and save your Cerebras API Key.
3. Once saved, you're ready to start translating!

## Usage

1. Click the extension icon to open the Cerebras Translator.
2. Choose your preferred translation direction (e.g., Chinese to English).
3. Enter the text you wish to translate and click the **Translate** button.
4. View the translation output and use the **Copy** button to save it to your clipboard.

## File Structure

- `popup.html`: HTML layout for the popup UI.
- `popup.css`: Styling for a clean and consistent user interface.
- `popup.js`: JavaScript to handle user interactions, translation requests, and error handling.
- `background.js`: Background script to initialize the extension on install.
- `manifest.json`: Metadata and configuration for the Chrome extension.
- `options.html` and `options.js`: Settings page for managing the API key securely.

## Contributing

Contributions are welcome! Please feel free to open issues or submit pull requests with improvements.

## License

This project is licensed under the MIT License.

---

**Enjoy fast, reliable translations with the Cerebras Translator!**
