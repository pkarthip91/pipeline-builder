// submit.js — Part 4: Backend integration
import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { toast } from 'sonner';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes, shallow);
  const edges = useStore((state) => state.edges, shallow);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();
      setResult(data);

      const dagStatus = data.is_dag ? 'Valid DAG' : 'Not a DAG (contains cycles)';
      const toastTitle = data.is_dag ? 'Pipeline analyzed successfully' : 'Pipeline analyzed with issues';
      const toastMethod = data.is_dag ? toast.success : toast.warning;
      toastMethod(toastTitle, {
        description: `Nodes: ${data.num_nodes} | Edges: ${data.num_edges} | DAG: ${dagStatus}`,
      });
    } catch (err) {
      toast.error('Error connecting to backend', {
        description: `${err.message}. Make sure the backend is running at http://localhost:8000`,
      });
    } finally {
      setLoading(false);
    }
  };

  const nodeCount = nodes.length;
  const edgeCount = edges.length;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      padding: '12px 20px',
      background: 'var(--panel-bg)',
      borderTop: '1px solid var(--panel-border-soft)',
    }}>
      {/* Live counts */}
      <div style={{
        display: 'flex', gap: 12,
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <span style={{
          fontSize: '11px', color: 'var(--muted)',
          background: 'var(--muted-bg)',
          border: '1px solid var(--panel-border)',
          borderRadius: 6, padding: '3px 10px',
        }}>
          {nodeCount} node{nodeCount !== 1 ? 's' : ''}
        </span>
        <span style={{
          fontSize: '11px', color: 'var(--muted)',
          background: 'var(--muted-bg)',
          border: '1px solid var(--panel-border)',
          borderRadius: 6, padding: '3px 10px',
        }}>
          {edgeCount} edge{edgeCount !== 1 ? 's' : ''}
        </span>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || nodeCount === 0}
        style={{
          background: loading ? 'rgba(99,102,241,0.4)' : 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          border: 'none',
          borderRadius: '8px',
          padding: '9px 28px',
          color: '#fff',
          fontSize: '13px',
          fontWeight: 700,
          fontFamily: "'DM Sans', sans-serif",
          cursor: loading || nodeCount === 0 ? 'not-allowed' : 'pointer',
          letterSpacing: '0.02em',
          boxShadow: loading ? 'none' : '0 0 20px rgba(99,102,241,0.35)',
          transition: 'all 0.2s ease',
          opacity: nodeCount === 0 ? 0.5 : 1,
        }}
        onMouseEnter={e => {
          if (!loading && nodeCount > 0) {
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 0 28px rgba(99,102,241,0.5)';
          }
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(99,102,241,0.35)';
        }}
      >
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          {loading ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={14} />}
          {loading ? 'Analyzing...' : 'Submit Pipeline'}
        </span>
      </button>

      {result && (
        <div style={{
          display: 'flex', gap: 10,
          fontFamily: "'DM Sans', sans-serif",
        }}>
          <span style={{
            fontSize: '11px',
            color: result.is_dag ? '#34d399' : '#f87171',
            background: result.is_dag ? 'rgba(52,211,153,0.1)' : 'rgba(248,113,113,0.1)',
            border: `1px solid ${result.is_dag ? 'rgba(52,211,153,0.3)' : 'rgba(248,113,113,0.3)'}`,
            borderRadius: 6, padding: '3px 10px',
            display: 'inline-flex', alignItems: 'center', gap: 6,
          }}>
            {result.is_dag ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
            {result.is_dag ? 'Valid DAG' : 'Cyclic'}
          </span>
        </div>
      )}
    </div>
  );
};
