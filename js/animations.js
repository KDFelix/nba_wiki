/**
 * 文件名: animations.js
 * 用途: UI 交互与动画控制
 * 描述: 处理点击事件和界面状态切换，例如：
 *       1. 深色/浅色模式切换 (toggleTheme)
 *       2. 筛选面板的展开与折叠 (toggleFilter)
 */
// animations.js - 负责动画和 UI 交互

// 主题切换
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    html.setAttribute('data-theme', current === 'dark' ? 'light' : 'dark');
}

// 筛选面板折叠/展开
function toggleFilter() {
    document.getElementById('filterPanel').classList.toggle('active');
}

// 导出供全局使用 (因为 onclick 绑定在 HTML 上)
window.toggleTheme = toggleTheme;
window.toggleFilter = toggleFilter;
