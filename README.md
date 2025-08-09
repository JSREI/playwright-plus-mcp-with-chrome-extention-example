# Chrome 扩展 AI 自动化测试解决方案

**中文** | [English](README_EN.md)

这是一个专为 Chrome 扩展开发者设计的项目，展示如何使用 Playwright MCP 让 AI 助手自动化测试你的 Chrome 扩展。通过这个配置，AI 可以在真实的浏览器环境中加载并测试你的扩展功能。

## 核心价值

- 🤖 **AI 自动化测试**：让 AI 助手直接测试你的 Chrome 扩展
- 🔧 **真实环境测试**：在真实 Chrome 浏览器中运行扩展
- 🚀 **开发效率提升**：自动化重复的测试任务
- 📋 **完整测试覆盖**：AI 可以测试扩展的各种功能和场景
- 🎯 **即时反馈**：开发过程中快速验证扩展功能

## 使用场景

### 典型的 Chrome 扩展测试场景

1. **功能测试**：AI 自动测试扩展的各项功能
2. **兼容性测试**：在不同网站上测试扩展表现
3. **用户交互测试**：模拟用户点击、输入等操作
4. **回归测试**：代码更新后自动验证功能
5. **性能测试**：检查扩展对页面性能的影响

### AI 测试示例

```
开发者：请测试我的广告拦截扩展在百度首页的效果
AI：好的，我来为你测试：
1. 打开百度首页
2. 检查扩展是否正确加载
3. 验证广告是否被拦截
4. 测试扩展图标和弹出窗口
5. 生成测试报告
```

## 快速开始

### 1. 准备你的扩展项目
```bash
# 克隆这个模板项目
git clone <repository-url>
cd chrome-extension-ai-testing

# 或者将配置文件复制到你的扩展项目中
cp playwright-mcp-config.json /path/to/your/extension/
```

### 2. 构建你的扩展
```bash
# 确保你的扩展构建到 dist 目录
npm run build
# 或者你的构建命令
```

### 3. 配置 AI 测试环境

## 核心功能：Playwright MCP 扩展加载

### 什么是 Playwright MCP？

Playwright MCP (Model Context Protocol) 是一个基于 Playwright 的浏览器自动化服务器，它允许 AI 助手（如 Claude）通过 MCP 协议控制浏览器。本项目演示如何在 Playwright MCP 中加载本地 Chrome 扩展。

### 配置步骤

**步骤1：MCP 客户端配置**

在你的MCP客户端（如Claude Desktop）配置文件中添加以下配置：

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

**步骤2：Playwright 扩展配置**

项目中的 `playwright-mcp-config.json` 文件展示了扩展加载的核心配置：

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

### 关键配置解析

**扩展加载的核心参数：**
```bash
--load-extension=/path/to/extension/dist
--disable-extensions-except=/path/to/extension/dist
```

**重要配置项：**
- `headless: false` - 扩展需要可视化界面
- `channel: "chrome"` - 使用 Chrome 浏览器（支持扩展）
- `projectIsolation: true` - 项目隔离，避免扩展冲突

**路径配置：**
- 扩展路径必须指向构建后的 `dist` 目录
- 支持绝对路径和相对路径
- 可以同时加载多个扩展（用逗号分隔）

### AI 自动化测试实战

**基础测试命令：**
```
AI：请帮我测试这个扩展的基本功能
```

**具体测试场景：**
```
AI：请执行以下测试：
1. 打开 https://example.com
2. 检查扩展图标是否显示
3. 点击扩展图标，验证弹出窗口
4. 测试扩展的主要功能
5. 检查控制台是否有错误
6. 截图保存测试结果
```

**高级测试场景：**
```
AI：请进行完整的扩展测试：
1. 在 5 个不同网站测试扩展兼容性
2. 测试扩展的所有用户交互功能
3. 验证扩展权限是否正常工作
4. 检查扩展对页面性能的影响
5. 生成详细的测试报告
```

## 适配你的扩展项目

### 1. 复制配置文件
```bash
# 将配置文件复制到你的扩展项目根目录
cp playwright-mcp-config.json /path/to/your/extension/
```

### 2. 修改扩展路径
编辑 `playwright-mcp-config.json`，更新扩展路径：
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

### 3. 更新 MCP 客户端配置
在你的 MCP 客户端配置中指向新的配置文件：
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

### 4. 开始 AI 测试
重启 MCP 客户端，然后就可以让 AI 测试你的扩展了！

## 实际测试示例

### 示例 1：广告拦截扩展测试
```
开发者：我开发了一个广告拦截扩展，请帮我测试

AI 执行：
1. 打开包含广告的网站（如新闻网站）
2. 检查扩展图标状态
3. 验证广告是否被成功拦截
4. 测试白名单功能
5. 检查扩展对页面加载速度的影响
6. 生成测试报告
```

### 示例 2：密码管理器扩展测试
```
开发者：请测试我的密码管理器扩展的登录功能

AI 执行：
1. 打开登录页面（如 GitHub 登录）
2. 检查扩展是否检测到登录表单
3. 测试自动填充功能
4. 验证密码生成器
5. 测试安全存储功能
6. 检查不同网站的兼容性
```

### 示例 3：开发工具扩展测试
```
开发者：我的 React DevTools 扩展需要全面测试

AI 执行：
1. 打开 React 应用网站
2. 检查扩展是否正确识别 React 组件
3. 测试组件树显示
4. 验证 Props 和 State 查看功能
5. 测试性能分析工具
6. 检查与不同 React 版本的兼容性
```

## 项目结构

