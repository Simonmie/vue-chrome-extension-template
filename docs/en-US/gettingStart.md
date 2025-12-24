# Getting Started

## Install Dependencies

```bash
npm install
```

## Project Structure

```bash
src/
├── assets
├── background
│   ├── dev-hmr.js  // Hot reload script for 
development
│   └── main.js     // Background script
├── logic
│   └── common-setup.js  // Common setup script
├── manifest.js          // manifest.json 
generator script
├── options              // Options page
│   ├── OptionsPage.vue 
│   ├── index.html
│   └── main.js
├── popup                // Popup
│   ├── PopupComponent.vue
│   ├── index.html
│   └── main.js
├── sidepanel            // Side panel
│   ├── SidePanel.vue
│   ├── assets
│   │   └── logo.png
│   ├── index.html
│   └── main.js
└── utils
    ├── base.js   // Basic utility functions
    └── config.js // Configuration helpers
```

## How to Develop?

### Start Hot Reload

```bash
npm run dev:ext
```

### Install the Extension

1. Open Chrome.
2. Click the browser menu (usually the three-dot icon) and select "More tools" > "Extensions".
3. On the Extensions page, turn on "Developer mode".
4. Click "Load unpacked" and choose the extension folder in the project root.

## How to Package and Publish?

### CRX Packaging

```bash
npm run build:crx
```

This command will:

1. Build the extension code
2. Automatically generate/reuse the key file (`key.pem`)
3. Generate the `extension.crx` installation file
4. Generate the `extension.zip` release package

### Packaging Output

After successful execution, the following files will be generated in the project root:

- `extension.crx`: Chrome extension installation file (can be dragged directly into Chrome for installation)
- `extension.zip`: Chrome Web Store release package (for uploading to the store)
- `key.pem`: Extension signing key (generated only on first run, automatically ignored by Git)

### Key Notes

- The key is used to verify the extension's integrity and developer identity
- Generated automatically on first run, reused on subsequent runs
- The key file `key.pem` is added to `.gitignore` and will not be committed to the repository
- Please keep the key safe; losing it will prevent updating published extensions

### Install CRX File

1. Open Chrome's extension management page
2. Drag the generated `extension.crx` file to the page
3. Click "Add extension" to confirm installation

### Publish to Chrome Web Store

1. Sign in to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Click "New extension" or select an existing extension
3. Upload the generated `extension.zip` file
4. Fill in extension information and submit for review
