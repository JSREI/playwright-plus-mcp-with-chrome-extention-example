# Chrome Extension AI Automation Testing Solution

**English** | [中文版](README_ZH.md)

This is a project designed specifically for Chrome extension developers, demonstrating how to use Playwright MCP to enable AI assistants to automatically test your Chrome extensions. With this configuration, AI can load and test your extension functionality in a real browser environment.

## Core Value

- 🤖 **AI Automated Testing**: Let AI assistants directly test your Chrome extensions
- 🔧 **Real Environment Testing**: Run extensions in real Chrome browser
- 🚀 **Development Efficiency**: Automate repetitive testing tasks
- 📋 **Complete Test Coverage**: AI can test various extension functions and scenarios
- 🎯 **Instant Feedback**: Quickly validate extension functionality during development

## Use Cases

### Typical Chrome Extension Testing Scenarios

1. **Functional Testing**: AI automatically tests various extension features
2. **Compatibility Testing**: Test extension performance on different websites
3. **User Interaction Testing**: Simulate user clicks, inputs, and other operations
4. **Regression Testing**: Automatically verify functionality after code updates
5. **Performance Testing**: Check extension's impact on page performance

### AI Testing Examples

```
Developer: Please test my ad blocker extension on Baidu homepage
AI: Sure, I'll test it for you:
1. Open Baidu homepage
2. Check if extension loads correctly
3. Verify ads are blocked
4. Test extension icon and popup window
5. Generate test report
```

## Quick Start

### 1. Prepare Your Extension Project
```bash
# Clone this template project
git clone <repository-url>
cd chrome-extension-ai-testing

# Or copy configuration files to your extension project
cp playwright-mcp-config.json /path/to/your/extension/
```

### 2. Build Your Extension
```bash
# Make sure your extension builds to dist directory
npm run build
# Or your build command
```

### 3. Configure AI Testing Environment

## Core Feature: Playwright MCP Extension Loading

### What is Playwright MCP?

Playwright MCP (Model Context Protocol) is a browser automation server based on Playwright that allows AI assistants (like Claude) to control browsers through the MCP protocol. This project demonstrates how to load local Chrome extensions in Playwright MCP.

### Configuration Steps

**Step 1: MCP Client Configuration**

Add the following configuration to your MCP client (like Claude Desktop) configuration file:

```json
{
  "mcpServers": {
    "playwright-plus": {
      "command": "npx",
      "args": [
        "-y",
        "@ai-coding-labs/playwright-mcp-plus@0.0.34",
        "--config",
        "/Users/cc11001100/github/JSREI/playwright-plus-mcp-with-chrome-extention-example/playwright-mcp-config.json"
      ]
    }
  }
}
```

**Step 2: Playwright Extension Configuration**

The `playwright-mcp-config.json` file in the project shows the core configuration for extension loading:

```json
{
  "browser": {
    "browserName": "chromium",
    "launchOptions": {
      "channel": "chrome",
      "headless": false,
      "args": [
        "--load-extension=/Users/cc11001100/github/JSREI/playwright-plus-mcp-with-chrome-extention-example/dist",
        "--disable-extensions-except=/Users/cc11001100/github/JSREI/playwright-plus-mcp-with-chrome-extention-example/dist"
      ]
    }
  },
  "projectIsolation": true
}
```

### Key Configuration Analysis

**Core parameters for extension loading:**
```bash
--load-extension=/path/to/extension/dist
--disable-extensions-except=/path/to/extension/dist
```

**Important configuration items:**
- `headless: false` - Extensions need visual interface
- `channel: "chrome"` - Use Chrome browser (supports extensions)
- `projectIsolation: true` - Project isolation to avoid extension conflicts

**Path configuration:**
- Extension path must point to the built `dist` directory
- Supports both absolute and relative paths
- Can load multiple extensions simultaneously (comma-separated)

### AI Automated Testing in Practice

**Basic test commands:**
```
AI: Please help me test the basic functionality of this extension
```

