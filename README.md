# 吵架包赢 (ChaoJiaBaoYing)

一个基于 Next.js 和 DeepSeek V3 AI 的智能辩论助手网站，帮助用户生成各种风格的回击内容。

## 功能特点

- 🎯 多种攻击风格：阴阳怪气、逻辑碾压、情感爆发、幽默调侃、哲学思辨、直接怼回
- 🎚️ 可调节强度等级（1-10级）
- 🤖 基于 DeepSeek V3 模型的智能回复生成
- 📱 响应式设计，支持移动端和桌面端
- 🎨 现代化 UI 设计，采用渐变背景和玻璃拟态效果

## 环境配置

### 1. 复制环境变量文件

```bash
cp .env.example .env.local
```

### 2. 配置 API 密钥

在 `.env.local` 文件中设置您的 OpenRouter API 密钥：

```env
# OpenRouter API Configuration
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Site Information for OpenRouter (Optional)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME=YourSiteName
```

### 3. 获取 API 密钥

1. 访问 [OpenRouter](https://openrouter.ai/)
2. 注册账户并获取 API 密钥
3. 将密钥填入 `.env.local` 文件中的 `OPENROUTER_API_KEY`

### 4. DeepSeek V3 模型

本项目使用 DeepSeek V3 (`deepseek/deepseek-chat`) 模型，通过 OpenRouter API 调用。
- 模型文档：[https://openrouter.ai/deepseek/deepseek-chat/api](https://openrouter.ai/deepseek/deepseek-chat/api)
- DeepSeek V3 是最新的高性能语言模型，具有优秀的中文理解和生成能力

## 开始使用

首先，安装依赖：

```bash
npm install
```

然后运行开发服务器：

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
