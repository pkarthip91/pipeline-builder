// apiNode.js — HTTP API caller node
import { useState } from 'react';
import { Globe } from 'lucide-react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './baseNode';

export const ApiNode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode
      id={id}
      title="API Request"
      icon={<Globe size={14} strokeWidth={2} />}
      category="data"
      accentColor="#06b6d4"
      inputs={[{ id: 'body', label: 'body' }, { id: 'headers', label: '' }]}
      outputs={[{ id: 'response', label: 'response' }, { id: 'status', label: '' }]}
    >
      <NodeField label="Method">
        <NodeSelect
          value={method}
          onChange={e => setMethod(e.target.value)}
          options={['GET','POST','PUT','PATCH','DELETE'].map(m => ({ value: m, label: m }))}
        />
      </NodeField>
      <NodeField label="URL">
        <NodeInput value={url} onChange={e => setUrl(e.target.value)} placeholder="https://..." />
      </NodeField>
    </BaseNode>
  );
};
