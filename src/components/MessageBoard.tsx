'use client';

import { useState, useEffect } from 'react';
import { ref, push, onValue, remove } from 'firebase/database';
import { db } from '../app/firebase';

export interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: number;
}

export default function MessageBoard() {
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [senderName, setSenderName] = useState('麦兜');

  const CORRECT_PASSWORD = '613128';

  useEffect(() => {
    if (!loggedIn) return;

    const messagesRef = ref(db, 'love_messages');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newMessages = Object.entries(data).map(([id, msg]) => ({
          id,
          ...(msg as Omit<Message, 'id'>),
        }));
        const sorted = newMessages.sort((a, b) => b.timestamp - a.timestamp);
        
        if (sorted.length > messages.length) {
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
        }
        
        setMessages(sorted);
      } else {
        setMessages([]);
      }
    });
  }, [loggedIn, messages.length]);

  const handleLogin = () => {
    if (password === CORRECT_PASSWORD) {
      setLoggedIn(true);
      localStorage.setItem('love_login', 'true');
      const savedName = localStorage.getItem('love_sender_name');
      if (savedName) setSenderName(savedName);
    } else {
      alert('不对不对喔՞˶･֊･˶՞');
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    setSending(true);

    const messageData = {
      content: newMessage,
      sender: senderName,
      timestamp: Date.now(),
    };

    await push(ref(db, 'love_messages'), messageData);
    setNewMessage('');
    setSending(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('啥要删掉•︡ᯅ•︠ ？')) {
      await remove(ref(db, `love_messages/${id}`));
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleString('zh-CN', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!loggedIn) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">💌</div>
              <h2 className="text-2xl font-bold gradient-text">私密留言板</h2>
              <p className="text-gray-500 mt-2">输入密码查看留言</p>
            </div>
            
            <div className="space-y-4">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="请输入密码..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff7675] focus:outline-none transition-colors"
              />
              <button
                onClick={handleLogin}
                className="w-full py-3 bg-gradient-to-r from-[#ff7675] to-[#ff9f9f] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                登录
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* 新消息通知 */}
        {showNotification && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-[#ff7675] text-white px-6 py-3 rounded-full shadow-lg animate-fade-in">
            💌 有新留言！
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
          {/* 头部 */}
          <div className="bg-gradient-to-r from-[#ff7675] to-[#ff9f9f] p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">💌</span>
                <div>
                  <h2 className="text-xl font-bold text-white">给当当的留言</h2>
                  <p className="text-white/80 text-sm">共 {messages.length} 条</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setLoggedIn(false);
                  localStorage.removeItem('love_login');
                }}
                className="text-white/80 hover:text-white text-sm"
              >
                退出
              </button>
            </div>
          </div>

          {/* 留言列表 */}
          <div className="p-6 max-h-[500px] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <div className="text-6xl mb-4">📭</div>
                <p>还没有留言，快来给当当写第一条吧！</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className="bg-[#fff8f0] rounded-2xl p-4 relative"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#ff9f9f] to-[#ff7675] rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {msg.sender.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-700">{msg.sender}</span>
                          <span className="text-xs text-gray-400">{formatTime(msg.timestamp)}</span>
                          <button
                            onClick={() => handleDelete(msg.id)}
                            className="ml-auto text-gray-400 hover:text-red-500 text-sm px-2 py-1"
                          >
                            删除
                          </button>
                        </div>
                        <p className="text-gray-600">{msg.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 输入区域 */}
          <div className="border-t border-gray-100 p-4">
            {/* 名字选择 */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-sm text-gray-500">留言署名：</span>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSenderName('麦兜');
                    localStorage.setItem('love_sender_name', '麦兜');
                  }}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    senderName === '麦兜'
                      ? 'bg-gradient-to-r from-[#ff7675] to-[#ff9f9f] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  🐷 麦兜
                </button>
                <button
                  onClick={() => {
                    setSenderName('当当');
                    localStorage.setItem('love_sender_name', '当当');
                  }}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    senderName === '当当'
                      ? 'bg-gradient-to-r from-[#ff7675] to-[#ff9f9f] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  👸 当当
                </button>
              </div>
            </div>
            
            <div className="flex items-end gap-3">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                placeholder="写下你想对当当说的话..."
                rows={2}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-[#ff7675] focus:outline-none resize-none"
              />
              <button
                onClick={handleSend}
                disabled={!newMessage.trim() || sending}
                className="px-6 py-3 bg-gradient-to-r from-[#ff7675] to-[#ff9f9f] text-white font-semibold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? '发送中...' : '发送'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}