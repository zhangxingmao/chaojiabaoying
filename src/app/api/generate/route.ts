import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// 验证环境变量
if (!process.env.OPENROUTER_API_KEY) {
  throw new Error('OPENROUTER_API_KEY environment variable is not set');
}

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://chaojiabaoying.com",
    "X-Title": process.env.NEXT_PUBLIC_SITE_NAME || "ChaoJiaBaoYing",
  },
});

const stylePrompts = {
  sarcastic: "用阴阳怪气、讽刺暗示的方式回击，语气带有嘲讽但不失优雅",
  logical: "用严密的逻辑和理性分析来反驳，条理清晰，有理有据",
  emotional: "用强烈的情感表达来回应，充满激情但不失分寸",
  humorous: "用幽默调侃的方式化解冲突，轻松诙谐但点到为止",
  philosophical: "用深度的哲学思辨来回应，引人深思，富有智慧",
  direct: "直接有力地回击，简洁明了，一针见血"
};

export async function POST(request: NextRequest) {
  try {
    const { opponentText, intensity, attackStyle } = await request.json();

    if (!opponentText || !attackStyle || intensity < 1 || intensity > 10) {
      return NextResponse.json(
        { error: '参数不完整或无效' },
        { status: 400 }
      );
    }

    const stylePrompt = stylePrompts[attackStyle as keyof typeof stylePrompts];
    const intensityDesc = intensity <= 3 ? "温和" : intensity <= 6 ? "中等" : intensity <= 8 ? "强烈" : "极其强烈";

    const systemPrompt = `你是一个专业的辩论助手，帮助用户以${stylePrompt}的方式回击对方的话。
强度等级：${intensityDesc}（1-10级中的${intensity}级）
请生成3个不同的回击内容，每个回击都要：
1. 符合指定的风格特点
2. 强度适中，不要过于激烈或冒犯
3. 有理有据，逻辑清晰
4. 长度控制在50字以内

对方说的话："${opponentText}"

请直接返回3个回击内容，用换行符分隔，不要添加序号或其他格式。`;

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        {
          role: "user",
          content: systemPrompt
        }
      ],
      temperature: 0.8,
      max_tokens: 500
    });

    const responseText = completion.choices[0].message.content;
    if (!responseText) {
      throw new Error('API返回内容为空');
    }

    // 将回复按行分割，过滤空行，取前3个
    const responses = responseText
      .split('\n')
      .filter(line => line.trim().length > 0)
      .slice(0, 3);

    // 如果回复少于3个，用备用回复补充
    while (responses.length < 3) {
      const fallbackResponses = generateMockResponses(opponentText, intensity, attackStyle);
      responses.push(...fallbackResponses.slice(responses.length));
    }

    return NextResponse.json({ responses: responses.slice(0, 3) });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: '生成失败，请重试' },
      { status: 500 }
    );
  }
}

// 生成模拟回击内容的函数
function generateMockResponses(opponentText: string, intensity: number, attackStyle: string): string[] {
  const responses: { [key: string]: string[][] } = {
    sarcastic: [
      ["哦，这话说得真有水平呢", "您这见解真是让人大开眼界", "这逻辑，我服了"],
      ["哇，您真是太厉害了", "这话说得，我都不知道怎么接了", "您这智慧，真是深不可测"],
      ["您说得对，我们都错了", "这见解，真是前无古人后无来者", "我被您的才华震撼到了"]
    ],
    logical: [
      ["您的观点缺乏事实依据", "这个结论需要更多证据支持", "逻辑上存在明显漏洞"],
      ["数据显示情况并非如此", "您的推理过程有待商榷", "事实胜于雄辩"],
      ["请提供可靠的信息来源", "这种说法站不住脚", "理性分析一下就知道了"]
    ],
    emotional: [
      ["这话真的很伤人！", "我不能接受这种说法！", "这太过分了！"],
      ["您这样说让我很失望", "我真的很难过", "这种话太让人心寒了"],
      ["我为您的想法感到震惊", "这真的让我很愤怒", "我无法理解您的逻辑"]
    ],
    humorous: [
      ["哈哈，您这是在说相声吗？", "这话比段子还精彩", "您应该去说脱口秀"],
      ["我差点被您逗笑了", "这创意，给满分", "您这幽默感，我服"],
      ["这话说得，我都想鼓掌了", "您这是在逗我玩吗？", "这想象力，真是丰富"]
    ],
    philosophical: [
      ["存在即合理，但合理未必正确", "真理往往掌握在少数人手中", "智者千虑，必有一失"],
      ["凡事都有两面性", "真相往往比表象复杂", "思考的深度决定认知的高度"],
      ["知识的边界就是无知的开始", "质疑是智慧的开端", "真理不辩不明"]
    ],
    direct: [
      ["您说错了", "这完全不对", "我不同意"],
      ["事实不是这样的", "您的信息有误", "这个观点站不住脚"],
      ["我必须纠正您", "这是错误的认知", "您需要重新了解一下"]
    ]
  };

  const styleResponses = responses[attackStyle] || responses.direct;
  const intensityIndex = Math.min(Math.floor((intensity - 1) / 3), 2);
  
  return styleResponses[intensityIndex] || styleResponses[0];
} 