# 🚀 Speak It Out Episode 1 - 快速部署指南

## 方式一：Vercel 部署（推荐，5 分钟上线）

### 1. 上传到 GitHub

打开终端，运行以下命令（需要替换 YOUR_USERNAME 为你的 GitHub 用户名）：

```bash
cd /Users/chenhong/speak-it-out-project

# 如果你的项目还没有关联 GitHub
git remote add origin https://github.com/YOUR_USERNAME/speak-it-out-episode1.git
git push -u origin main
```

### 2. 在 Vercel 部署

1. 访问 [vercel.com](https://vercel.com)
2. 用 GitHub 账号登录
3. 点击 "Add New Project"
4. 选择 `speak-it-out-episode1` 仓库
5. 点击 "Deploy"

**部署完成后你会获得：**
- 主挑战页面：`https://speak-it-out-episode1.vercel.app`
- 排行榜页面：`https://speak-it-out-episode1.vercel.app/leaderboard.html`

### 3. 分享给学生

**挑战链接：**
```
https://speak-it-out-episode1.vercel.app
```

**排行榜链接：**
```
https://speak-it-out-episode1.vercel.app/leaderboard.html
```

---

## 方式二：Netlify 部署（同样免费）

1. 访问 [netlify.com](https://netlify.com)
2. 点击 "Add new site" → "Import an existing project"
3. 连接 GitHub 并选择仓库
4. 直接点击 "Deploy site"

---

## 方式三：GitHub Pages（完全免费）

1. 访问你的仓库页面：`https://github.com/YOUR_USERNAME/speak-it-out-episode1`
2. 进入 Settings → Pages
3. Source 选择 `main` 分支，文件夹选择 `/ (root)`
4. 点击 Save

访问：`https://YOUR_USERNAME.github.io/speak-it-out-episode1`

---

## 📱 学生使用流程

1. 打开挑战页面
2. 滚动到 Module 01: Word Bank
3. 点击 **🚀 Start Challenge** 按钮
4. 输入名字，开始挑战
5. 完成 15 句话（5 个等级×3 句）
6. 查看成绩和排行榜

## 🏆 排行榜说明

**当前版本使用 LocalStorage，多人使用方案：**

### 方案 A：同一设备轮流挑战
- 所有学生用同一台 iPad/电脑
- 成绩自动保存在浏览器
- 下课后导出 JSON 文件分享

### 方案 B：多设备（需云端 API）
- 需要先部署到 Vercel（见上方）
- 排行榜页面会调用云端 API
- 学生可在不同设备上提交成绩

### 方案 C：手动合并
1. 每个学生完成挑战后点击 **📤 Export**
2. 将 JSON 文件发送给老师
3. 老师在排行榜页面 **📥 Import** 合并所有成绩

---

## 🔧 自定义配置

### 修改 API 地址（排行榜页面）

编辑 `leaderboard.html` 第 89 行：
```javascript
const API_URL = 'https://YOUR-VERCEL-URL.vercel.app/api/leaderboard';
```

### 修改题目

编辑 `index.html`，搜索 `challengeSentences` 数组，修改句子内容。

---

## 💡 常见问题

**Q: 为什么排行榜不能同步？**
A: 本地版本使用浏览器存储，需要部署到 Vercel 才能使用云端 API。

**Q: 如何清空排行榜？**
A: 在排行榜页面点击 🗑️ Clear 按钮。

**Q: 可以自定义题目数量吗？**
A: 可以，修改 `index.html` 中的 `challengeSentences` 数组。

---

## 📞 需要帮助？

访问 Vercel 文档：[vercel.com/docs](https://vercel.com/docs)
