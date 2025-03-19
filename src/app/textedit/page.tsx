'use client';

import { useEffect, useRef, useState } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, lineNumbers } from '@codemirror/view';
import { basicSetup } from '@codemirror/basic-setup';
import './styles.css';

export default function TextEditPage() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorView, setEditorView] = useState<EditorView | null>(null);
  
  useEffect(() => {
    if (editorRef.current) {
      const startState = EditorState.create({
        extensions: [
          basicSetup,
          lineNumbers(),
          EditorView.lineWrapping,
        ],
      });

      const view = new EditorView({
        state: startState,
        parent: editorRef.current,
      });

      setEditorView(view);

      return () => {
        view.destroy();
      };
    }
  }, []);

  const handleCopy = () => {
    if (editorView) {
      const content = editorView.state.doc.toString();
      navigator.clipboard.writeText(content)
        .then(() => {
          alert('テキストがコピーされました');
        })
        .catch(err => {
          console.error('コピーに失敗しました:', err);
        });
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">リッチテキストエディタ</h1>
      <div className="flex flex-col flex-grow border border-gray-300 rounded-md">
        <div className="flex-grow" ref={editorRef}></div>
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
