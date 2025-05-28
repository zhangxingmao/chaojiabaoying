'use client';

import { useState, useEffect } from 'react';
import { Zap, MessageCircle, Sparkles, Copy, Check, Wand2, Brain, Heart, Smile, Lightbulb, Sword, Star, ArrowRight, Flame, Crown, Zap as Lightning, Target } from 'lucide-react';
import ParticleBackground from '@/components/ParticleBackground';
import LoadingAnimation from '@/components/LoadingAnimation';

const attackStyles = [
  { value: 'sarcastic', label: '阴阳怪气型', description: '用讽刺和暗示让对方感受到被鄙视的滋味', emoji: '😏', icon: Smile, color: 'from-amber-500 to-orange-500' },
  { value: 'logical', label: '逻辑碾压型', description: '用严密逻辑让对方的观点显得愚蠢可笑', emoji: '🧠', icon: Brain, color: 'from-blue-500 to-indigo-500' },
  { value: 'emotional', label: '情感爆发型', description: '用强烈情感让对方感受到你的愤慨', emoji: '🔥', icon: Heart, color: 'from-red-500 to-pink-500' },
  { value: 'humorous', label: '幽默调侃型', description: '用幽默嘲笑让对方在笑声中感到尴尬', emoji: '😄', icon: Smile, color: 'from-green-500 to-emerald-500' },
  { value: 'philosophical', label: '哲学思辨型', description: '用深度智慧让对方感到自己的浅薄无知', emoji: '🤔', icon: Lightbulb, color: 'from-purple-500 to-violet-500' },
  { value: 'direct', label: '直接怼回型', description: '毫不留情地指出对方的错误', emoji: '💪', icon: Sword, color: 'from-gray-700 to-gray-900' },
  { value: 'savage', label: '犀利毒舌型', description: '毫不留情的犀利回击，让对方哑口无言', emoji: '🗡️', icon: Lightning, color: 'from-red-600 to-rose-700' },
  { value: 'witty', label: '机智巧妙型', description: '用聪明话术和巧妙比喻让对方自愧不如', emoji: '🎯', icon: Target, color: 'from-cyan-500 to-blue-600' },
  { value: 'dominant', label: '强势压制型', description: '用气势压倒对方，显示你的优越感', emoji: '👑', icon: Crown, color: 'from-yellow-500 to-amber-600' }
];

