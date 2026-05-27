// mergeNode.js — Merge/combine multiple inputs
import { useState } from 'react';
import { Link2 } from 'lucide-react';
import { BaseNode, NodeField, NodeSelect } from './baseNode';

export const MergeNode = ({ id, data }) => {
  const [strategy, setStrategy] = useState(data?.strategy || 'concat');

  return (
    <BaseNode
      id={id}
      title="Merge"
      icon={<Link2 size={14} strokeWidth={2} />}
      category="transform"
      accentColor="#3b82f6"
      inputs={[
        { id: 'input1', label: '' },
        { id: 'input2', label: '' },
        { id: 'input3', label: '' },
      ]}
      outputs={[{ id: 'merged', label: '' }]}
    >
      <NodeField label="Strategy">
        <NodeSelect
          value={strategy}
          onChange={e => setStrategy(e.target.value)}
          options={[
            { value: 'concat', label: 'Concatenate' },
            { value: 'json', label: 'JSON Object' },
            { value: 'array', label: 'Array' },
            { value: 'template', label: 'Template' },
          ]}
        />
      </NodeField>
      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>
        Combine up to 3 inputs into one
      </div>
    </BaseNode>
  );
};
