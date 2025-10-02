'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState } from 'react';

export default function Chat() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
  });
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && status === 'ready') {
      sendMessage({ text: input });
      setInput('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <h2>👋 Привет!</h2>
            <p>Задайте мне любой вопрос, и я постараюсь помочь</p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
          >
            <div className="message-role">
              {message.role === 'user' ? '👤 Вы' : '🤖 AI'}
            </div>
            <div className="message-content">
              {message.parts.map((part, index) =>
                part.type === 'text' ? <span key={index}>{part.text}</span> : null
              )}
            </div>
          </div>
        ))}

        {status === 'streaming' && (
          <div className="message assistant-message loading">
            <div className="message-role">🤖 AI</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Напишите ваш вопрос..."
          disabled={status !== 'ready'}
          className="message-input"
        />
        <button type="submit" disabled={status !== 'ready' || !input.trim()} className="send-button">
          Отправить
        </button>
      </form>
    </div>
  );
}
