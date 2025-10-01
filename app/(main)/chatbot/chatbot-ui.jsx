"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Send, Mic } from 'lucide-react';

export default function ChatbotUI() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const { register, handleSubmit, reset } = useForm();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSubmit = async (data) => {
    const userInput = data.message;
    if (!userInput) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { text: userInput, sender: 'user' }]);
    reset();

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response from the chatbot.');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botResponse = '';

      setMessages((prev) => [...prev, { text: '', sender: 'bot' }]);

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        botResponse += chunk;

        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = botResponse;
          return newMessages;
        });
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: 'Sorry, something went wrong.', sender: 'bot' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 via-indigo-100 to-pink-100 rounded-lg shadow-2xl overflow-hidden border border-gray-200">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 flex items-center justify-between mt-20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
            M
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Medico Friend</h1>
            <p className="text-sm text-green-500 font-semibold">Online</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && (
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
            )}
            <div
              className={`p-4 rounded-2xl max-w-lg shadow-md relative ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
              {msg.text}
              {msg.sender === 'bot' && (
                <button onClick={() => speak(msg.text)} className="absolute -bottom-3 -right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition">
                  <Mic className="w-4 h-4 text-blue-500" />
                </button>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white/80 backdrop-blur-md border-t border-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-3">
          <input
            {...register('message')}
            type="text"
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="p-3 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-full disabled:from-blue-300 disabled:to-pink-300 transition shadow-lg hover:scale-105"
            disabled={isLoading}>
            {isLoading ? <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin"></div> : <Send className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </div>
  );
}