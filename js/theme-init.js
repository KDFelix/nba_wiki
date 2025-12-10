/**
 * theme-init.js
 * 必须在 <head> 中引入，以防止页面加载时的闪烁 (FOUC)
 */
(function () {
    function getTheme() {
        // 1. 优先使用本地存储
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) return savedTheme;

        // 2. 其次跟随系统设置
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        // 3. 默认浅色
        return 'light';
    }

    const theme = getTheme();
    document.documentElement.setAttribute('data-theme', theme);
})();