**Specific test scenarios:**
```
AI: Please execute the following tests:
1. Open https://example.com
2. Check if extension icon is displayed
3. Click extension icon and verify popup window
4. Test main extension functionality
5. Check console for errors
6. Take screenshot and save test results
```

**Advanced test scenarios:**
```
AI: Please perform comprehensive extension testing:
1. Test extension compatibility on 5 different websites
2. Test all user interaction features of the extension
3. Verify extension permissions work correctly
4. Check extension's impact on page performance
5. Generate detailed test report
```

## Adapting Your Extension Project

### 1. Copy Configuration Files
```bash
# Copy configuration file to your extension project root directory
cp playwright-mcp-config.json /path/to/your/extension/
```

### 2. Modify Extension Path
Edit `playwright-mcp-config.json` and update the extension path:
```json
{
  "browser": {
    "launchOptions": {
      "args": [
        "--load-extension=/path/to/your/extension/dist",
        "--disable-extensions-except=/path/to/your/extension/dist"
      ]
    }
  }
}
```

### 3. Update MCP Client Configuration
Point to the new configuration file in your MCP client configuration:
```json
{
  "mcpServers": {
    "playwright-plus": {
      "command": "npx",
      "args": [
        "-y",
        "@ai-coding-labs/playwright-mcp-plus@0.0.34",
        "--config",
        "/path/to/your/extension/playwright-mcp-config.json"
      ]
    }
  }
}
```

### 4. Start AI Testing
Restart the MCP client, and then you can have AI test your extension!

## Practical Testing Examples

### Example 1: Ad Blocker Extension Testing
```
Developer: I developed an ad blocker extension, please help me test it

AI executes:
1. Open websites with ads (like news sites)
2. Check extension icon status
3. Verify ads are successfully blocked
4. Test whitelist functionality
5. Check extension's impact on page loading speed
6. Generate test report
```

### Example 2: Password Manager Extension Testing
```
Developer: Please test the login functionality of my password manager extension

AI executes:
1. Open login page (like GitHub login)
2. Check if extension detects login form
3. Test auto-fill functionality
4. Verify password generator
5. Test secure storage functionality
6. Check compatibility with different websites
```

### Example 3: Developer Tools Extension Testing
```
Developer: My React DevTools extension needs comprehensive testing

AI executes:
1. Open React application website
2. Check if extension correctly identifies React components
3. Test component tree display
4. Verify Props and State viewing functionality
5. Test performance analysis tools
6. Check compatibility with different React versions
```

## Project Structure

```
├── playwright-mcp-config.json      # 🎯 Core: Playwright MCP configuration file
├── dist/                           # 🎯 Core: Build output directory (MCP loads this directory)
│   ├── manifest.json               # Extension manifest file
│   ├── content.js                  # Content script (compiled)
│   ├── content.css                 # Style file
│   ├── popup.html                  # Popup window
│   ├── popup.js                    # Popup window script
│   └── icons/                      # Extension icons
├── src/                            # 📁 Source directory (all plugin source files)
│   ├── manifest.json               # Extension manifest (source file)
│   ├── content.ts                  # TypeScript content script
│   ├── content.js                  # JavaScript content script
│   ├── content.css                 # Style file (source file)
│   ├── popup.html                  # Popup window (source file)
│   ├── popup.js                    # Popup window script (source file)
│   └── icons/                      # Icon files (source files)
│       ├── icon16.png
│       ├── icon48.png
│       └── icon128.png
├── scripts/                        # Build and tool scripts
│   └── build.js                    # Custom build script
├── package.json                    # Project configuration
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # Project documentation
```

**Key file descriptions:**
- `playwright-mcp-config.json` - Playwright MCP extension loading configuration
- `src/` - All plugin source files, modify files here during development
- `dist/` - Built extension files, this is the directory MCP actually loads
- `scripts/build.js` - Automated build script, builds from src to dist

## Development Guide

### Initialize Project
```bash
npm install
```

### Build Extension
```bash
# Complete build (TypeScript + static file copying)
npm run build

# Clean build directory
npm run clean
```

