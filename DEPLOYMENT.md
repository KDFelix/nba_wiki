# NBA Wiki 部署指南

本指南将帮助您将 NBA Wiki 项目部署到互联网，并确保安全性。

## ⚠️ 安全性自检（部署前必读）

我们的前端代码 (`config.js`) 公开了 Supabase Key，这是 BaaS 架构的标准做法，但**前提是您必须配置好数据库权限**。

**请务必确认已经完成以下检查：**

1.  [ ] **Supabase RLS 已开启**：确保数据库表的 Row Level Security 功能已开启。
2.  [ ] **策略只读**：确保匿名用户 (`anon`) 只有 `SELECT` 权限，**绝对没有** `INSERT`, `UPDATE`, `DELETE` 权限。
    *   *参考项目根目录下的 `SUPABASE_RLS_SETUP.md` 再次确认。*
3.  [ ] **本地文件过滤**：我已为您创建了 `.gitignore`，防止系统垃圾文件和本地环境配置被上传到代码仓库。

---

## 🚀 方案：使用 Vercel 部署 (推荐)

Vercel 是最适合此类静态项目的托管平台，速度快且免费。

### 第一步：推送到 GitHub

1.  在 GitHub 上新建一个仓库（Repository），例如命名为 `nba-wiki`。
2.  在您的项目根目录打开终端，执行以下命令：

```bash
git init
git add .
git commit -m "Initial commit for NBA Wiki"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nba-wiki.git
git push -u origin main
```
*(请将 `YOUR_USERNAME` 替换为您的 GitHub 用户名)*

### 第二步：在 Vercel 导入

1.  访问 [vercel.com](https://vercel.com/) 并使用 GitHub 账号登录。
2.  点击 **"Add New"** -> **"Project"**。
3.  在列表中找到您刚才推送的 `nba-wiki` 仓库，点击 **"Import"**。
4.  **配置**：
    *   Framework Preset: 选择 `Other` (因为我们是原生 HTML/JS)。
    *   Root Directory: `./` (默认即可)。
    *   其他选项保持默认。
5.  点击 **"Deploy"**。

等待约 1 分钟，Vercel 会生成一个链接（如 `https://nba-wiki-tau.vercel.app`），您的网站就正式上线了！🎉

---

## 🔄 自动化数据更新

为了让那个 `main.py` 每天自动运行并更新数据库，我们需要利用 **GitHub Actions**。

1.  进入 GitHub 仓库页面，点击 **Settings** -> **Secrets and variables** -> **Actions**。
2.  点击 **New repository secret**，添加两个变量：
    *   `SUPABASE_URL`: 您的 Supabase URL。
    *   `SUPABASE_SERVICE_KEY`: 您的 Supabase **Service Role Key** (注意：不是 Anon Key，是那个红色的、权限最高的 Key)。
    *   *如何获取 Service Role Key？请查看 `GITHUB_ACTIONS_SETUP.md`。*
3.  添加完成后，GitHub 会根据我们已经写好的 `.github/workflows/sync-nba-data.yml` 文件，每天 UTC 时间 02:00 自动运行脚本。

---

## 💡 域名配置 (可选)

如果您有自己的域名（如 `nbawiki.com`），可以在 Vercel 的项目设置 -> **Domains** 中进行绑定。Vercel 会自动为您申请 SSL 证书（HTTPS）。

---

_如有任何部署报错，请截图告诉我！_
