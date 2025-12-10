# GitHub Actions 配置指南

## 前提条件

1. 你的代码已经托管在 GitHub 上
2. 你已经获取了 Supabase 的 `service_role` key

---

## 配置步骤

### 第一步：添加 GitHub Secrets

1. 打开你的 GitHub 仓库页面
2. 点击 **Settings**（设置）
3. 在左侧菜单找到 **Secrets and variables** → **Actions**
4. 点击 **New repository secret** 按钮

添加以下两个 Secret：

#### Secret 1: SUPABASE_URL
- **Name**: `SUPABASE_URL`
- **Value**: `https://kzbtewaffzkjjsmmouie.supabase.co`

#### Secret 2: SUPABASE_SERVICE_KEY
- **Name**: `SUPABASE_SERVICE_KEY`
- **Value**: 你的 service_role key（从 Supabase Dashboard → Settings → API 获取）

⚠️ **注意**：这里使用的是 `service_role` key，不是 `anon` key！

---

### 第二步：推送工作流文件

将 `.github/workflows/sync-nba-data.yml` 文件推送到 GitHub：

```bash
git add .github/workflows/sync-nba-data.yml
git commit -m "添加 NBA 数据自动同步工作流"
git push
```

---

### 第三步：验证工作流

1. 进入 GitHub 仓库页面
2. 点击 **Actions** 标签
3. 你应该能看到 "同步 NBA 球员数据" 工作流

#### 手动测试
1. 点击工作流名称
2. 点击右侧的 **Run workflow** 按钮
3. 选择分支（通常是 `main`）
4. 点击 **Run workflow**

等待几分钟，查看运行结果。如果成功，你会看到绿色的 ✅ 标记。

---

## 工作流说明

### 运行时间
- **自动运行**：每天北京时间 10:00（UTC 02:00）
- **手动触发**：随时可以在 Actions 页面手动运行

### 运行内容
1. 检出代码
2. 安装 Python 3.10
3. 安装依赖（`supabase` 和 `nba_api`）
4. 运行 `main.py` 同步数据
5. 记录结果

---

## 常见问题

### Q: 如何查看运行日志？
A: 进入 Actions → 点击具体的运行记录 → 展开每个步骤查看详细日志

### Q: 如何修改运行时间？
A: 编辑 `.github/workflows/sync-nba-data.yml` 中的 `cron` 表达式
- 格式：`分 时 日 月 星期`（UTC 时间）
- 例如：`0 14 * * *` 表示每天 UTC 14:00（北京时间 22:00）

### Q: 如何暂停自动同步？
A: 进入 Actions → 点击工作流 → 点击右上角的 "..." → Disable workflow

---

## 安全提示

✅ **正确做法**：
- Secrets 只在 GitHub Actions 中使用
- 永远不要在代码中硬编码 `service_role` key

❌ **错误做法**：
- 将 `service_role` key 提交到代码仓库
- 在前端代码中使用 `service_role` key

---

## 完成后

配置完成后，你的 NBA 球员数据将每天自动更新，无需手动运行 `main.py`！🎉
