# NBA Wiki 项目开发文档

## 1. 项目概览
NBA Wiki 是一个现代化的 NBA 球员数据展示平台。该项目采用了 **Apple Design Principles**（系统级设计语言），注重视觉质感、流畅交互和极致的用户体验。

本项目架构从最初的单页应用 (SPA) 已重构为 **多页应用 (MPA)**，以实现更清晰的代码组织和更优的性能表现。

---

## 2. 技术架构

### 2.1 技术栈
- **前端核心**: HTML5, CSS3 (CSS Variables, Flex/Grid), JavaScript (ES6+)
- **架构模式**: Multi-Page Application (MPA) - 原生多页架构
- **后端服务**: Python 3.10 (数据同步脚本)
- **数据库**: Supabase (PostgreSQL)
- **CI/CD**: GitHub Actions

### 2.2 数据流向
```mermaid
graph LR
    A[NBA Official API] -->|Python Script| B(main.py)
    B -->|Upsert| C[Supabase Database]
    C -->|JSON| D[Web Client (players.html)]
    D -->|Render| E[User Interface]
```

---

## 3. 文件结构详解

```
nba_project/
├── index.html              # [入口] 网站首页 (Landing Page)
├── players.html            # [核心] 球员列表页 (包含搜索、筛选、数据渲染)
├── teams.html              # [占位] 球队列表页 (Under Development)
├── draft.html              # [占位] 选秀页面 (Under Development)
├── config.js               # [配置] 全局配置文件 (Supabase Key)
├── css/                    # [样式] CSS 模块化目录
│   ├── reset.css          #   └── 浏览器样式重置
│   ├── variables.css      #   └── 全局设计变量 (Color, Spacing, Typography)
│   ├── components.css     #   └── UI 组件 (Navbar, Card, Empty States)
│   ├── typography.css     #   └── 字体排版系统
│   └── animations.css     #   └── 动画定义 (Keyframes)
├── js/                     # [逻辑] JS 模块化目录
│   ├── app.js             #   └── 核心业务逻辑 (仅 players.html 加载)
│   ├── search.js          #   └── 搜索与防抖逻辑
│   └── animations.js      #   └── UI 交互控制 (Theme Toggle)
└── main.py                 # [后端] 数据同步脚本
```

---

## 4. 核心模块与页面说明

### 4.1 页面划分 (MPA)
项目将功能拆分为独立文件，互不干扰：
- **HomePage (`index.html`)**: 纯静态展示页，零数据请求，加载速度极快。
- **PlayersPage (`players.html`)**: 承载核心业务。引入了 `app.js`，初始化时从 Supabase 拉取所有球员数据。
- **OtherPages (`teams.html`, `draft.html`)**: 目前展示统一的 Empty State（空状态），复用 `components.css` 中的 `.empty-state` 样式。

### 4.2 样式系统 (CSS Architecture)
我们使用 **CSS Variables** (`css/variables.css`) 构建了一个响应式的主题系统：
- **深色模式**: 通过 `[data-theme="dark"]` 选择器实现，自动检测系统偏好。
- **毛玻璃导航**: 导航栏使用 `backdrop-filter: blur(20px)`，在所有页面保持统一视觉。

### 4.3 前端逻辑 (JS Modules)
- **app.js**: 仅在 `players.html` 运行。包含 `init()` 函数，负责数据获取、骨架屏移除和卡片渲染。
- **animations.js**: 全局加载。负责处理导航栏的通用交互，如“切换主题”和“展开筛选器”。

### 4.4 数据同步 (main.py)
独立的 Python 脚本，配合 GitHub Actions 实现每日 UTC 02:00 自动更新数据库。

---

## 5. 开发与维护指南

### 5.1 如何新增页面？
1. 复制 `index.html` 或 `teams.html` 作为模板。
2. 修改 `<title>` 和内容区域。
3. 在 `css/components.css` 的 `.nav-links` 中更新导航链接和高亮状态。

### 5.2 如何修改数据源？
目前数据仅在 `players.html` 展示。若需在其他页面展示数据：
1. 修改 `app.js` 或创建新的 JS 文件（如 `teams.js`）。
2. 在目标 HTML 文件中引入该脚本。

### 5.3 数据维护
如果发现球员数据不准确：
1. 确保 Supabase 服务正常。
2. 手动运行 `python main.py` 强制更新。

---

_文档生成时间: 2025-12-10_ (Updated for MPA Refactor)
