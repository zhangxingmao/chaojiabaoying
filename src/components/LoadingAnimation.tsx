'use client';

import { Brain, Zap, Sparkles } from 'lucide-react';

interface LoadingAnimationProps {
  message?: string;
}

export default function LoadingAnimation({ message = "AI正在思考中..." }: LoadingAnimationProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      {/* 主要加载动画 */}
      <div className="relative">
        {/* 外圈旋转 */}
        <div className="w-20 h-20 border-4 border-transparent border-t-cyan-400 border-r-purple-500 rounded-full animate-spin"></div>
        
        {/* 内圈反向旋转 */}
        <div className="absolute inset-2 w-16 h-16 border-4 border-transparent border-b-pink-400 border-l-blue-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        
        {/* 中心图标 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
            <Brain className="w-4 h-4 text-white animate-bounce" />
          </div>
        </div>
        
        {/* 发光效果 */}
        <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full animate-ping"></div>
      </div>
      
      {/* 思考粒子 */}
      <div className="flex items-center gap-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-bounce"
            style={{ 
              animationDelay: `${i * 0.2}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
      
      {/* 加载文字 */}
      <div className="text-center">
        <p className="text-white text-lg font-medium mb-2">{message}</p>
        <div className="flex items-center justify-center gap-1">
          <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
          <span className="text-gray-300 text-sm">正在生成智慧回击</span>
          <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>
      
      {/* 进度条 */}
      <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
      </div>
      
      {/* 底部装饰 */}
      <div className="flex items-center gap-4 opacity-60">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-1 h-8 bg-gradient-to-t from-transparent via-cyan-400 to-transparent animate-pulse"
            style={{ 
              animationDelay: `${i * 0.1}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>
    </div>
  );
} 