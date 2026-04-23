# 🚀 Speak It Out Episode 1 - Railway 部署

## 项目结构

```
speak-it-out-project/
├── server.js              # Express 服务器（多端口支持）
├── package.json           # Node.js 配置
├── index.html             # 主页面 - 词汇学习 + 互动挑战
├── challenge.html         # 独立挑战页面（学生专用）
├── leaderboard.html       # 排行榜页面
└── README.md              # 本文档
```

## 部署步骤

### 1. 推送到 GitHub

在终端运行：

```bash
cd /Users/chenhong/speak-it-out-project

# 初始化 Git（如果还没有）
git init
git add .
git commit -m "Initial commit"

# 创建 GitHub 仓库后，替换 YOUR_USERNAME 并推送
git remote add origin https://github.com/YOUR_USERNAME/speak-it-out-episode1.git
git push -u origin main
```

### 2. 部署到 Railway

1. 访问 [railway.app](https://railway.app/dashboard)
2. 点击 **New Project** → **Deploy from GitHub repo**
3. 授权并选择你的仓库 `speak-it-out-episode1`
4. Railway 会自动检测 Node.js 并部署
5. 部署完成后，在 **Settings** → **Domains** 生成域名

### 3. 获取链接

部署完成后你会获得：
- **课程页面**：`https://your-app-production.up.railway.app/`
- **挑战页面**：`https://your-app-production.up.railway.app/challenge.html`
- **排行榜**：`https://your-app-production.up.railway.app/leaderboard.html`

## 页面说明

### 📚 课程页面（index.html）
- 词汇学习内容
- 老师控制的互动环节
- 实时计分和反馈

### 🎮 挑战页面（challenge.html）
- 学生独立挑战
- 输入名字开始
- 15 句话挑战（5 个等级×3 句）
- 自动计时
- 提交成绩到排行榜

### 🏆 排行榜（leaderboard.html）
- 实时排名
- 前 100 名玩家
- 导出/导入数据

## 本地测试

```bash
cd /Users/chenhong/speak-it-out-project
node server.js
```

访问：http://localhost:3000

## Railway 环境变量（可选）

如需持久化数据库，在 Railway 添加：
- `DATABASE_URL` - MongoDB 或 PostgreSQL 连接字符串

默认使用内存存储，重启后数据重置。
