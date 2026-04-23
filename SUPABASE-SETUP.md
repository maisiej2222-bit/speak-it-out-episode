# Supabase 数据库设置指南

## 📋 第 1 步：创建 Supabase 项目（2 分钟）

1. 访问：https://supabase.com/new
2. 用 GitHub 账号登录
3. 点击 **"New Project"**
4. 填写：
   - **Name**: `speak-it-out`
   - **Database Password**: （自动生成，保存好）
   - **Region**: 选择 `Singapore` 或 `Tokyo`（离中国近）
5. 点击 **"Create new project"**，等待 2 分钟

---

## 📊 第 2 步：创建数据表（30 秒）

项目创建完成后：

1. 点击左侧 **"SQL Editor"**
2. 点击 **"New Query"**
3. 复制粘贴以下 SQL：

```sql
-- 创建排行榜表
CREATE TABLE leaderboard (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  time INTEGER NOT NULL,
  accuracy INTEGER DEFAULT 0,
  round TEXT,
  date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 允许公开读写
ALTER TABLE leaderboard ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON leaderboard FOR SELECT USING (true);
CREATE POLICY "Public insert access" ON leaderboard FOR INSERT WITH CHECK (true);
```

4. 点击 **"Run"** 或按 `Cmd+Enter`

看到 "Success" 就完成了！

---

## 🔑 第 3 步：获取 API 密钥（30 秒）

1. 点击左下角 **"Settings"** 图标 ⚙️
2. 选择 **"API"**
3. 复制两个值：
   - **Project URL**: 类似 `https://abcdefg.supabase.co`
   - **anon / public key**: 一长串字符 `eyJhbG...`

---

## ⚙️ 第 4 步：配置到 Netlify（1 分钟）

1. 访问：https://app.netlify.com/projects/maisiejj/settings/env
2. 点击 **"Add a variable"**
3. 添加第一个变量：
   - **Key**: `SUPABASE_URL`
   - **Value**: 粘贴你的 Project URL
4. 添加第二个变量：
   - **Key**: `SUPABASE_KEY`
   - **Value**: 粘贴你的 anon key
5. 点击 **"Save"**

---

## 🚀 第 5 步：重新部署

把 `/tmp/deploy-final` 文件夹拖到 Netlify Deploy 页面，或者在 Netlify 页面点击 **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## ✅ 测试

部署完成后，学生 A 和学生 B 用不同设备挑战，成绩都会同步到同一个排行榜！
