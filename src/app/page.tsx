'use client';

import { useState, useEffect } from 'react';
import MessageBoard from '../components/MessageBoard';

// 日期数据
const DATE_DATA = {
  mochiBirthday: new Date('2023-03-14'),
  dangdangBirthday: new Date('1999-06-13'),
  togetherDate: new Date('2022-02-11'),
  dangdang10000Days: new Date('2026-11-21'),
};

// 照片数据
const PHOTOS = [
  '/3190eafccec1e247ee0a445fa5a35edd.jpg',
  '/313279550bc8cbd548bfd4e54f125fd0.jpg',
  '/b1b3735f719f02b014571f030cc86d06.jpg',
  '/c30dd4b4f21a70aac058e576870597e9.jpg',
];

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

// 倒计时卡片组件 - 带照片背景
function PhotoCountdownCard({ 
  title, 
  emoji, 
  targetDate, 
  description, 
  photoUrl,
  isPast = false,
  delay = 0 
}: {
  title: string;
  emoji: string;
  targetDate: Date;
  description: string;
  photoUrl: string;
  isPast?: boolean;
  delay?: number;
}) {
  const { days, hours, minutes, seconds, totalDays } = useCountdown(targetDate);

  return (
    <div 
      className="relative rounded-3xl overflow-hidden shadow-2xl hover-lift fade-in group"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* 背景图片 */}
      <div className="aspect-[4/3] relative">
        <img
          src={photoUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
      </div>
      
      {/* 内容 */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{emoji}</span>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-white/70 text-sm mb-4">{description}</p>
        
        {isPast && totalDays < 0 ? (
          <div className="text-center py-3">
            <div className="text-4xl font-bold text-white mb-1">{Math.abs(totalDays)}</div>
            <div className="text-white/70 text-sm">天</div>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {[
              { value: days, label: '天' },
              { value: hours, label: '时' },
              { value: minutes, label: '分' },
              { value: seconds, label: '秒' },
            ].map((item, index) => (
              <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-2">
                <div className="text-lg font-bold text-white">{item.value}</div>
                <div className="text-white/60 text-xs">{item.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 照片画廊组件 - 无文字标注
function PhotoGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PHOTOS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-transparent to-[#fff8f0]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 gradient-text">📷 Memories</h2>
        
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="aspect-video">
            {PHOTOS.map((photo, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === activeIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={photo}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10"></div>
              </div>
            ))}
          </div>

          {/* 指示器 */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            {PHOTOS.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-white w-6'
                    : 'bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 缩略图 */}
        <div className="grid grid-cols-4 gap-3 mt-6">
          {PHOTOS.map((photo, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                index === activeIndex
                  ? 'border-[#ff7675] shadow-lg scale-105'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={photo}
                alt=""
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
  const togetherDays = useCountdown(DATE_DATA.togetherDate).totalDays;

  return (
    <main className="min-h-screen bg-[#fff8f0]">
      {/* Hero Section - 全屏照片背景 */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* 背景图片 */}
        <div className="absolute inset-0">
          <img
            src={PHOTOS[3]}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70"></div>
        </div>

        {/* 装饰元素 */}
        <div className="absolute top-20 left-10 text-5xl animate-pulse-slow opacity-40">💕</div>
        <div className="absolute top-40 right-20 text-4xl animate-pulse-slow opacity-30" style={{ animationDelay: '1s' }}>💗</div>
        <div className="absolute bottom-32 left-20 text-4xl animate-pulse-slow opacity-30" style={{ animationDelay: '2s' }}>💖</div>
        <div className="absolute bottom-20 right-10 text-5xl animate-pulse-slow opacity-40" style={{ animationDelay: '1.5s' }}>🐶</div>

        {/* 内容 */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="text-7xl mb-6 animate-fade-in-up">👩‍❤️‍👨🐶</div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in-up delay-1">
            <span className="text-white">当当 & 麦兜</span>
          </h1>
          <p className="text-xl text-white/80 mb-8 animate-fade-in-up delay-2">
            With our lovely Mochi
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up delay-3">
            <span className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20">
              ❤️ Together {Math.abs(togetherDays)} days
            </span>
            <span className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20">
              🐾 Mochi {mochiAge.years} years
            </span>
          </div>
        </div>

        {/* 滚动提示 */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* 倒计时卡片区域 */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">⏰ Countdown</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 麻薯年龄 */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl hover-lift fade-in">
              <div className="aspect-[4/3] relative">
                <img
                  src={PHOTOS[0]}
                  alt="Mochi"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
              </div>
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🐶</span>
                  <h3 className="text-xl font-bold text-white">Mochi</h3>
                </div>
                <div className="text-center py-3">
                  <div className="text-5xl font-bold text-white mb-1">{mochiAge.years}</div>
                  <div className="text-white/70 text-sm">岁 + {mochiAge.days} 天</div>
                </div>
              </div>
            </div>

            {/* 当当生日倒计时 */}
            <PhotoCountdownCard
              title="Birthday"
              emoji="🎂"
              targetDate={new Date(`${new Date().getFullYear()}-06-13`)}
              description="Until birthday"
              photoUrl={PHOTOS[1]}
              delay={100}
            />

            {/* 在一起的日子 */}
            <PhotoCountdownCard
              title="Together"
              emoji="❤️"
              targetDate={DATE_DATA.togetherDate}
              description="Days together"
              photoUrl={PHOTOS[3]}
              isPast
              delay={200}
            />

            {/* 当当10000天倒计时 */}
            <PhotoCountdownCard
              title="10000 Days"
              emoji="🌟"
              targetDate={DATE_DATA.dangdang10000Days}
              description="Until 10000 days"
              photoUrl={PHOTOS[2]}
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* 照片画廊 */}
      <PhotoGallery />

      {/* 留言板 */}
      <MessageBoard />

      {/* 页脚 */}
      <footer className="py-8 px-4 border-t border-white/10 bg-black/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500">
            Made with 💖 by Dangdang & McDull
          </p>
          <p className="text-gray-400 text-sm mt-2">
            © {new Date().getFullYear()} mochi0211.top
          </p>
        </div>
      </footer>
    </main>
  );
}