```
├── playwright-mcp-config.json      # 🎯 核心：Playwright MCP 配置文件
├── dist/                           # 🎯 核心：构建输出目录（MCP 加载此目录）
│   ├── manifest.json               # 扩展清单文件
│   ├── content.js                  # 内容脚本（编译后）
│   ├── content.css                 # 样式文件
│   ├── popup.html                  # 弹出窗口
│   ├── popup.js                    # 弹出窗口脚本
│   └── icons/                      # 扩展图标
├── src/                            # 📁 源码目录（所有插件源文件）
│   ├── manifest.json               # 扩展清单（源文件）
│   ├── content.ts                  # TypeScript 内容脚本
│   ├── content.js                  # JavaScript 内容脚本
│   ├── content.css                 # 样式文件（源文件）
│   ├── popup.html                  # 弹出窗口（源文件）
│   ├── popup.js                    # 弹出窗口脚本（源文件）
│   └── icons/                      # 图标文件（源文件）
│       ├── icon16.png
│       ├── icon48.png
│       └── icon128.png
├── scripts/                        # 构建和工具脚本
│   └── build.js                    # 自定义构建脚本
├── package.json                    # 项目配置
├── tsconfig.json                   # TypeScript 配置
└── README.md                       # 项目文档
```

**重点文件说明：**
- `playwright-mcp-config.json` - Playwright MCP 的扩展加载配置
- `src/` - 所有插件源文件，开发时修改这里的文件
- `dist/` - 构建后的扩展文件，这是 MCP 实际加载的目录
- `scripts/build.js` - 自动化构建脚本，从 src 构建到 dist

## 开发指南

### 初始化项目
```bash
npm install
```

### 构建扩展
```bash
# 完整构建（TypeScript + 静态文件复制）
npm run build

# 清理构建目录
npm run clean
```

### 开发模式
```bash
# 构建并监听文件变化
npm run dev

# 仅监听 TypeScript 文件变化
npm run watch
```

### 开发流程
1. **修改源文件**：在 `src/` 目录下修改插件代码
2. **构建项目**：运行 `npm run build` 生成 `dist/` 目录
3. **AI 测试**：使用 Playwright MCP 加载 `dist/` 目录进行测试
4. **迭代开发**：重复上述步骤

### 文件说明
- **修改插件功能**：编辑 `src/content.ts` 或 `src/content.js`
- **修改样式**：编辑 `src/content.css`
- **修改弹出窗口**：编辑 `src/popup.html` 和 `src/popup.js`
- **修改权限和配置**：编辑 `src/manifest.json`

## 技术栈

- **Playwright MCP** - AI 驱动的浏览器自动化
- **Chrome Extension API** - 扩展开发和测试框架
- **Model Context Protocol** - AI 助手与工具的通信协议
- **TypeScript** - 类型安全的扩展开发
- **Node.js** - 构建和测试工具链

## 为什么选择 AI 自动化测试？

### 传统测试 vs AI 测试

**传统手动测试：**
- ❌ 重复性工作，效率低
- ❌ 容易遗漏测试场景
- ❌ 难以进行大规模兼容性测试
- ❌ 测试结果不够详细

**AI 自动化测试：**
- ✅ 自动执行复杂测试场景
- ✅ 全面覆盖各种边缘情况
- ✅ 快速进行多网站兼容性测试
- ✅ 生成详细的测试报告和截图
- ✅ 24/7 可用，随时测试
- ✅ 智能识别和报告问题

## Chrome 扩展开发最佳实践

### 开发流程集成

1. **开发阶段**
   ```bash
   # 开发你的扩展
   npm run dev

   # 让 AI 实时测试
   AI: 请测试我刚修改的功能
   ```

2. **测试阶段**
   ```bash
   # 构建扩展
   npm run build

   # AI 全面测试
   AI: 请进行完整的回归测试
   ```

3. **发布前验证**
   ```bash
   AI: 请在以下网站测试扩展兼容性：
   - Google.com
   - GitHub.com
   - Stack Overflow
   - 你的目标网站
   ```

### 测试类型

- **功能测试**：验证扩展核心功能
- **UI 测试**：检查扩展界面和交互
- **兼容性测试**：多网站环境测试
- **性能测试**：检查对页面性能影响
- **错误处理测试**：异常情况处理
- **权限测试**：验证扩展权限使用

## 常见问题

### Q: 扩展没有加载怎么办？
1. **检查构建输出**：确保 `dist` 目录存在且包含 `manifest.json`
2. **验证路径**：确认配置文件中的扩展路径正确
3. **检查权限**：确保扩展有必要的权限声明
4. **查看控制台**：让 AI 检查浏览器控制台的错误信息

### Q: AI 测试时扩展功能异常？
1. **手动验证**：先手动测试扩展是否正常工作
2. **检查权限**：确认扩展权限配置正确
3. **查看日志**：让 AI 检查扩展的错误日志
4. **简化测试**：从简单功能开始测试

### Q: 如何测试需要特定权限的扩展？
```
AI: 请测试我的扩展，它需要以下权限：
- activeTab: 访问当前标签页
- storage: 本地存储
- notifications: 显示通知
请验证这些权限是否正常工作
```

### Q: 如何进行跨网站兼容性测试？
```
AI: 请在以下网站测试我的扩展：
1. https://example.com - 基础功能测试
2. https://github.com - 代码网站兼容性
3. https://youtube.com - 视频网站兼容性
4. https://docs.google.com - 文档网站兼容性
每个网站都要测试扩展的核心功能
```

## 贡献

欢迎提交 Issue 和 Pull Request！

### 贡献指南
1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 发起 Pull Request

## 许可证

MIT License

## 相关资源

- [Playwright MCP 官方文档](https://github.com/ai-coding-labs/playwright-mcp-plus)
- [Chrome Extension 开发指南](https://developer.chrome.com/docs/extensions/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
