"use client";
import React, { useState, useEffect } from 'react';

// --- 恋爱、麻薯、菜谱数据 ---
const loveQuotes = ["只要有你在，空气都是甜的。", "当当，今天也要闪闪发光呀！", "bb在干嘛？0.0", "忘掉粉色甜甜圈。", "当当，你是最美的风景。"];

const recipeBook = [
  { name: "低卡柠檬鱼", steps: "1.巴沙鱼切片腌制；2.铺上柠檬片与姜丝；3.水开蒸8分钟；4.淋上低脂酱油。" },
  { name: "全麦牛油果三明治", steps: "1.全麦吐司烤脆；2.牛油果捣泥铺底；3.煎一个流心蛋；4.撒黑胡椒和海盐。" },
  { name: "蒜蓉西蓝花虾仁", steps: "1.虾仁去虾线绰水；2.西蓝花煮熟；3.热锅喷橄榄油煸蒜末；4.放入食材快火翻炒。" },
  { name: "无糖番茄牛腩", steps: "1.牛腩冷水下锅去血水；2.番茄炒出汁；3.炖锅慢炖1小时；4.不加糖，靠番茄天然甜味。" },
  { name: "清爽牛肉捞汁面", steps: "1.荞麦面煮熟过凉水；2.牛肉切薄片；3.加入黄瓜丝、生抽、陈醋、蒜末；4.拌匀开吃。" }
];

export default function Home() {
  const [history, setHistory] = useState<string[]>([]);
  const [mochiStats, setMochiStats] = useState({ together: 0, countdown: 0 });
  const [loveDays, setLoveDays] = useState(0);
  const [recipeIndex, setRecipeIndex] = useState(0);
  const [quote, setQuote] = useState("");

  useEffect(() => {
    // 1. 初始化打卡记录
    const saved = localStorage.getItem('workoutHistory_v3');
    if (saved) { setHistory(JSON.parse(saved)); } 
    else {
      const initial = ["2026/1/7", "2026/1/8"];
      setHistory(initial);
      localStorage.setItem('workoutHistory_v3', JSON.stringify(initial));
    }

    // 2. 时间计算逻辑
    const calcDates = () => {
      const now = new Date();
      // 恋爱时间
      const startLove = new Date('2022-02-11');
      setLoveDays(Math.floor((now.getTime() - startLove.getTime()) / (1000 * 60 * 60 * 24)));
      // 麻薯时间
      const birth = new Date('2023-03-14');
      const together = Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
      let nextB = new Date(now.getFullYear(), 2, 14);
      if (now > nextB) nextB.setFullYear(now.getFullYear() + 1);
      setMochiStats({ together, countdown: Math.ceil((nextB.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) });
    };

    setQuote(loveQuotes[new Date().getDate() % loveQuotes.length]);
    calcDates();
  }, []);

  const nextRecipe = () => setRecipeIndex((prev) => (prev + 1) % recipeBook.length);

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 p-6 font-sans pb-32">
      {/* 1. 恋爱计时器组件 */}
      <div className="max-w-md mx-auto mb-6 text-center">
        <div className="inline-block bg-gradient-to-r from-red-500/20 to-pink-500/20 px-6 py-2 rounded-full border border-red-500/30">
          <p className="text-pink-400 text-sm font-bold">❤️ 阿强 & 当当 已经在一起 {loveDays} 天</p>
        </div>
      </div>

      <section className="max-w-md mx-auto space-y-6">
        {/* 2. 打卡挑战 */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-[2.5rem] relative overflow-hidden">
          <h2 className="text-lg font-bold mb-4 text-emerald-400 flex justify-between">
            <span>🏃‍♂️ 2026 挑战</span>
            <span className="text-white">{history.length} <span className="text-xs opacity-50">/ 365</span></span>
          </h2>
          <div className="flex flex-wrap gap-1 mb-6">
            {[...Array(21)].map((_, i) => (
              <div key={i} className={`w-3.5 h-3.5 rounded-sm ${i < history.length ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-slate-800'}`} />
            ))}
          </div>
          <button onClick={() => {
            const t = new Date().toLocaleDateString();
            if(!history.includes(t)) {
              const nh = [...history, t];
              setHistory(nh);
              localStorage.setItem('workoutHistory_v3', JSON.stringify(nh));
            }
          }} className="w-full bg-emerald-500 text-slate-950 font-black py-3 rounded-xl active:scale-95 transition-all">记录今日运动</button>
        </div>

        {/* 3. 麻薯组件 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-3xl text-center">
            <p className="text-[10px] text-blue-400 font-bold mb-1 text-left ml-2">陪伴麻薯</p>
            <p className="text-2xl font-black">{mochiStats.together} <span className="text-xs">天</span></p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-3xl text-center">
            <p className="text-[10px] text-purple-400 font-bold mb-1 text-left ml-2">麻薯生日</p>
            <p className="text-2xl font-black">{mochiStats.countdown} <span className="text-xs">天</span></p>
          </div>
        </div>

        {/* 4. 点击切换的西式餐牌 */}
        <div className="bg-[#f8f5f0] p-6 rounded-[2rem] shadow-2xl border-4 border-[#e5e1d8] text-slate-800 relative">
          <div className="absolute top-4 right-6 text-[#d4cfc3] font-serif text-4xl">MENU</div>
          <h2 className="text-[#8b7e6a] font-serif font-bold italic mb-6 border-b border-[#d4cfc3] pb-2">Today's Special</h2>
          
          <div className="text-center py-4 cursor-pointer active:opacity-60" onClick={nextRecipe}>
            <p className="text-xs text-[#b0a695] uppercase tracking-[0.2em] mb-2">✦ Click to Switch ✦</p>
            <p className="text-3xl font-serif font-black text-[#5c5242] underline decoration-double decoration-[#d4cfc3] underline-offset-8">
              {recipeBook[recipeIndex].name}
            </p>
          </div>

          <div className="mt-8 bg-white/50 p-4 rounded-xl border border-dashed border-[#d4cfc3]">
            <p className="text-xs font-bold text-[#8b7e6a] mb-2 flex items-center">
              <span className="mr-2">👨‍🍳</span> 制作步骤 / Directions:
            </p>
            <p className="text-sm leading-loose text-[#6b5f4c] font-medium">
              {recipeBook[recipeIndex].steps}