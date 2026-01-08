import React from 'react';

// 计算麻薯来到世界天数的组件
const MochiBirthday = () => {
  const birthday = new Date('2023-03-14');
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - birthday.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700">
      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">麻薯已经陪伴我们</p>
      <p className="text-3xl font-mono font-bold text-blue-400">{diffDays} <span className="text-lg">天</span></p>
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
        </p>
      </header>

      {/* 核心板块 */}
      <section className="max-w-md mx-auto space-y-6">
        
        {/* 1. 核心目标卡片 */}
        <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="mr-2">✨</span> 核心目标
          </h2>
          <div className="space-y-3">
            <p className="text-sm text-slate-300">· 减脂增肌：坚持戒糖控糖 🏃‍♂️</p>
            <p className="text-sm text-slate-300">· 职业规划：学习前端开发 💻</p>
            <p className="text-sm text-slate-300">· 照顾家庭：当当 & 麻薯 🏠</p>
          </div>
        </div>

        {/* 2. 身体 & 宠物状态卡片 */}
        <div className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="mr-2">💪</span> 状态追踪
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50 text-center">
              <p className="text-xs text-slate-500 mb-1">控糖进度</p>
              <p className="text-xl font-bold text-green-400">进行中</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50 text-center">
              <p className="text-xs text-slate-500 mb-1">麻薯体重</p>
              <p className="text-xl font-bold text-orange-400">20 斤</p>
            </div>
          </div>
        </div>

        {/* 3. 麻薯陪伴卡片 */}
        <MochiBirthday />

      </section>

      {/* 页脚提醒 */}
      <footer className="max-w-md mx-auto mt-12 text-center text-slate-500 text-xs">
        <p>记得保护颈椎，晚上10点后准时休息</p>
      </footer>
    </main>
  );
}