### Development Mode
```bash
# Build and watch file changes
npm run dev

# Watch only TypeScript file changes
npm run watch
```

### Development Workflow
1. **Modify source files**: Modify plugin code in `src/` directory
2. **Build project**: Run `npm run build` to generate `dist/` directory
3. **AI testing**: Use Playwright MCP to load `dist/` directory for testing
4. **Iterative development**: Repeat the above steps

### File Descriptions
- **Modify plugin functionality**: Edit `src/content.ts` or `src/content.js`
- **Modify styles**: Edit `src/content.css`
- **Modify popup window**: Edit `src/popup.html` and `src/popup.js`
- **Modify permissions and configuration**: Edit `src/manifest.json`

## Tech Stack

- **Playwright MCP** - AI-driven browser automation
- **Chrome Extension API** - Extension development and testing framework
- **Model Context Protocol** - Communication protocol between AI assistants and tools
- **TypeScript** - Type-safe extension development
- **Node.js** - Build and testing toolchain

## Why Choose AI Automated Testing?

### Traditional Testing vs AI Testing

**Traditional Manual Testing:**
- ❌ Repetitive work, low efficiency
- ❌ Easy to miss test scenarios
- ❌ Difficult to perform large-scale compatibility testing
- ❌ Test results not detailed enough

**AI Automated Testing:**
- ✅ Automatically execute complex test scenarios
- ✅ Comprehensive coverage of various edge cases
- ✅ Quick multi-website compatibility testing
- ✅ Generate detailed test reports and screenshots
- ✅ Available 24/7, test anytime
- ✅ Intelligently identify and report issues

## Chrome Extension Development Best Practices

### Development Workflow Integration

1. **Development Phase**
   ```bash
   # Develop your extension
   npm run dev

   # Let AI test in real-time
   AI: Please test the functionality I just modified
   ```

2. **Testing Phase**
   ```bash
   # Build extension
   npm run build

   # AI comprehensive testing
   AI: Please perform complete regression testing
   ```

3. **Pre-release Verification**
   ```bash
   AI: Please test extension compatibility on the following websites:
   - Google.com
   - GitHub.com
   - Stack Overflow
   - Your target websites
   ```

### Test Types

- **Functional Testing**: Verify core extension functionality
- **UI Testing**: Check extension interface and interactions
- **Compatibility Testing**: Multi-website environment testing
- **Performance Testing**: Check impact on page performance
- **Error Handling Testing**: Exception handling
- **Permission Testing**: Verify extension permission usage

## FAQ

### Q: What if the extension doesn't load?
1. **Check build output**: Ensure `dist` directory exists and contains `manifest.json`
2. **Verify path**: Confirm the extension path in configuration file is correct
3. **Check permissions**: Ensure extension has necessary permission declarations
4. **View console**: Have AI check browser console for error messages

### Q: Extension functionality abnormal during AI testing?
1. **Manual verification**: First manually test if extension works normally
2. **Check permissions**: Confirm extension permission configuration is correct
3. **View logs**: Have AI check extension error logs
4. **Simplify testing**: Start testing from simple functionality

### Q: How to test extensions requiring specific permissions?
```
AI: Please test my extension, it requires the following permissions:
- activeTab: Access current tab
- storage: Local storage
- notifications: Display notifications
Please verify these permissions work correctly
```

### Q: How to perform cross-website compatibility testing?
```
AI: Please test my extension on the following websites:
1. https://example.com - Basic functionality testing
2. https://github.com - Code website compatibility
3. https://youtube.com - Video website compatibility
4. https://docs.google.com - Document website compatibility
Test core extension functionality on each website
```

## Contributing

Welcome to submit Issues and Pull Requests!

### Contribution Guidelines
1. Fork the project
2. Create feature branch
3. Submit changes
4. Create Pull Request

## License

MIT License

## Related Resources

- [Playwright MCP Official Documentation](https://github.com/ai-coding-labs/playwright-mcp-plus)
- [Chrome Extension Development Guide](https://developer.chrome.com/docs/extensions/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
