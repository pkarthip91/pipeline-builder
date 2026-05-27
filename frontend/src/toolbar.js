// toolbar.js
import { ArrowDown, ArrowUp, Brain, FileText, GitBranch, Globe, Link2, Menu, Moon, Pin, Settings, Sun, Zap, X } from 'lucide-react';
import { DraggableNode } from './draggableNode';

const nodeGroups = [
  {
    group: 'I/O',
    nodes: [
      { type: 'customInput', label: 'Input',  icon: <ArrowDown size={13} strokeWidth={2} />, color: '#10b981' },
      { type: 'customOutput', label: 'Output', icon: <ArrowUp size={13} strokeWidth={2} />, color: '#f59e0b' },
    ],
  },
  {
    group: 'AI',
    nodes: [
      { type: 'llm', label: 'LLM', icon: <Brain size={13} strokeWidth={2} />, color: '#8b5cf6' },
    ],
  },
  {
    group: 'Transform',
    nodes: [
      { type: 'text',      label: 'Text',      icon: <FileText size={13} strokeWidth={2} />, color: '#3b82f6' },
      { type: 'transform', label: 'Transform', icon: <Settings size={13} strokeWidth={2} />, color: '#f97316' },
      { type: 'merge',     label: 'Merge',     icon: <Link2 size={13} strokeWidth={2} />, color: '#3b82f6' },
    ],
  },
  {
    group: 'Logic',
    nodes: [
      { type: 'condition', label: 'Condition', icon: <GitBranch size={13} strokeWidth={2} />, color: '#ec4899' },
    ],
  },
  {
    group: 'Data',
    nodes: [
      { type: 'api', label: 'API Request', icon: <Globe size={13} strokeWidth={2} />, color: '#06b6d4' },
    ],
  },
  {
    group: 'Utility',
    nodes: [
      { type: 'note', label: 'Note', icon: <Pin size={13} strokeWidth={2} />, color: '#fbbf24' },
    ],
  },
];

export const ToolbarSidebar = ({ open, onClose }) => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: open ? 320 : 0,
      background: 'var(--panel-bg)',
      borderLeft: '1px solid var(--panel-border)',
      boxShadow: 'rgba(15, 23, 42, 0.16) 0px 4px 24px',
      overflow: 'hidden',
      transition: 'width 0.25s ease',
      zIndex: 20,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 18px 8px' }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--muted)' }}>Toolbar</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text)', marginTop: 4 }}>Node Palette</div>
        </div>
        <button
          type="button"
          onClick={onClose}
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            border: '1px solid var(--panel-border)',
            background: 'var(--muted-bg)',
            color: 'var(--text)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          aria-label="Close node palette"
        >
          <X size={18} strokeWidth={2} />
        </button>
      </div>
      <div style={{ padding: '0 18px 18px', overflowY: 'auto', height: 'calc(100% - 72px)' }}>
        {nodeGroups.map((group) => (
          <div key={group.group} style={{ marginBottom: 20 }}>
            <div style={{
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: 10,
            }}>
              {group.group}
            </div>
            <div style={{ display: 'grid', gap: 10 }}>
              {group.nodes.map((node) => (
                <DraggableNode
                  key={node.type}
                  type={node.type}
                  label={node.label}
                  icon={node.icon}
                  color={node.color}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PipelineToolbar = ({ theme, toggleTheme, toggleSidebar }) => {
  return (
    <div style={{
      background: 'var(--panel-bg)',
      borderBottom: '1px solid var(--panel-border-soft)',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      flexWrap: 'wrap',
    }}>
      {/* Logo */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 12px rgba(99,102,241,0.4)',
        }}>
          <Zap size={14} color="#ffffff" strokeWidth={2.2} />
        </div>
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 800, fontSize: 15, color: 'var(--text)',
          letterSpacing: '-0.02em',
        }}>
          Vector<span style={{ color: '#6366f1' }}>Shift</span>
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
        {nodeGroups.map(group => (
          <div key={group.group} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontSize: '9px', color: 'var(--muted)',
              textTransform: 'uppercase', letterSpacing: '0.1em',
              fontFamily: "'DM Sans', sans-serif", fontWeight: 600,
              whiteSpace: 'nowrap',
            }}>
              {group.group}
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              {group.nodes.map(n => (
                <DraggableNode key={n.type} type={n.type} label={n.label} icon={n.icon} color={n.color} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          type="button"
          onClick={toggleSidebar}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: 12,
            border: '1px solid var(--panel-border)',
            background: 'var(--muted-bg)',
            color: 'var(--text)',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, background 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          aria-label="Open node palette"
          title="Open node palette"
        >
          <Menu size={16} strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={toggleTheme}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            padding: '8px 12px',
            borderRadius: 999,
            border: '1px solid var(--panel-border)',
            background: 'var(--muted-bg)',
            color: 'var(--text)',
            fontSize: '11px',
            fontWeight: 700,
            cursor: 'pointer',
            transition: 'transform 0.2s ease, background 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={14} strokeWidth={2} /> : <Moon size={14} strokeWidth={2} />}
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
      </div>
    </div>
  );
};
