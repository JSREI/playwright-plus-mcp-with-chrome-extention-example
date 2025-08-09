#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * 构建 Chrome 扩展的脚本
 * 从 src 目录构建到 dist 目录
 */

const SRC_DIR = path.join(__dirname, '..', 'src');
const DIST_DIR = path.join(__dirname, '..', 'dist');

function ensureDistDir() {
  if (!fs.existsSync(DIST_DIR)) {
    fs.mkdirSync(DIST_DIR, { recursive: true });
    console.log('Created dist directory');
  }
}

function copyFile(src, dest) {
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  fs.copyFileSync(src, dest);
  console.log(`Copied: ${path.relative(process.cwd(), src)} -> ${path.relative(process.cwd(), dest)}`);
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const items = fs.readdirSync(src);
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

function buildTypeScript() {
  console.log('Building TypeScript...');
  try {
    execSync('tsc', { stdio: 'inherit' });
    console.log('TypeScript build completed');
  } catch (error) {
    console.error('TypeScript build failed:', error.message);
    process.exit(1);
  }
}

function copyStaticFiles() {
  console.log('Copying static files...');
  
  // 复制 manifest.json
  const manifestSrc = path.join(SRC_DIR, 'manifest.json');
  const manifestDest = path.join(DIST_DIR, 'manifest.json');
  if (fs.existsSync(manifestSrc)) {
    copyFile(manifestSrc, manifestDest);
  }
  
  // 复制 CSS 文件
  const cssSrc = path.join(SRC_DIR, 'content.css');
  const cssDest = path.join(DIST_DIR, 'content.css');
  if (fs.existsSync(cssSrc)) {
    copyFile(cssSrc, cssDest);
  }
  
  // 复制 HTML 文件
  const htmlSrc = path.join(SRC_DIR, 'popup.html');
  const htmlDest = path.join(DIST_DIR, 'popup.html');
  if (fs.existsSync(htmlSrc)) {
    copyFile(htmlSrc, htmlDest);
  }
  
  // 复制 JS 文件（如果存在）
  const jsSrc = path.join(SRC_DIR, 'popup.js');
  const jsDest = path.join(DIST_DIR, 'popup.js');
  if (fs.existsSync(jsSrc)) {
    copyFile(jsSrc, jsDest);
  }
  
  // 复制 content.js（如果存在）
  const contentJsSrc = path.join(SRC_DIR, 'content.js');
  const contentJsDest = path.join(DIST_DIR, 'content.js');
  if (fs.existsSync(contentJsSrc)) {
    copyFile(contentJsSrc, contentJsDest);
  }
  
  // 复制 icons 目录
  const iconsSrc = path.join(SRC_DIR, 'icons');
  const iconsDest = path.join(DIST_DIR, 'icons');
  if (fs.existsSync(iconsSrc)) {
    copyDirectory(iconsSrc, iconsDest);
  }
}

function main() {
  console.log('Starting build process...');
  
  ensureDistDir();
  buildTypeScript();
  copyStaticFiles();
  
  console.log('Build completed successfully!');
  console.log(`Extension files are ready in: ${path.relative(process.cwd(), DIST_DIR)}`);
}

if (require.main === module) {
  main();
}

module.exports = { main };
