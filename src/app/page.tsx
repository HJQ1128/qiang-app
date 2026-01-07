import React from 'react';

// 计算麻薯来到世界天数的逻辑
const MochiBirthday = () => {
  const birthday = new Date('2023-03-14');
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - birthday.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
  
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">麻薯已经陪伴你</p >
        <p className="text-3xl font-mono font-bold text-blue-400">{diffDays} 天</p >
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-200 p-6 font-sans">
      {/* 头部区域 */}
      <header className="max-w-md mx-auto pt-12 pb-8 text-center">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
          阿强的私人空间
        </h1>
        <p className="mt-4 text-slate-400 italic">
          “只要努力，什么时候都不算晚”
        </p >
      </header>

      {/* 核心板块：今日状态 */}
      <section className="max-w-md mx-auto space-y-6">
        <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="mr-2">✨</span> 核心目标
          </h2>
          <div className="space-y-3">
            <p className="text-sm text-slate-300">· 减脂增肌：坚持戒糖</p >
            <p className="text-sm text-slate-300">· 职业规划：学习前端开发</p >
            <p className="text-sm text-slate-300">· 照顾家庭：当当 & 麻薯</p >
          </div>
        </div>

        {/* 动态计算麻薯的日子 */}
        <MochiBirthday />

        {/* 底部按钮 */}
        <div className="pt-4">
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-500/20">
            点击记录今日努力
          </button>
        </div>
      </section>

      {/* 温馨提醒 */}
      <footer className="max-w-md mx-auto mt-12 text-center text-xs text-slate-500">
        注意颈椎休息 · 每天 22:00 准时放下电脑
      </footer>
    </main>
  );
}
