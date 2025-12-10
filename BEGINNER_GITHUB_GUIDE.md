# 新手小白 GitHub 上传指南 🎓

别担心，我会一步一步带着你操作。你只需要跟着图片和文字点一点、复制粘贴即可。

---

## 第一阶段：注册与创建仓库 (在浏览器操作)

1.  **注册账号**
    *   打开 [github.com](https://github.com/)。
    *   如果还没有账号，请点击右上角的 **Sign up** 注册一个（需要邮箱验证）。

2.  **创建新仓库 (Repository)**
    *   登录后，点击页面右上角的 **+** 号，选择 **New repository**。
    *   **Repository name**: 输入 `nba-wiki` (或者你喜欢的名字)。
    *   **Description**: 选填，可以写“我的第一个 NBA 网站”。
    *   **Public/Private**: 选择 **Public** (公开) 或 **Private** (私有)，都可以。
    *   **其他选项**: 全部**不要**勾选 (不要勾选 Add a README file 等)，保持干净。
    *   点击底部的绿色按钮 **Create repository**。

3.  **复制仓库地址**
    *   创建成功后，你会看到一个全是代码的页面。
    *   找到顶部的 **HTTPS** 链接框（以 `https://github.com/...` 开头）。
    *   点击旁边的小图标 **复制** 这个链接。

---

## 第二阶段：将代码推送到云端 (在终端操作)

我已经帮你完成了最复杂的“初始化”步骤（`git init`, `git add`, `git commit`）。
你现在只需要**把本地和云端连起来**。

请打开您电脑上的 **终端 (Terminal)**，确保你在项目文件夹下，然后**依次执行**下面两行命令：

### 第 1 步：关联仓库
(请把下面的链接换成你刚才复制的那个链接！)

```bash
git remote add origin https://github.com/KDFelix/nba_wiki
```
*如果提示 "remote origin already exists"，说明已经关联过了，直接做下一步。*

### 第 2 步：推送到云端
(这是最后一步！)

```bash
git branch -M main
git push -u origin main
```

**可能遇到的情况：**
*   **询问用户名/密码**：
    *   Username: 输入你的 GitHub 账号（或邮箱）。
    *   Password:这里注意！**不能输入登录密码**。你需要输入一个 **Personal Access Token**。
    *   *如果你觉得麻烦，推荐下载 [GitHub Desktop](https://desktop.github.com/) 软件，用图形界面登录，然后把这个文件夹拖进去，点击 "Publish" 按钮。这是最简单的！*

---

## 💡 最简单的替代方案：GitHub Desktop

如果你觉得命令行（Terminal）太难了，我强烈推荐你下载 **[GitHub Desktop](https://desktop.github.com/)**。

1.  下载并安装 GitHub Desktop。
2.  登录你的 GitHub 账号。
3.  点击 **File** -> **Add Local Repository**。
4.  选择你的 `nba_project` 文件夹路径。
5.  点击 **Add Repository**。
6.  点击右上角的 **Publish repository** 按钮。
7.  一路点确定。

**搞定！你的代码就自动传上去了！** 🚀

---

## 🔄 日常更新代码 (三句真言)

以后每次你修改了代码（比如改了字、加了图），只需要在终端执行这**三句固定命令**，网站就会自动更新：

```bash
git add .
git commit -m "这里写你改了什么"
git push
```

建议把这三句背下来，或者每次来这里复制粘贴！😉

> **⚠️ 注意**：请**一行一行地**在终端里输入，每输入完一行代码，都要按一下键盘上的 **回车键 (Enter)** 执行，等它跑完（不报错）再输下一行。

就像这样：

1. 输入 `git add .` -> 按回车 -> 等待结束
2. 输入 `git commit -m "update"` -> 按回车 -> 等待结束
3. 输入 `git push` -> 按回车 -> 等待上传进度条走完

稳扎稳打，不容易出错！💪

### 🧐 详细解释：

1. `git add .`
    * 意思是：“把所有修改过的文件都放到‘暂存区’，准备打包。”

2. `git commit -m "修改内容"`
    * 意思是：“把暂存区的文件打包成一个‘版本’，贴个标签叫‘修改内容’。”
    * 引号里的字可以随便写，比如 "修复了标题错别字" 或 "增加了新图片"。

3. `git push`
    * 意思是：“把这个新版本推送到 GitHub 服务器。”
    * 注意：第一次我们需要写 git push -u origin main，以后只需要写 git push 就可以了，Git 会记得路。
    * 您可以把这三句命令记在电脑的便签里，每次改完代码就按顺序敲一遍！🚀