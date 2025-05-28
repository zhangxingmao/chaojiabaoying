# 吵架包赢 (ChaoJiaBaoYing)

一个基于 Next.js 和 DeepSeek V3 AI 的智能辩论助手网站，帮助用户生成各种风格的回击内容。

## 🚀 最新优化

### 更强的回击火力
- **增加回击数量**：从3个增加到5个选择，给你更多选择
- **新增攻击风格**：添加了"犀利毒舌型"、"机智巧妙型"、"强势压制型"三种新风格
- **终极回击模式**：开启后生成更加犀利解气的回击内容
- **优化提示词**：让AI生成更有力、更解气的回击

## 功能特点

- 🎯 **9种攻击风格**：
  - 😏 阴阳怪气型：用讽刺和暗示让对方感受到被鄙视的滋味
  - 🧠 逻辑碾压型：用严密逻辑让对方的观点显得愚蠢可笑
  - 🔥 情感爆发型：用强烈情感让对方感受到你的愤慨
  - 😄 幽默调侃型：用幽默嘲笑让对方在笑声中感到尴尬
  - 🤔 哲学思辨型：用深度智慧让对方感到自己的浅薄无知
  - 💪 直接怼回型：毫不留情地指出对方的错误
  - 🗡️ 犀利毒舌型：毫不留情的犀利回击，让对方哑口无言
  - 🎯 机智巧妙型：用聪明话术和巧妙比喻让对方自愧不如
  - 👑 强势压制型：用气势压倒对方，显示你的优越感

- 🎚️ **可调节强度等级**（1-10级）：从温和到极其强烈
- ⚡ **终极回击模式**：开启后生成更加犀利解气的回击内容
- 🤖 **基于 DeepSeek V3 模型**的智能回复生成
- 📱 **响应式设计**，支持移动端和桌面端
- 🎨 **现代化 UI 设计**，采用渐变背景和玻璃拟态效果
- 🔥 **特殊视觉效果**：终极模式下的独特动画和颜色主题

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

## 使用指南

1. **输入对方的话**：在文本框中输入对方说的话
2. **调节语气强度**：使用滑块调节回击的强烈程度（1-10级）
3. **开启终极模式**：如果想要更犀利的回击，可以开启终极回击模式
4. **选择攻击风格**：从9种不同的攻击风格中选择最适合的
5. **生成回击**：点击"开始吵架"或"释放终极火力"按钮
6. **复制使用**：从5个生成的回击中选择最满意的，点击复制按钮

## 技术栈

- **前端框架**：Next.js 14 (App Router)
- **UI 组件**：React + TypeScript
- **样式**：Tailwind CSS
- **图标**：Lucide React
- **AI 模型**：DeepSeek V3 (通过 OpenRouter API)
- **部署**：支持 Vercel 等平台

## 免责声明

本工具仅供娱乐和学习交流使用，请理性使用，和谐讨论。生成的内容仅代表AI的语言能力展示，不代表任何立场或观点。请在使用时注意：

- 🤝 理性讨论，和谐交流
- 💡 智慧表达，避免恶意攻击
- 🎯 适度使用，不要过度依赖
- ❤️ 保持善意，促进理解

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
