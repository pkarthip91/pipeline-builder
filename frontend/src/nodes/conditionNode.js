// conditionNode.js — Conditional branching
import { useState } from 'react';
import { GitBranch } from 'lucide-react';
import { BaseNode, NodeField, NodeInput, NodeSelect } from './baseNode';

export const ConditionNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || 'equals');
  const [compareVal, setCompareVal] = useState(data?.compareVal || '');

  return (
    <BaseNode
      id={id}
      title="Condition"
      icon={<GitBranch size={14} strokeWidth={2} />}
      category="logic"
      accentColor="#ec4899"
      inputs={[{ id: 'value', label: '' }]}
      outputs={[{ id: 'true', label: '' }, { id: 'false', label: '' }]}
    >
      <NodeField label="Operator">
        <NodeSelect
          value={operator}
          onChange={e => setOperator(e.target.value)}
          options={[
            { value: 'equals', label: 'Equals' },
            { value: 'contains', label: 'Contains' },
            { value: 'greater', label: 'Greater than' },
            { value: 'less', label: 'Less than' },
            { value: 'not_empty', label: 'Not empty' },
          ]}
        />
      </NodeField>
      <NodeField label="Compare Value">
        <NodeInput value={compareVal} onChange={e => setCompareVal(e.target.value)} placeholder="value..." />
      </NodeField>
    </BaseNode>
  );
};
