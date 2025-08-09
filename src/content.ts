// 创建全屏圆形对号元素
function createFullScreenCheckmark(): void {
  // 检查是否已经存在，避免重复创建
  if (document.getElementById('fullscreen-checkmark')) {
    return;
  }

  // 创建容器
  const container = document.createElement('div');
  container.id = 'fullscreen-checkmark';
  container.setAttribute('class', 'fullscreen-checkmark-container');

  // 创建圆形背景
  const circle = document.createElement('div');
  circle.setAttribute('class', 'checkmark-circle');

  // 创建对号SVG
  const checkmark = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  checkmark.setAttribute('viewBox', '0 0 100 100');
  checkmark.setAttribute('class', 'checkmark-svg');

  // 创建对号路径
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M20 50 L40 70 L80 30');
  path.setAttribute('stroke', '#ffffff');
  path.setAttribute('stroke-width', '8');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');

  // 组装SVG
  checkmark.appendChild(path);
  circle.appendChild(checkmark);
  container.appendChild(circle);

  // 添加到页面
  document.body.appendChild(container);

  // 添加动画效果
  setTimeout(() => {
    container.classList.add('show');
  }, 100);
}

// 页面加载完成后执行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createFullScreenCheckmark);
} else {
  createFullScreenCheckmark();
}

// 监听页面变化，确保在动态加载的页面上也能显示
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === 'childList' && !document.getElementById('fullscreen-checkmark')) {
      createFullScreenCheckmark();
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// 导出函数供popup使用
(window as any).refreshCheckmark = function(): void {
  const existingCheckmark = document.getElementById('fullscreen-checkmark');
  if (existingCheckmark) {
    existingCheckmark.remove();
  }
  
  // 重新创建对号
  const container = document.createElement('div');
  container.id = 'fullscreen-checkmark';
  container.setAttribute('class', 'fullscreen-checkmark-container');

  const circle = document.createElement('div');
  circle.setAttribute('class', 'checkmark-circle');

  const checkmark = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  checkmark.setAttribute('viewBox', '0 0 100 100');
  checkmark.setAttribute('class', 'checkmark-svg');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', 'M20 50 L40 70 L80 30');
  path.setAttribute('stroke', '#ffffff');
  path.setAttribute('stroke-width', '8');
  path.setAttribute('fill', 'none');
  path.setAttribute('stroke-linecap', 'round');
  path.setAttribute('stroke-linejoin', 'round');

  checkmark.appendChild(path);
  circle.appendChild(checkmark);
  container.appendChild(circle);
  document.body.appendChild(container);

  setTimeout(() => {
    container.classList.add('show');
  }, 100);
};

(window as any).toggleCheckmark = function(): void {
  const checkmark = document.getElementById('fullscreen-checkmark');
  if (checkmark) {
    if (checkmark.style.display === 'none') {
      checkmark.style.display = 'flex';
      checkmark.classList.add('show');
    } else {
      checkmark.classList.remove('show');
      setTimeout(() => {
        checkmark.style.display = 'none';
      }, 500);
    }
  } else {
    // 如果不存在，则创建
    (window as any).refreshCheckmark();
  }
}; 