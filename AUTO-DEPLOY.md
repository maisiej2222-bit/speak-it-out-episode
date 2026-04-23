# 🚀 Netlify 自动部署指南

## 方式一：一键部署脚本（推荐）

在终端运行：

```bash
/Users/chenhong/speak-it-out-project/deploy-netlify.sh
```

脚本会自动：
1. 准备所有文件到 `/tmp/netlify-auto-deploy`
2. 打开 Finder 显示文件夹
3. 打开 Netlify Drop 页面

**然后拖拽文件夹到 Netlify Drop 即可！**

---

## 方式二：GitHub 自动部署（一劳永逸）

### 第 1 步：推送代码到 GitHub

```bash
cd /Users/chenhong/speak-it-out-project
git push --set-upstream origin main
```

输入 GitHub 密码（或 Personal Access Token）

### 第 2 步：连接 Netlify

1. 访问 [app.netlify.com](https://app.netlify.com)
2. 点击 **Add new site** → **Import an existing project**
3. 用 GitHub 登录，选择 `speak-it-out-episode1` 仓库
4. 点击 **Deploy site**

### 第 3 步：自动部署

完成后，每次 `git push` 都会自动触发部署！

**部署设置：**
- Build command: (留空)
- Publish directory: `/`
- Functions directory: `netlify/functions`

---

## 方式三：Netlify CLI（最方便）

安装后只需运行 `netlify deploy --prod`

```bash
# 安装（只需一次）
npm install -g netlify-cli

# 登录
netlify login

# 部署
cd /Users/chenhong/speak-it-out-project
netlify deploy --prod --dir=. --functions=netlify/functions
```

---

## 💡 推荐方案

**现在用方式一（脚本）快速部署，之后用方式二（GitHub）自动同步！**
