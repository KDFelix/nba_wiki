// animations.js - 负责动画和 UI 交互

// 🟢 1. 自动初始化主题
// (逻辑已移至 theme-init.js，在 Head 中优先加载以避免 FOUC)

// 主题切换
function toggleTheme() {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next); // 保存设置
}

// 筛选面板折叠/展开 (已弃用，因为筛选框将移至搜索栏旁)
function toggleFilter() {
    const panel = document.getElementById('filterPanel');
    if (panel) panel.classList.toggle('active');
}

// 导出供全局使用
window.toggleTheme = toggleTheme;
window.toggleFilter = toggleFilter;

// 🟢 2. 布局切换逻辑 (Grid/List)
(function initLayout() {
    const savedLayout = localStorage.getItem('layout') || 'grid';
    // 等待 DOM 加载完成后执行 (因为 script 在 head 可能找不到 element，但 animations.js 在 body 底部)
    document.addEventListener('DOMContentLoaded', () => {
        setLayout(savedLayout, false); // false = 不重复保存
    });
})();

function setLayout(mode, save = true) {
    const container = document.getElementById('player-list');
    const header = document.getElementById('listHeader'); // Excel 模式表头
    const btns = document.querySelectorAll('.layout-btn');

    if (!container) return;

    // 1. 切换容器和表头类名
    if (mode === 'list') {
        container.classList.add('list-mode');
        if (header) header.classList.add('active');
    } else {
        container.classList.remove('list-mode');
        if (header) header.classList.remove('active');
    }

    // 2. 更新按钮状态
    btns.forEach(btn => {
        // 简单判断图标: grid 按钮是第一个(index 0), list 是第二个(index 1)
        // 更严谨做法是给 button 加 data-mode 属性
        const isGridBtn = btn.onclick.toString().includes('grid');
        const isListBtn = btn.onclick.toString().includes('list');

        if (mode === 'grid' && isGridBtn) btn.classList.add('active');
        else if (mode === 'list' && isListBtn) btn.classList.add('active');
        else btn.classList.remove('active');
    });

    // 3. 保存设置
    if (save) {
        localStorage.setItem('layout', mode);
    }
}

window.setLayout = setLayout;
