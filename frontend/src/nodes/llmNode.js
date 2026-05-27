// llmNode.js
import { useState } from 'react';
import { Brain } from 'lucide-react';
import { BaseNode, NodeField, NodeSelect } from './baseNode';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'gpt-4o');

  return (
    <BaseNode
      id={id}
      title="LLM"
      icon={<Brain size={14} strokeWidth={2} />}
      category="model"
      accentColor="#8b5cf6"
      inputs={[
        { id: 'system', label: '' },
        { id: 'prompt', label: '' },
      ]}
      outputs={[{ id: 'response', label: '' }]}
    >
      <NodeField label="Model">
        <NodeSelect
          value={model}
          onChange={e => setModel(e.target.value)}
          options={[
            { value: 'gpt-4o', label: 'GPT-4o' },
            { value: 'gpt-4-turbo', label: 'GPT-4 Turbo' },
            { value: 'claude-3-opus', label: 'Claude 3 Opus' },
            { value: 'claude-sonnet', label: 'Claude Sonnet' },
            { value: 'gemini-pro', label: 'Gemini Pro' },
          ]}
        />
      </NodeField>
    </BaseNode>
  );
};
