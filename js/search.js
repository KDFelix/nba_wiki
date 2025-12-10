/**
 * 文件名: search.js
 * 用途: 搜索与筛选逻辑
 * 描述: 专门处理用户的搜索输入和筛选操作。
 *       实现了防抖 (Debounce) 机制，优化搜索体验，避免频繁触发重绘。
 */
// search.js - 负责搜索和筛选逻辑

let debounceTimer;

// 防抖搜索
function debounceSearch() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        handleFilter();
    }, 300); // 300ms 延迟
}

// 处理筛选
function handleFilter() {
    const searchVal = document.getElementById('searchInput').value.toLowerCase();
    const teamVal = document.getElementById('teamSelect').value;

    // 调用 app.js 中的全局数据过滤函数 (我们需要确保 app.js 暴露了这个函数，或者在这里处理)
    // 更好的方式是触发一个自定义事件，或者直接操作全局变量 (简单项目)
    if (window.filterData) {
        window.filterData(searchVal, teamVal);
    }
}

// 导出
window.debounceSearch = debounceSearch;
window.handleFilter = handleFilter;
