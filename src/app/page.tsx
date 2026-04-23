// src/app/page.tsx
export default function WeddingComingSoon() {
  return (
    <main style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#fdf2f8', // 浅粉色背景，开始有氛围
      fontFamily: 'serif',
      padding: '20px',
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '3rem', color: '#db2777' }}>我们的婚礼</h1>
      <p style={{ fontSize: '1.5rem', color: '#444', margin: '20px 0' }}>
        📅 5月16日 | 老家，我们不见不散
      </p>
      <div style={{
        padding: '10px 20px',
        border: '2px solid #db2777',
        borderRadius: '20px',
        color: '#db2777'
      }}>
        邀请函正在制作中，敬请期待...
      </div>
    </main>
  );
}