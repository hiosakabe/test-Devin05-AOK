'use client';

import React, { useState } from 'react';
import './styles.css';

export default function TextEditPage() {
  const [text, setText] = useState<string>('');
  const lines = text.split('\n');
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('テキストがコピーされました');
      })
      .catch(err => {
        console.error('コピーに失敗しました:', err);
      });
  };

  return (
    <div className="flex flex-col min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">リッチテキストエディタ</h1>
      <div className="flex flex-row flex-grow border border-gray-300 rounded-md overflow-hidden">
        <div className="line-numbers bg-gray-100 py-2 px-2 text-right text-gray-500 select-none">
          {lines.map((_, i) => (
            <div key={i} className="line-number">
              {i + 1}
            </div>
          ))}
        </div>
        <textarea
          className="flex-grow p-2 outline-none resize-none font-mono"
          value={text}
          onChange={handleTextChange}
          placeholder="ここにテキストを入力してください..."
        />
      </div>
      <div className="mt-4">
        <button 
          onClick={handleCopy}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          コピー
        </button>
      </div>
    </div>
  );
}
