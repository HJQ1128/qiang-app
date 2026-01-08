"use client";
import React, { useState, useEffect } from 'react';

// --- 配置数据 ---
const loveQuotes = [
  "只要有你在，空气都是甜的。",
  "当当，今天也要像直播间里的你一样闪闪发光呀！",
  "bb在干嘛？0.0",
  "忘掉粉色甜甜圈。",
  "当当，你是我的 365 天里最美的风景。",
  "全世界最好看的你，今天也要记得多喝水。"
];

const foods = ["低卡柠檬鱼", "全麦牛油果三明治", "清蒸巴沙鱼", "蒜蓉西蓝花虾仁", "牛肉海带汤", "香煎鸡胸肉芦笋", "豆乳火锅", "捞汁荞麦面", "无糖番茄牛腩"];

export default function Home() {
  const [history, setHistory] = useState<string[]>([]);
  const [mochiStats, setMochiStats] = useState({ together: 0, countdown: 0 });
  const [todayFood, setTodayFood] = useState("");
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // 1. 初始化打卡记录（帮你把已运动的2天存入）
    const saved = localStorage.getItem('workoutHistory_v2');
    if (saved) {
      setHistory(JSON.parse(saved));
    } else {
      // 第一次运行，模拟你已经坚持的2天（1月7日和1月8日）
      const initialHistory = ["2026/1/7", "2026/1/8"];
      setHistory(initialHistory);
      localStorage.setItem('workoutHistory_v2', JSON.stringify(initialHistory));
    }

    // 2. 计算麻薯日期
    const calcMochi = () => {
      const now = new Date();
      const birth = new Date('2023-03-14');
      // 陪伴天数
      const together = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
      // 生日倒计时
      let nextBirth = new Date(now.getFullYear(), 2, 14);
      if (now > nextBirth) nextBirth.setFullYear(now.getFullYear() + 1);
      const countdown = Math.ceil((nextBirth.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      setMochiStats({ together, countdown });
    };

    // 3. 每日内容更新
    const day = new Date().getDate();
    setQuote(loveQuotes[day % loveQuotes.length]);
    setTodayFood(foods[day % foods.length]);
    calcMochi();
  }, []);

  const handleCheckIn = () => {
    const today = new Date().toLocaleDateString();
    if (!history.includes(today)) {
      const newHistory = [...history, today];
      setHistory(newHistory);
      localStorage.setItem('workoutHistory_v2', JSON.stringify(newHistory));
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-6 font-sans pb-28">
      {/* 顶部情话 */}
      <div className="max-w-md mx-auto mb-8">
        <div className="bg-gradient-to-r from-pink-500/20 to-transparent p-4 rounded-r-3xl border-l-4 border-pink-500 backdrop-blur-sm">
          <p className="text-pink-400 text-sm font-medium leading-relaxed">“{quote}”</p>
        </div>
      </div>

      <section className="max-w-md mx-auto space-y-6">
        {/* 2026 挑战模块 - 新样式 */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-black italic">2026</div>
          <h2 className="text-lg font-bold mb-6 flex items-center text-emerald-400">
            <span className="bg-emerald-400/20 p-2 rounded-lg mr-3">🏃‍♂️</span> 365天挑战
          </h2>
          
          <div className="flex items-end gap-2 mb-6">
            <span className="text-6xl font-black text-white">{history.length}</span>
            <span className="text-slate-500 mb-2 font-bold">/ 365 DAYS</span>
          </div>

          {/* 打卡格子 */}
          <div className="flex flex-wrap gap-1.5 mb-8">
            {[...Array(28)].map((_, i) => (
              <div key={i} className={`w-3 h-3 rounded-sm ${i < history.length ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]' : 'bg-slate-800'}`} />
            ))}
          </div>

          <button onClick={handleCheckIn} className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 rounded-2xl transition-all active:scale-95">
            记录今日汗水
          </button>
        </div>

        {/* 麻薯数据 - 双卡片并排 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-500/10 border border-blue-500/20 p-5 rounded-3xl">
            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-2">陪伴麻薯</p>
            <p className="text-2xl font-black text-blue-100">{mochiStats.together} <span className="text-xs font-normal opacity-60">天</span></p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/20 p-5 rounded-3xl">
            <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-2">生日倒计时</p>
            <p className="text-2xl font-black text-purple-100">{mochiStats.countdown} <span className="text-xs font-normal opacity-60">天</span></p>
          </div>
        </div>

        {/* 当当吃什么 */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-[2.5rem]">
          <h2 className="text-lg font-bold mb-4 flex items-center text-orange-400">
            <span className="bg-orange-400/20 p-2 rounded-lg mr-3">🍱</span> 今日餐单
          </h2>
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center">
            <p className="text-2xl font-black bg-gradient-to-r from-orange-400 to-yellow-200 bg-clip-text text-transparent">
              {todayFood}
            </p>
          </div>
        </div>
      </section>

      {/* 底部悬浮提醒 */}
      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-md bg-slate-900/90 backdrop-blur-md border border-slate-800 px-6 py-4 rounded-full flex justify-between items-center shadow-2xl">
         <span className="text-xs text-slate-400">麻薯数据</span>
         <span className="text-[10px] text-slate-600">麻薯别吃了</span>
      </footer>
    </main>
  );
}