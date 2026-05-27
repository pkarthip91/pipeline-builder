// ui.js — Pipeline canvas
import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { ApiNode } from './nodes/apiNode';
import { ConditionNode } from './nodes/conditionNode';
import { MergeNode } from './nodes/mergeNode';
import { NoteNode } from './nodes/noteNode';
import { TransformNode } from './nodes/transformNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput:  InputNode,
  llm:          LLMNode,
  customOutput: OutputNode,
  text:         TextNode,
  api:          ApiNode,
  condition:    ConditionNode,
  merge:        MergeNode,
  note:         NoteNode,
  transform:    TransformNode,
};

export const PipelineUI = ({ theme }) => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const nodes = useStore((state) => state.nodes, shallow);
  const edges = useStore((state) => state.edges, shallow);
  const getNodeID = useStore((state) => state.getNodeID);
  const addNode = useStore((state) => state.addNode);
  const onNodesChange = useStore((state) => state.onNodesChange);
  const onEdgesChange = useStore((state) => state.onEdgesChange);
  const onConnect = useStore((state) => state.onConnect);

  const getInitNodeData = (nodeID, type) => ({ id: nodeID, nodeType: type });

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    if (event?.dataTransfer?.getData('application/reactflow')) {
      const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
      const type = appData?.nodeType;
      if (!type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const nodeID = getNodeID(type);
      addNode({ id: nodeID, type, position, data: getInitNodeData(nodeID, type) });
    }
  }, [reactFlowInstance, addNode, getNodeID]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div ref={reactFlowWrapper} style={{ width: '100%', height: '75vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        fitView
      >
        <Background
          variant="dots"
          gap={gridSize}
          size={1}
          color={theme === 'dark' ? 'rgba(226,232,240,0.08)' : 'rgba(15,23,42,0.08)'}
        />
        <Controls style={{
          background: 'var(--control-bg)',
          border: '1px solid var(--control-border)',
          borderRadius: 8,
        }} />
        <MiniMap
          style={{
            background: theme === 'dark' ? '#161927' : '#f8fafc',
            border: '1px solid var(--panel-border)',
          }}
          nodeColor={() => (theme === 'dark' ? '#213052' : '#bcbaba')}
          maskColor={theme === 'dark' ? 'rgba(0,0,0,0.15)' : 'rgba(15,23,42,0.08)'}
        />
      </ReactFlow>
    </div>
  );
};
