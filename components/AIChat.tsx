
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getAIRecommendation } from '../services/gemini';
import { ChatMessage } from '../types';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'NEXUS-AI ONLINE. HOW CAN I ASSIST YOUR SETUP UPGRADE?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const response = await getAIRecommendation(userMsg);
    setMessages(prev => [...prev, { role: 'model', text: response.toUpperCase() }]);
    setIsTyping(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-24 right-4 md:right-8 w-[350px] md:w-[400px] h-[500px] bg-black/80 backdrop-blur-xl border border-blue-500/30 rounded-lg shadow-2xl flex flex-col overflow-hidden z-50 font-mono"
        >
          {/* Header */}
          <div className="p-3 bg-blue-900/20 border-b border-blue-500/20 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-bold text-blue-400">CORE_ASSISTANT v2.4</span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded text-xs leading-relaxed ${
                  msg.role === 'user' 
                  ? 'bg-blue-600/20 border border-blue-500/40 text-blue-100' 
                  : 'bg-gray-800/40 border border-gray-700 text-gray-300'
                }`}>
                  <span className="block opacity-40 mb-1">{msg.role === 'user' ? 'USER >' : 'NEXUS >'}</span>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-blue-400 text-[10px] animate-pulse">PROCESSING_QUERY...</div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-gray-900/40 border-t border-blue-500/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Query system..."
                className="flex-1 bg-transparent border-none outline-none text-xs text-blue-300 placeholder-blue-900"
              />
              <button 
                onClick={handleSend}
                className="px-3 py-1 bg-blue-600 text-[10px] font-bold rounded hover:bg-blue-500 transition-colors"
              >
                EXEC
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
