// inputNode.js
import { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './baseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      icon={<ArrowDown size={14} strokeWidth={2} />}
      category="input"
      accentColor="#10b981"
      outputs={[{ id: 'value', label: '' }]}
    >
      <NodeField label="Name">
        <NodeInput value={currName} onChange={e => setCurrName(e.target.value)} placeholder="input_name" />
      </NodeField>
      <NodeField label="Type">
        <NodeSelect
          value={inputType}
          onChange={e => setInputType(e.target.value)}
          options={[{ value: 'Text', label: 'Text' }, { value: 'File', label: 'File' }]}
        />
      </NodeField>
    </BaseNode>
  );
};
