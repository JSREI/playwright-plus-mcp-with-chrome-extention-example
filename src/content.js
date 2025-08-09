// 创建全屏圆形对号元素
function createFullScreenCheckmark() {
  // 检查是否已经存在，避免重复创建
  if (document.getElementById('fullscreen-checkmark')) {
    return;
  }

  // 创建容器
  const container = document.createElement('div');
  container.id = 'fullscreen-checkmark';
  container.className = 'fullscreen-checkmark-container';

  // 创建圆形背景
  const circle = document.createElement('div');
  circle.className = 'checkmark-circle';

  // 创建对号SVG
  const checkmark = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  checkmark.setAttribute('viewBox', '0 0 100 100');
  checkmark.className = 'checkmark-svg';

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