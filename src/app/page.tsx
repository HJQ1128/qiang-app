import Navigation from '../components/Navigation';

export default function Home() {
  const portfolioItems = [
    {
      title: '创意设计项目',
      category: 'UI/UX 设计',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=600&h=400&fit=crop',
      color: '#ff6b6b',
    },
    {
      title: '品牌视觉系统',
      category: '品牌设计',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
      color: '#a855f7',
    },
    {
      title: 'Web应用开发',
      category: '全栈开发',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      color: '#4ecdc4',
    },
    {
      title: '移动端设计',
      category: 'App设计',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop',
      color: '#ffe66d',
    },
  ];

  const blogPosts = [
    {
      title: '探索创意设计的无限可能',
      excerpt: '设计不仅仅是视觉的呈现，更是情感的传递和故事的讲述...',
      date: '2026-06-01',
      category: '设计思考',
      readTime: '5分钟',
    },
    {
      title: '现代Web开发的最佳实践',
      excerpt: '从性能优化到用户体验，深入探讨前端开发的核心要点...',
      date: '2026-05-28',
      category: '技术分享',
      readTime: '8分钟',
    },
    {
      title: '色彩心理学在品牌设计中的应用',
      excerpt: '了解如何运用色彩来传达品牌价值和情感连接...',
      date: '2026-05-20',
      category: '品牌设计',
      readTime: '6分钟',
    },
  ];

  const skills = [
    { name: 'UI/UX 设计', level: 90 },
    { name: '前端开发', level: 85 },
    { name: '品牌设计', level: 80 },
    { name: '动效设计', level: 75 },
  ];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#ff6b6b] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-[#a855f7] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-[#4ecdc4] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            <span className="gradient-text">创意无限</span>
            <br />
            <span className="text-white">设计未来</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            探索设计与技术的完美融合，创造独特的数字体验
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <a href="#portfolio" className="px-8 py-3 bg-gradient-to-r from-[#ff6b6b] to-[#a855f7] rounded-full font-semibold hover:opacity-90 transition-opacity">
              查看作品
            </a>
            <a href="#contact" className="px-8 py-3 border border-white/30 rounded-full font-semibold hover:bg-white/10 transition-colors">
              联系我
            </a>
          </div>
        </div>

        {/* 滚动提示 */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">作品集</h2>
            <p className="text-gray-400 text-lg">精选项目展示</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl glass hover-lift cursor-pointer"
              >
                <div className="aspect-video relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="text-sm px-3 py-1 rounded-full mb-2 inline-block" style={{ backgroundColor: item.color }}>
                    {item.category}
                  </span>
                  <h3 className="text-2xl font-bold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 px-4 bg-gradient-to-b from-transparent to-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">博客</h2>
            <p className="text-gray-400 text-lg">分享思考与灵感</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="glass rounded-2xl p-6 hover-lift cursor-pointer group"
              >
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                  <span className="px-2 py-1 bg-[#a855f7]/20 text-[#a855f7] rounded-full">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-[#ff6b6b] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="text-sm text-gray-500">{post.date}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">关于我</h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                我是一名热爱创意的设计师与开发者，专注于创造独特的数字体验。
                我相信设计不仅仅是视觉的呈现，更是情感的传递和故事的讲述。
              </p>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                通过将艺术美感与技术实现相结合，我致力于打造既美观又实用的作品，
                为用户带来愉悦的体验。
              </p>

              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#ff6b6b] to-[#a855f7] rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden glass glow">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* 装饰元素 */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#ff6b6b] rounded-full opacity-20 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#4ecdc4] rounded-full opacity-20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gradient-to-b from-black/20 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">联系我</h2>
          <p className="text-gray-400 text-lg mb-12">
            有项目想法或合作意向？欢迎随时联系我
          </p>

          <div className="glass rounded-2xl p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="您的姓名"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#a855f7] transition-colors"
                />
                <input
                  type="email"
                  placeholder="您的邮箱"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#a855f7] transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder="主题"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#a855f7] transition-colors"
              />
              <textarea
                placeholder="您的消息..."
                rows={5}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#a855f7] transition-colors resize-none"
              ></textarea>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#ff6b6b] to-[#a855f7] rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                发送消息
              </button>
            </form>
          </div>

          {/* Social Links */}
          <div className="mt-12 flex justify-center gap-6">
            <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="mailto:hello@mochi0211.top" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>© 2026 Mochi. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}