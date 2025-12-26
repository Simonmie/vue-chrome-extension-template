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
2. Click the browser menu (usually the three-dot icon) and select “More tools” > “Extensions”.
3. On the Extensions page, turn on “Developer mode”.
4. Click “Load unpacked” and choose the extension folder in the project root.

## How to Build?

### Build for Production

```bash
npm run build
```

### Build as CRX3 File

```bash
npm run build:crx
```

After execution, the following files will be generated in the project's `release` directory:

- `extension.crx`: Chrome extension installation file
- `extension.zip`: Extension package file (can be uploaded to Chrome Web Store)

And the following file will be generated in the project root directory:

- `key.pem`: Private key file (used for subsequent extension updates)

### Notes

- The `key.pem` file will be automatically generated when executing `build:crx` for the first time
- Please keep the `key.pem` file properly, as the same key is required for subsequent extension updates
- Do not commit the `key.pem` file to version control systems
