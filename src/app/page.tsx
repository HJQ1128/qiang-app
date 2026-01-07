export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white p-6 font-sans">
      <div className="max-w-md mx-auto space-y-8">
        {/* 头部：欢迎语 */}
        <header className="text-center pt-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            阿强的私人空间
          </h1>
          <p className="mt-2 text-slate-400 text-lg italic">
            “只要努力，什么时候都不算晚”
          </p>
        </header>

        {/* 核心板块：今日状态 */}
        <section className="bg-slate-800/50 p-6 rounded-3xl border border-slate-700 backdrop-blur-sm shadow-xl">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <span className="mr-2">🔥</span> 减脂增肌进度
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700">
              <p className="text-xs text-slate-500 uppercase">今日控糖</p>
              <p className="text-2xl font-mono font-bold text-green-400 text-center mt-1">已达成</p>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700">
              <p className="text-xs text-slate-500 uppercase">麻薯状态</p>
              <p className="text-2xl font-mono font-bold text-cyan-400 text-center mt-1">健康</p>
            </div>
          </div>
        </section>

        {/* 温馨提醒 */}
        <section className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-6 rounded-3xl border border-indigo-500/20">
          <p className="text-sm leading-relaxed">
            💖 <span className="text-indigo-300 font-bold">给当当：</span> 直播辛苦了，回来给你做好吃的！
          </p>
        </section>

        {/* 底部按钮 */}
        <div className="pt-4">
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 transition-all active:scale-95 text-lg">
            点这里记录今日努力
          </button>
        </div>
      </div>
    </main>
  );
}