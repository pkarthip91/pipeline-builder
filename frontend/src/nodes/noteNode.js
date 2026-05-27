// noteNode.js — Sticky note/comment node (no handles)
import { useState } from 'react';
import { Pin } from 'lucide-react';

export const NoteNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || 'Add a note...');

  return (
    <div style={{
      minWidth: 180,
      maxWidth: 280,
      background: 'linear-gradient(135deg, #fef9c3 0%, #fef08a 100%)',
      border: '1px solid #fde047',
      borderRadius: '6px',
      padding: '10px 12px',
      boxShadow: '2px 4px 12px rgba(0,0,0,0.25)',
      fontFamily: "'DM Sans', sans-serif",
      transform: 'rotate(-1deg)',
    }}>
      <div style={{
        fontSize: '10px', fontWeight: 700, color: '#713f12',
        textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6,
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <Pin size={12} strokeWidth={2} /> Note
      </div>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        rows={3}
        style={{
          width: '100%', background: 'transparent', border: 'none',
          outline: 'none', resize: 'none', fontSize: '12px',
          color: '#422006', fontFamily: 'inherit', lineHeight: 1.5,
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
};
