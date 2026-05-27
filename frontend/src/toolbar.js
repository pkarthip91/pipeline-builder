// toolbar.js
import { ArrowDown, ArrowUp, Brain, FileText, GitBranch, Globe, Link2, Pin, Settings, Zap } from 'lucide-react';
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

export const PipelineToolbar = () => {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #0f1219 0%, #111827 100%)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      flexWrap: 'wrap',
    }}>
      {/* Logo */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        marginRight: 12,
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
          fontWeight: 800, fontSize: 15, color: '#e2e8f0',
          letterSpacing: '-0.02em',
        }}>
          Vector<span style={{ color: '#6366f1' }}>Shift</span>
        </span>
      </div>

      <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.08)' }} />

      {nodeGroups.map(group => (
        <div key={group.group} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: '9px', color: 'rgba(255,255,255,0.25)',
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
  );
};
