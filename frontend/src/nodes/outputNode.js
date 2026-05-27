// outputNode.js
import { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      icon={<ArrowUp size={14} strokeWidth={2} />}
      category="output"
      accentColor="#f59e0b"
      inputs={[{ id: 'value', label: '' }]}
    >
      <NodeField label="Name">
        <NodeInput value={currName} onChange={e => setCurrName(e.target.value)} placeholder="output_name" />
      </NodeField>
      <NodeField label="Type">
        <NodeSelect
          value={outputType}
          onChange={e => setOutputType(e.target.value)}
          options={[{ value: 'Text', label: 'Text' }, { value: 'Image', label: 'Image' }]}
        />
      </NodeField>
    </BaseNode>
  );
};
