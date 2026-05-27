// textNode.js  — Part 3: dynamic resize + variable handles
import { useState, useEffect, useRef } from 'react';
import { FileText } from 'lucide-react';
import { Handle, Position } from 'reactflow';

const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const extractVariables = (text) => {
  const vars = [];
  const seen = new Set();
  let match;
  const re = new RegExp(VAR_REGEX.source, 'g');
  while ((match = re.exec(text)) !== null) {
    if (!seen.has(match[1])) {
      seen.add(match[1]);
      vars.push(match[1]);
    }
  }
  return vars;
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [size, setSize] = useState({ width: 220, height: 120 });
  const textareaRef = useRef(null);

  const variables = extractVariables(currText);

  // Auto-resize textarea
  useEffect(() => {
    if (!textareaRef.current) return;
    const el = textareaRef.current;
    el.style.height = 'auto';
    const scrollH = el.scrollHeight;
    const newHeight = Math.max(60, scrollH);
    const lineWidth = Math.max(220, Math.min(450, currText.split('\n').reduce((max, l) => Math.max(max, l.length * 8), 0) + 40));
    setSize({ width: lineWidth, height: newHeight + 90 });
  }, [currText]);

  const color = '#3b82f6';

  return (
    <div
      style={{
        width: size.width,
        minHeight: size.height,
        background: 'var(--node-bg)',
        border: '1px solid var(--panel-border)',
        borderLeft: `3px solid ${color}`,
        borderRadius: '10px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
        fontFamily: "'DM Sans', sans-serif",
        color: 'var(--text)',
        position: 'relative',
        transition: 'width 0.15s ease, min-height 0.15s ease',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '10px 14px 8px',
        borderBottom: '1px solid var(--panel-border-soft)',
      }}>
        <span style={{ lineHeight: 0, display: 'inline-flex', color }}>
          <FileText size={14} strokeWidth={2} />
        </span>
        <span style={{
          fontSize: '12px', fontWeight: 700, letterSpacing: '0.05em',
          textTransform: 'uppercase', color: color, flex: 1,
        }}>Text</span>
        <span style={{
          fontSize: '9px', padding: '2px 6px', borderRadius: '4px',
          background: `${color}22`, color: color,
          fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>transform</span>
      </div>

      {/* Body */}
      <div style={{ padding: '10px 14px 12px' }}>
        <label style={{
          display: 'block', fontSize: '10px', fontWeight: 600,
          color: 'var(--muted)', letterSpacing: '0.06em',
          textTransform: 'uppercase', marginBottom: '4px',
        }}>
          Text Content
        </label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={e => setCurrText(e.target.value)}
          placeholder="Enter text... use {{variable}} to define inputs"
          rows={2}
          style={{
            width: '100%',
            background: 'var(--input-bg)',
            border: '1px solid var(--input-border)',
            borderRadius: '6px',
            padding: '6px 8px',
            fontSize: '12px',
            color: 'var(--text)',
            outline: 'none',
            boxSizing: 'border-box',
            resize: 'none',
            overflow: 'hidden',
            lineHeight: '1.5',
            fontFamily: 'inherit',
          }}
          onFocus={e => e.target.style.borderColor = 'rgba(59,130,246,0.6)'}
          onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
        />
        {variables.length > 0 && (
          <div style={{ marginTop: 6 }}>
            <span style={{ fontSize: '9px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Variables:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 3 }}>
              {variables.map(v => (
                <span key={v} style={{
                  fontSize: '10px', background: 'rgba(59,130,246,0.2)',
                  color: '#93c5fd', borderRadius: 4, padding: '1px 6px',
                  border: '1px solid rgba(59,130,246,0.3)',
                }}>
                  {`{{${v}}}`}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Dynamic variable handles on left */}
      {variables.map((varName, i) => {
        const topPct = variables.length === 1
          ? 50
          : 20 + (i * 60) / Math.max(variables.length - 1, 1);
        return (
          <div key={varName}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${varName}`}
              style={{
                top: `${topPct}%`,
                background: color,
                border: '2px solid #1e2235',
                width: 10, height: 10, borderRadius: '50%',
              }}
            />
            <span style={{
              position: 'absolute',
              left: 14,
              top: `calc(${topPct}% - 7px)`,
              fontSize: '9px', color: 'var(--muted)',
              pointerEvents: 'none', userSelect: 'none',
            }}>
              {varName}
            </span>
          </div>
        );
      })}

      {/* Output handle right */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          top: '50%',
          background: color,
          border: '2px solid #1e2235',
          width: 10, height: 10, borderRadius: '50%',
        }}
      />
    </div>
  );
};
