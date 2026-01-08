"use client";
import React, { useState, useEffect } from 'react';

// 1. 每日情话库
const loveQuotes = [
  "每一天，只要有你在，空气都是甜的。",
  "想你了！",
  "bb在干嘛？0.0。",
  "遇见你之后，我再也不想‘临时抱佛脚’了，只想一辈子抱你。",
  "当当，你是我的 365 天里最美的风景。",
  "全世界最好看的你，今天也要记得多喝水。"
];

// 2. 自动刷新的美食库 (针对减脂控糖)
const foods = ["低卡柠檬鱼", "全麦牛油果三明治", "清蒸巴沙鱼", "蒜蓉西蓝花虾仁", "牛肉海带汤", "香煎鸡胸肉芦笋", "豆乳火锅", "捞汁荞麦面", "无糖番茄牛腩"];

export default function Home() {
  const [history, setHistory] = useState<string[]>([]); // 存储打卡日期
  const [quote, setQuote] = useState("");
  const [todayFood, setTodayFood] = useState("");

  useEffect(() => {
    // 初始化数据
    const saved = localStorage.getItem('workoutHistory');
    if (saved) setHistory(JSON.parse(saved));
    
    // 每日情话 & 美食根据日期自动变
    const dayIndex = new Date().getDate() % loveQuotes.length;
    setQuote(loveQuotes[dayIndex]);
    setTodayFood(foods[new Date().getDate() % foods.length]);
  }, []);

  const handleCheckIn = () => {
    const today = new Date().toLocaleDateString();
    if (!history.includes(today)) {
      const newHistory = [...history, today];
      setHistory(newHistory);
      localStorage.setItem('workoutHistory', JSON.stringify(newHistory));
    }
  };

  // 简易日历格子逻辑
  const renderCalendar = () => {
    const boxes = [];
    for (let i = 0; i < 21; i++) { // 展示最近3周
      boxes.push(
        <div key={i} className={`w-4 h-4 rounded-sm ${i < history.length ? 'bg-emerald-500' : 'bg-slate-700'}`} />
      );
    }
    return boxes;
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-200 p-6 font-sans pb-24">
      {/* 头部：每日情话 */}
      <header className="max-w-md mx-auto pt-8 pb-6 text-center">
        <div className="bg-pink-500/10 p-4 rounded-2xl border border-pink-500/20 mb-6">
          <p className="text-pink-400 text-sm italic font-medium">“{quote}”</p>
        </div>
        <h1 className="text-3xl font-black text-white">阿强的私人空间</h1>
      </header>

      <section className="max-w-md mx-auto space-y-6">
        {/* 打卡 & 统计回顾 */}
        <div className="bg-slate-800/80 p-6 rounded-3xl border border-slate-700 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">💪 2026 挑战</h2>
            <div className="flex gap-1">{renderCalendar()}</div>
          </div>
          <button onClick={handleCheckIn} className="w-full bg-blue-600 py-4 rounded-2xl font-bold active:scale-95 transition-all">
            点我打卡 (已坚持 {history.length} 天)
          </button>
        </div>

        {/* 当当吃什么模块 */}
        <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/10 p-6 rounded-3xl border border-orange-500/20">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            <span className="mr-2">🍱</span> 今天当当吃什么？
          </h2>
          <div className="bg-white/5 p-6 rounded-2xl text-center border border-white/10">
            <p className="text-xs text-slate-400 mb-2">主厨推荐</p>
            <p className="text-2xl font-black text-orange-400">{todayFood}</p>
          </div>
          <p className="text-[10px] text-slate-500 mt-3 text-center">菜单根据日期每日 0:00 准时自动刷新</p>
        </div>
      </section>

      {/* 底部导航 */}
      <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-md bg-slate-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-full text-center shadow-2xl">
         <p className="text-xs text-slate-400 font-medium">麻薯在干嘛！</p>
      </footer>
    </main>
  );
}