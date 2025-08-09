// 弹出窗口的JavaScript逻辑
document.addEventListener('DOMContentLoaded', function() {
  const refreshBtn = document.getElementById('refreshBtn');
  const toggleBtn = document.getElementById('toggleBtn');
  
  // 刷新显示按钮
  refreshBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: refreshCheckmark
      });
    });
  });
  
  // 切换显示按钮
  toggleBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.scripting.executeScript({
        target: {tabId: tabs[0].id},
        function: toggleCheckmark
      });
    });
  });
});

// 刷新对号显示的函数
function refreshCheckmark() {
  const existingCheckmark = document.getElementById('fullscreen-checkmark');
  if (existingCheckmark) {
    existingCheckmark.remove();
  }
  
  // 重新创建对号
  const container = document.createElement('div');
  container.id = 'fullscreen-checkmark';
  container.className = 'fullscreen-checkmark-container';

  const circle = document.createElement('div');
  circle.className = 'checkmark-circle';

  const checkmark = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  checkmark.setAttribute('viewBox', '0 0 100 100');
  checkmark.className = 'checkmark-svg';

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
}

// 切换对号显示的函数
function toggleCheckmark() {
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
    refreshCheckmark();
  }
} 