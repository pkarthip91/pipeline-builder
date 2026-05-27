// baseNode.js - Core node abstraction for all pipeline nodes

import { Handle, Position } from 'reactflow';
import { X } from 'lucide-react';
import { useStore } from '../store';

/**
 * BaseNode abstraction
 * 
 * @param {string} id - Node ID
 * @param {string} title - Display title of the node
 * @param {ReactNode} icon - Icon element
 * @param {string} category - Category label ('input', 'output', 'transform', 'model', etc.)
 * @param {Array} inputs  - Array of { id, label, style? } for target handles (left side)
 * @param {Array} outputs - Array of { id, label, style? } for source handles (right side)
 * @param {ReactNode} children - Body content (fields, labels, etc.)
 * @param {string} accentColor - CSS color for the node's left accent bar
 * @param {Object} style - Extra styles to merge into wrapper
 */
export const BaseNode = ({
  id,
  title,
  icon,
  category,
  inputs = [],
  outputs = [],
  children,
  accentColor = '#6366f1',
  style = {},
}) => {
  const categoryColors = {
    input:     '#10b981',
    output:    '#f59e0b',
    model:     '#8b5cf6',
    transform: '#3b82f6',
    logic:     '#ec4899',
    data:      '#06b6d4',
    custom:    '#f97316',
  };

  const color = accentColor || categoryColors[category] || '#6366f1';
  const removeNode = useStore((state) => state.removeNode);

  return (
    <div
      style={{
        minWidth: 220,
        background: 'var(--node-bg)',
        border: '1px solid var(--panel-border)',
        borderLeft: `3px solid ${color}`,
        borderRadius: '10px',
        boxShadow: `0 4px 24px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)`,
        fontFamily: "'DM Sans', sans-serif",
        color: 'var(--text)',
        position: 'relative',
        overflow: 'visible',
        ...style,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 14px 8px',
          borderBottom: '1px solid var(--panel-border-soft)',
        }}
      >
        {icon && (
          <span style={{ lineHeight: 0, display: 'inline-flex', color }}>
            {icon}
          </span>
        )}
        <span
          style={{
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            color: color,
            flex: 1,
          }}
        >
          {title}
        </span>
        {category && (
          <span
            style={{
              fontSize: '9px',
              padding: '2px 6px',
              borderRadius: '4px',
              background: `${color}22`,
              color: color,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            {category}
          </span>
        )}
        <button
          type="button"
          onClick={() => removeNode(id)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 16,
            height: 16,
            border: 'none',
            borderRadius: 4,
            background: 'transparent',
            color: 'var(--muted)',
            cursor: 'pointer',
            transition: 'color 0.2s, background 0.2s',
          }}
          title="Remove node"
          aria-label="Remove node"
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(148,163,184,0.12)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <X size={10} strokeWidth={2} />
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: '10px 14px 12px' }}>
        {children}
      </div>

      {/* Input Handles (left) */}
      {inputs.map((input, i) => {
        const inputText = input.label ?? input.id;
        const topPct = inputs.length === 1
          ? 50
          : 20 + (i * 60) / (inputs.length - 1);
        return (
          <div key={input.id}>
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${input.id}`}
              style={{
                top: `${topPct}%`,
                background: color,
                border: '2px solid #1e2235',
                width: 10,
                height: 10,
                borderRadius: '50%',
                ...input.style,
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: 14,
                top: `calc(${topPct}% - 7px)`,
                fontSize: '9px',
                color: 'var(--muted)',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              {inputText}
            </span>
          </div>
        );
      })}

      {/* Output Handles (right) */}
      {outputs.map((output, i) => {
        const outputText = output.label ?? output.id;
        const topPct = outputs.length === 1
          ? 50
          : 20 + (i * 60) / (outputs.length - 1);
        return (
          <div key={output.id}>
            <Handle
              type="source"
              position={Position.Right}
              id={`${id}-${output.id}`}
              style={{
                top: `${topPct}%`,
                background: color,
                border: '2px solid #1e2235',
                width: 10,
                height: 10,
                borderRadius: '50%',
                ...output.style,
              }}
            />
            <span
              style={{
                position: 'absolute',
                right: 14,
                top: `calc(${topPct}% - 7px)`,
                fontSize: '9px',
                color: 'var(--muted)',
                pointerEvents: 'none',
                userSelect: 'none',
                textAlign: 'right',
              }}
            >
              {outputText}
            </span>
          </div>
        );
      })}
    </div>
  );
};

// ─── Shared styled primitives ───────────────────────────────────────────

export const NodeLabel = ({ children }) => (
  <label
    style={{
      display: 'block',
      fontSize: '10px',
      fontWeight: 600,
      color: 'var(--muted)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      marginBottom: '4px',
    }}
  >
    {children}
  </label>
);

export const NodeInput = ({ value, onChange, placeholder, type = 'text', style = {} }) => (
  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    style={{
      width: '100%',
      background: 'var(--input-bg)',
      border: '1px solid var(--input-border)',
      borderRadius: '6px',
      padding: '5px 8px',
      fontSize: '12px',
      color: 'var(--text)',
      outline: 'none',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s',
      ...style,
    }}
    onFocus={e => e.target.style.borderColor = 'rgba(99,102,241,0.6)'}
    onBlur={e => e.target.style.borderColor = 'var(--input-border)'}
  />
);

export const NodeSelect = ({ value, onChange, options = [], style = {} }) => (
  <select
    value={value}
    onChange={onChange}
    style={{
      width: '100%',
      background: 'var(--input-bg)',
      border: '1px solid var(--input-border)',
      borderRadius: '6px',
      padding: '5px 8px',
      fontSize: '12px',
      color: 'var(--text)',
      outline: 'none',
      boxSizing: 'border-box',
      cursor: 'pointer',
      ...style,
    }}
  >
    {options.map(opt => (
      <option key={opt.value} value={opt.value} style={{ background: 'var(--panel-bg)' }}>
        {opt.label}
      </option>
    ))}
  </select>
);

export const NodeField = ({ label, children }) => (
  <div style={{ marginBottom: '8px' }}>
    {label && <NodeLabel>{label}</NodeLabel>}
    {children}
  </div>
);
