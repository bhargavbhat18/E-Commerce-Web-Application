import { useState } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import apiClient from '../api/apiClient';

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am your AI Shopping Assistant. How can I help you find the perfect product today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setLoading(true);

    try {
      const response = await apiClient.post('/ai/chat', {
        message: userMessage,
        userId: 1, // Mock user ID
        sessionId: 'session-123'
      });
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.data }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I am having trouble connecting right now.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-2xl shadow-2xl w-80 h-[500px] flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <Bot className="w-6 h-6" />
              <h3 className="font-semibold">AI Assistant</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {messages.map((m, i) => (
              <div key={i} className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.role === 'user' ? 'bg-blue-500 text-white self-end rounded-br-sm shadow-sm' : 'bg-white text-gray-800 self-start rounded-bl-sm shadow-sm border border-gray-100'}`}>
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="bg-white text-gray-800 self-start p-3 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 max-w-[85%]">
                <div className="flex gap-1 items-center h-5">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}} />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form onSubmit={sendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button type="submit" disabled={loading} className="bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors disabled:opacity-50">
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all animate-bounce"
        >
          <MessageSquare className="w-7 h-7" />
        </button>
      )}
    </div>
  );
}
