// transformNode.js — Data transformation / JSON path / regex
import { useState } from 'react';
import { Settings } from 'lucide-react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './baseNode';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'jsonpath');
  const [expression, setExpression] = useState(data?.expression || '$.data');

  const placeholders = {
    jsonpath: '$.results[0].name',
    regex: '^[a-z]+$',
    replace: 'old -> new',
    uppercase: '',
    trim: '',
  };

  return (
    <BaseNode
      id={id}
      title="Transform"
      icon={<Settings size={14} strokeWidth={2} />}
      category="transform"
      accentColor="#f97316"
      inputs={[{ id: 'input', label: '' }]}
      outputs={[{ id: 'output', label: '' }, { id: 'error', label: '' }]}
    >
      <NodeField label="Transform Type">
        <NodeSelect
          value={transformType}
          onChange={e => setTransformType(e.target.value)}
          options={[
            { value: 'jsonpath', label: 'JSON Path' },
            { value: 'regex', label: 'Regex Extract' },
            { value: 'replace', label: 'Find & Replace' },
            { value: 'uppercase', label: 'Uppercase' },
            { value: 'trim', label: 'Trim Whitespace' },
          ]}
        />
      </NodeField>
      {!['uppercase', 'trim'].includes(transformType) && (
        <NodeField label="Expression">
          <NodeInput
            value={expression}
            onChange={e => setExpression(e.target.value)}
            placeholder={placeholders[transformType]}
          />
        </NodeField>
      )}
    </BaseNode>
  );
};