export default function Home() {
  const [opponentText, setOpponentText] = useState('');
  const [intensity, setIntensity] = useState(6);
  const [attackStyle, setAttackStyle] = useState('');
  const [responses, setResponses] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [ultimateMode, setUltimateMode] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleGenerate = async () => {
    if (!opponentText.trim() || !attackStyle) {
      alert('请填写对方的话并选择攻击风格');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          opponentText,
          intensity,
          attackStyle,
          ultimateMode,
        }),
      });

      if (!response.ok) {
        throw new Error('生成失败');
      }

      const data = await response.json();
      setResponses(data.responses);
    } catch (error) {
      console.error('Error:', error);
      alert('生成失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  const getIntensityColor = (value: number) => {
    if (value <= 3) return 'from-emerald-400 to-green-500';
    if (value <= 6) return 'from-yellow-400 to-orange-500';
    if (value <= 8) return 'from-orange-500 to-red-500';
    return 'from-red-500 to-rose-600';
  };

  const getIntensityLabel = (value: number) => {
    if (value <= 3) return '温和';
    if (value <= 6) return '中等';
    if (value <= 8) return '强烈';
    return '激烈';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* 粒子背景 */}
      <ParticleBackground />
      
      {/* 动态背景效果 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        {/* 主要背景球体 */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
          style={{
            left: `${mousePosition.x * 0.02}px`,
            top: `${mousePosition.y * 0.02}px`,
          }}
        />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full mix-blend-multiply filter blur-2xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full mix-blend-multiply filter blur-2xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* 星星效果 */}
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className={`relative max-w-7xl mx-auto px-4 py-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ zIndex: 10 }}>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full mb-8 shadow-2xl animate-pulse-glow relative">
            <Zap className="w-12 h-12 text-white animate-bounce" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full animate-ping opacity-20" />
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6 tracking-tight">
            吵架包赢
          </h1>
          
          <div className="relative">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              AI助你击败群雄，智慧回击每一句
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-lg blur opacity-30" />
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* 左侧输入区域 */}
          <div className="space-y-8">
            {/* 输入框 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <MessageCircle className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">对方说了什么？</h2>
                </div>
                <textarea
                  placeholder="输入对方的话..."
                  value={opponentText}
                  onChange={(e) => setOpponentText(e.target.value)}
                  className="w-full min-h-36 text-lg bg-white/10 backdrop-blur-sm border-2 border-white/20 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/20 rounded-2xl p-6 resize-none transition-all duration-300 outline-none text-white placeholder-gray-300"
                />
              </div>
            </div>

            {/* 语气强烈程度 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-red-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 bg-gradient-to-r ${getIntensityColor(intensity)} rounded-2xl flex items-center justify-center shadow-lg`}>
                    <Flame className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">语气强烈程度</h2>
                </div>
                
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <span className="text-lg text-gray-300 font-medium">温和</span>
                    <div className={`px-8 py-4 rounded-full bg-gradient-to-r ${getIntensityColor(intensity)} text-white font-bold text-xl shadow-xl transform hover:scale-105 transition-all duration-200`}>
                      {getIntensityLabel(intensity)} {intensity}
                    </div>
                    <span className="text-lg text-gray-300 font-medium">激烈</span>
                  </div>
                  
                  <div className="relative">
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={intensity}
                      onChange={(e) => setIntensity(Number(e.target.value))}
                      className="w-full h-4 bg-white/20 rounded-lg appearance-none cursor-pointer slider-enhanced"
                    />
                  </div>
                  
                  <div className="flex justify-between text-sm text-gray-400">
                    {Array.from({ length: 10 }, (_, i) => (
                      <span key={i + 1} className={`transition-all duration-200 ${intensity === i + 1 ? 'text-cyan-400 font-bold text-lg transform scale-125' : 'hover:text-white'}`}>
                        {i + 1}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 终极回击模式 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-rose-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-red-500 to-rose-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <Lightning className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">终极回击模式</h2>
                      <p className="text-gray-300 text-sm">开启后生成更加犀利解气的回击</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setUltimateMode(!ultimateMode)}
                    className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
                      ultimateMode 
                        ? 'bg-gradient-to-r from-red-500 to-rose-600 shadow-lg shadow-red-500/50' 
                        : 'bg-white/20'
                    }`}
                  >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${
                      ultimateMode ? 'left-9' : 'left-1'
                    }`} />
                  </button>
                </div>
                {ultimateMode && (
                  <div className="mt-4 p-4 bg-red-500/20 rounded-xl border border-red-500/30">
                    <div className="flex items-center gap-2 text-red-300">
                      <Flame className="w-4 h-4" />
                      <span className="text-sm font-medium">终极模式已开启 - 准备释放最强火力！</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 攻击风格 */}
            <div className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Wand2 className="w-7 h-7 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white">攻击风格</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {attackStyles.map((style) => {
                    const IconComponent = style.icon;
                    const isSelected = attackStyle === style.value;
                    return (
                      <button
                        key={style.value}
                        onClick={() => setAttackStyle(style.value)}
                        className={`group/style relative p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                          isSelected 
                            ? `border-white/40 bg-gradient-to-r ${style.color} shadow-xl transform scale-105` 
                            : 'border-white/20 bg-white/5 hover:border-white/30 hover:bg-white/10 hover:scale-102'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                            isSelected ? 'bg-white/20' : `bg-gradient-to-r ${style.color}`
                          }`}>
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-xl">{style.emoji}</span>
                        </div>
                        <h3 className="text-base font-bold text-white mb-1">{style.label}</h3>
                        <p className="text-xs text-gray-300 leading-tight">{style.description}</p>
                        {isSelected && (
                          <div className="absolute top-2 right-2">
                            <Check className="w-5 h-5 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 生成按钮 */}
            <div className="relative group">
              <div className={`absolute -inset-1 ${ultimateMode ? 'bg-gradient-to-r from-red-500 via-rose-600 to-red-700 animate-pulse' : 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600'} rounded-3xl blur opacity-50 group-hover:opacity-75 transition duration-300`} />
              <button
                onClick={handleGenerate}
                disabled={isLoading || !opponentText.trim() || !attackStyle}
                className={`relative w-full h-24 text-2xl font-bold ${ultimateMode ? 'bg-gradient-to-r from-red-500 via-rose-600 to-red-700 hover:from-red-600 hover:via-rose-700 hover:to-red-800' : 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 hover:from-cyan-500 hover:via-blue-600 hover:to-purple-700'} disabled:from-gray-600 disabled:to-gray-700 text-white rounded-3xl shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                {isLoading ? (
                  <LoadingAnimation message={ultimateMode ? "终极AI正在释放最强火力..." : "AI正在为你生成完美回击..."} />
                ) : (
                  <div className="flex items-center justify-center gap-4">
                    {ultimateMode ? (
                      <>
                        <Lightning className="w-8 h-8 animate-bounce" />
                        <span>释放终极火力</span>
                        <Flame className="w-6 h-6 animate-pulse" />
                      </>
                    ) : (
                      <>
                        <Zap className="w-8 h-8" />
                        <span>开始吵架</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                      </>
                    )}
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* 右侧结果区域 */}
          <div className="space-y-8">
            {responses.length > 0 ? (
              <div className="group relative">
                <div className={`absolute -inset-1 ${ultimateMode ? 'bg-gradient-to-r from-red-400 to-rose-500 animate-pulse' : 'bg-gradient-to-r from-emerald-400 to-cyan-500'} rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300`} />
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-14 h-14 ${ultimateMode ? 'bg-gradient-to-r from-red-400 to-rose-500' : 'bg-gradient-to-r from-emerald-400 to-cyan-500'} rounded-2xl flex items-center justify-center shadow-lg`}>
                      {ultimateMode ? (
                        <Lightning className="w-7 h-7 text-white animate-pulse" />
                      ) : (
                        <Sparkles className="w-7 h-7 text-white" />
                      )}
                    </div>
                    <h2 className="text-3xl font-bold text-white">
                      {ultimateMode ? '终极AI火力全开' : 'AI为你生成的回击'}
                    </h2>
                  </div>
                  
                  <div className="space-y-6">
                    {responses.map((response, index) => (
                      <div
                        key={index}
                        className={`group/response relative p-6 ${ultimateMode ? 'bg-gradient-to-r from-red-500/20 to-rose-500/20 border-red-500/30' : 'bg-gradient-to-r from-white/10 to-white/5 border-white/20'} backdrop-blur-sm rounded-2xl border hover:border-white/30 transition-all duration-300 hover:scale-102 hover:shadow-xl`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 ${ultimateMode ? 'bg-gradient-to-r from-red-400 to-rose-500' : 'bg-gradient-to-r from-cyan-400 to-purple-500'} text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 shadow-lg`}>
                            {ultimateMode ? (
                              <Flame className="w-6 h-6" />
                            ) : (
                              <span>{index + 1}</span>
                            )}
                          </div>
                          <p className={`${ultimateMode ? 'text-red-100' : 'text-white'} leading-relaxed flex-1 text-xl font-medium`}>{response}</p>
                          <button
                            onClick={() => copyToClipboard(response, index)}
                            className="opacity-0 group-hover/response:opacity-100 transition-all duration-200 p-3 hover:bg-white/10 rounded-xl transform hover:scale-110"
                          >
                            {copiedIndex === index ? (
                              <Check className="w-6 h-6 text-emerald-400" />
                            ) : (
                              <Copy className={`w-6 h-6 ${ultimateMode ? 'text-red-300 hover:text-red-100' : 'text-gray-300 hover:text-white'}`} />
                            )}
                          </button>
                        </div>
                        {ultimateMode && (
                          <div className="absolute top-2 right-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-400 to-gray-600 rounded-3xl blur opacity-25 transition duration-300" />
                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 text-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-gray-400/20 to-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
                    <MessageCircle className="w-16 h-16 text-gray-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-300 mb-6">等待生成回击内容</h3>
                  <p className="text-gray-400 text-xl leading-relaxed">
                    填写对方的话，选择攻击风格，让AI为你生成完美的回击！
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-24 py-8">
          <div className="inline-flex items-center gap-4 px-10 py-6 bg-white/10 backdrop-blur-xl rounded-full shadow-2xl border border-white/20 hover:border-white/30 transition-all duration-300 group">
            <span className="text-4xl animate-bounce">💡</span>
            <span className="text-gray-300 font-medium text-xl group-hover:text-white transition-colors duration-200">理性讨论，和谐交流，AI助你智慧表达</span>
          </div>
        </div>
      </div>
    </div>
  );
}
