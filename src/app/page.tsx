'use client';

import { useState, useEffect } from 'react';

// 日期数据
const DATE_DATA = {
  mochiBirthday: new Date('2023-03-14'),
  dangdangBirthday: new Date('1999-06-13'),
  togetherDate: new Date('2022-02-11'),
  weddingDate: new Date('2026-05-16'),
  dangdang10000Days: new Date('2026-11-21'), // 1999-06-13 + 10000天
};

// 计算倒计时
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds, totalDays: days });
      } else {
        // 已经过了的日期，计算已过天数
        const pastDays = Math.floor(Math.abs(difference) / (1000 * 60 * 60 * 24));
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: -pastDays });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

// 计算年龄
function calculateAge(birthDate: Date) {
  const now = new Date();
  const diff = now.getTime() - birthDate.getTime();
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24));
  return { years, days };
}

// 倒计时卡片组件
function CountdownCard({ title, emoji, targetDate, description, isPast = false }: {
  title: string;
  emoji: string;
  targetDate: Date;
  description: string;
  isPast?: boolean;
}) {
  const { days, hours, minutes, seconds, totalDays } = useCountdown(targetDate);

  if (isPast && totalDays < 0) {
    return (
      <div className="glass rounded-3xl p-6 hover-lift fade-in">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{emoji}</span>
          <h3 className="text-xl font-bold text-gray-700">{title}</h3>
        </div>
        <p className="text-gray-500 text-sm mb-4">{description}</p>
        <div className="text-center py-4">
          <div className="text-5xl font-bold gradient-text mb-2">
            {Math.abs(totalDays)}
          </div>
          <div className="text-gray-500 text-sm">天</div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-3xl p-6 hover-lift fade-in">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{emoji}</span>
        <h3 className="text-xl font-bold text-gray-700">{title}</h3>
      </div>
      <p className="text-gray-500 text-sm mb-4">{description}</p>
      <div className="grid grid-cols-4 gap-2">
        <div className="text-center bg-gradient-to-br from-[#ff9f9f]/30 to-[#ffc3a0]/30 rounded-xl p-3">
          <div className="text-2xl font-bold text-gray-800">{days}</div>
          <div className="text-xs text-gray-500">天</div>
        </div>
        <div className="text-center bg-gradient-to-br from-[#ff9f9f]/30 to-[#ffc3a0]/30 rounded-xl p-3">
          <div className="text-2xl font-bold text-gray-800">{hours}</div>
          <div className="text-xs text-gray-500">时</div>
        </div>
        <div className="text-center bg-gradient-to-br from-[#ff9f9f]/30 to-[#ffc3a0]/30 rounded-xl p-3">
          <div className="text-2xl font-bold text-gray-800">{minutes}</div>
          <div className="text-xs text-gray-500">分</div>
        </div>
        <div className="text-center bg-gradient-to-br from-[#ff9f9f]/30 to-[#ffc3a0]/30 rounded-xl p-3">
          <div className="text-2xl font-bold text-gray-800">{seconds}</div>
          <div className="text-xs text-gray-500">秒</div>
        </div>
      </div>
    </div>
  );
}

// 照片画廊组件
function PhotoGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const photos = [
    {
      url: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?w=600&h=600&fit=crop',
      caption: '可爱的麻薯',
    },
    {
      url: 'https://images.unsplash.com/photo-1502790671045-0876a96143ef?w=600&h=600&fit=crop',
      caption: '海边的当当',
    },
    {
      url: 'https://images.unsplash.com/photo-1544569146-07c48f5f47e7?w=600&h=600&fit=crop',
      caption: '麻薯在海边玩耍',
    },
    {
      url: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=600&h=600&fit=crop',
      caption: '当当和麻薯',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 gradient-text">📷 我们的回忆</h2>
        
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="aspect-square">
            {photos.map((photo, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <p className="text-white text-lg font-medium">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 指示器 */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 缩略图 */}
        <div className="grid grid-cols-4 gap-3 mt-6">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                index === activeIndex
                  ? 'border-[#ff7675] shadow-lg'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full aspect-square object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const mochiAge = calculateAge(DATE_DATA.mochiBirthday);
  const dangdangAge = calculateAge(DATE_DATA.dangdangBirthday);
  const togetherDays = useCountdown(DATE_DATA.togetherDate).totalDays;

  return (
    <main className="min-h-screen bg-[#fff8f0]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-64 h-64 bg-[#ff9f9f]/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#ffc3a0]/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-[#ffecd2]/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>

        {/* 爱心装饰 */}
        <div className="absolute top-32 left-20 text-4xl animate-pulse-slow opacity-60">💕</div>
        <div className="absolute top-48 right-32 text-3xl animate-pulse-slow opacity-50" style={{ animationDelay: '1s' }}>💗</div>
        <div className="absolute bottom-40 left-32 text-3xl animate-pulse-slow opacity-50" style={{ animationDelay: '2s' }}>💖</div>

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="text-6xl mb-6 animate-fade-in-up">👩‍❤️‍👨🐶</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up delay-1">
            <span className="gradient-text">当当 & 强哥</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in-up delay-2">
            还有可爱的麻薯宝贝
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-3">
            <span className="px-4 py-2 bg-white/80 rounded-full text-gray-700 shadow-sm">
              🎎 已婚 {Math.abs(togetherDays)} 天
            </span>
            <span className="px-4 py-2 bg-white/80 rounded-full text-gray-700 shadow-sm">
              🐾 麻薯 {mochiAge.years}岁 {mochiAge.days}天
            </span>
          </div>
        </div>

        {/* 滚动提示 */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* 倒计时卡片区域 */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">⏰ 重要时刻</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 麻薯年龄 */}
            <div className="glass rounded-3xl p-6 hover-lift fade-in">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🐶</span>
                <h3 className="text-xl font-bold text-gray-700">麻薯的年龄</h3>
              </div>
              <div className="text-center py-4">
                <div className="text-6xl font-bold gradient-text">{mochiAge.years}</div>
                <div className="text-gray-500">岁</div>
                <div className="text-gray-400 text-sm mt-1">+ {mochiAge.days} 天</div>
              </div>
              <p className="text-center text-gray-400 text-xs mt-4">生日: 2023年3月14日</p>
            </div>

            {/* 当当年龄 */}
            <div className="glass rounded-3xl p-6 hover-lift fade-in delay-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">👸</span>
                <h3 className="text-xl font-bold text-gray-700">当当的年龄</h3>
              </div>
              <div className="text-center py-4">
                <div className="text-6xl font-bold gradient-text">{dangdangAge.years}</div>
                <div className="text-gray-500">岁</div>
                <div className="text-gray-400 text-sm mt-1">+ {dangdangAge.days} 天</div>
              </div>
              <p className="text-center text-gray-400 text-xs mt-4">生日: 1999年6月13日</p>
            </div>

            {/* 当当生日倒计时 */}
            <CountdownCard
              title="当当生日"
              emoji="🎂"
              targetDate={new Date(`${new Date().getFullYear()}-06-13`)}
              description="距离当当生日还有"
            />

            {/* 结婚纪念日倒计时 */}
            <CountdownCard
              title="结婚纪念日"
              emoji="💒"
              targetDate={new Date(`${new Date().getFullYear()}-05-16`)}
              description="距离结婚纪念日还有"
            />

            {/* 在一起的日子 */}
            <CountdownCard
              title="在一起"
              emoji="❤️"
              targetDate={DATE_DATA.togetherDate}
              description="已经在一起的天数"
              isPast
            />

            {/* 当当10000天倒计时 */}
            <CountdownCard
              title="当当10000天"
              emoji="🌟"
              targetDate={DATE_DATA.dangdang10000Days}
              description="距离当当出生第10000天"
            />
          </div>
        </div>
      </section>

      {/* 照片画廊 */}
      <PhotoGallery />

      {/* 页脚 */}
      <footer className="py-8 px-4 border-t border-[#ffc3a0]/30">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500">
            Made with 💖 by 强哥 & 当当
          </p>
          <p className="text-gray-400 text-sm mt-2">
            © {new Date().getFullYear()} mochi0211.top
          </p>
        </div>
      </footer>
    </main>
  );
}