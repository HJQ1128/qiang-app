"use client";
import React, { useState, useEffect } from 'react';

// 计算麻薯相关日期的逻辑组件
const MochiStats = () => {
  const [stats, setStats] = useState({ daysTogether: 0, daysToBirthday: 0 });

  useEffect(() => {
    const calculateDates = () => {
      const now = new Date();
      const birthDate = new Date('2023-03-14');
      
      // 1. 计算陪伴天数
      const diffTime = Math.abs(now.getTime() - birthDate.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      // 2. 计算下一个生日倒计时
      let nextBirthday = new Date(now.getFullYear(), 2, 14); // 今年的3月14日
      if (now > nextBirthday) {
        nextBirthday.setFullYear(now.getFullYear() + 1); // 如果今年过了，就算明年的
      }
      const timeToBirthday = nextBirthday.getTime() - now.getTime();
      const daysToBirthday = Math.ceil(timeToBirthday / (1000 * 60 * 60 * 24));

      setStats({ daysTogether: diffDays, daysToBirthday });
    };

    calculateDates();
    // 每天凌晨自动刷新一次
    const timer = setInterval(calculateDates, 1000 * 60 * 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-4">
      <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50">
        <p className="text-xs text-slate-500 mb-1 font-medium">已陪伴麻薯</p>
        <p className="text-3xl font-mono font-bold text-blue-400">{stats.daysTogether} <span className="text-sm">天</span></p>
      </div>
      <div className="bg-pink-500/10 p-4 rounded-2xl border border-pink-500/20">
        <p className="text-xs text-pink-400 mb-1 font-medium">距离麻薯生日还有</p>
        <p className="text-3xl font-mono font-bold text-pink-500">{stats.daysToBirthday} <span className="text-sm">天</span></p>
      </div>
    </div>
  );
};

export default function Home() {
  const [count, setCount] = useState(0);

  // 初始化：读取记忆
  useEffect(() => {
    const savedCount = localStorage.getItem('dietCount2026');
    if (savedCount) setCount(parseInt(savedCount));
  }, []);

  // 打卡记忆功能
  const handleCheckIn = () => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem('dietCount2026', newCount.toString());
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-200 p-6 font-sans">
      <header className="max-w-md mx-auto pt-8 pb-8 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          阿强的私人空间
        </h1>
        <p className="mt-3 text-slate-400 italic text-sm">“2026 减脂增肌 · 陪伴当当 & 麻薯”</p>
      </header>

      <section className="max-w-md mx-auto space-y-6">
        {/* 1. 2026 控糖运动打卡 */}
        <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 shadow-xl">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <span className="mr-2">💪</span> 2026 坚持挑战
          </h2>
          <div className="flex flex-col items-center py-6 bg-slate-900/60 rounded-2xl mb-4 border border-slate-700/30">
            <p className="text-xs text-slate-500 mb-1">已累计控糖/运动 (目标365天)</p>
            <p className="text-6xl font-black text-emerald-400">{count}</p>
          </div>
          <button 
            onClick={handleCheckIn}
            className="w-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/20"
          >
            完成今日打卡
          </button>
        </div>

        {/* 2. 麻薯数据板块 */}
        <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 shadow-xl">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <span className="mr-2">🐶</span> 麻薯 Mochi
          </h2>
          <div className="mb-4 flex justify-between items-center px-1">
            <span className="text-slate-400 text-sm italic">当前体重: 20 斤</span>
            <span className="text-blue-400 text-xs bg-blue-400/10 px-2 py-1 rounded-full border border-blue-400/20">小乖狗</span>
          </div>
          <MochiStats />
        </div>
      </section>

      <footer className="max-w-md mx-auto mt-10 text-center text-slate-600 text-xs space-y-1">
        <p>上海虹桥城家高级公寓 · 记录点滴</p>
        <p className="text-red-500/50 font-medium">⚠️ 23:50 了！阿强，你的颈椎需要枕头，不需要屏幕。</p>
      </footer>
    </main>
  );
}