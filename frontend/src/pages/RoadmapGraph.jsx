import React from 'react';
import ReactFlow, { Background, Controls } from 'react-flow-renderer';

const RoadmapGraph = ({ roadmap }) => {
  // Parse the roadmap into stages
  const stages = roadmap.split('\n'); // Assuming each stage is separated by a newline in the roadmap text
  const elements = stages.map((stage, index) => ({
    id: `${index + 1}`,
    data: { label: stage },
    position: { x: 0, y: 100 * index },
  }));

  // Create edges between nodes (you can modify this logic to fit your roadmap structure)
  const edges = stages.map((_, index) => {
    if (index < stages.length - 1) {
      return { id: `e${index}-${index + 1}`, source: `${index + 1}`, target: `${index + 2}`, animated: true };
    }
    return null;
  }).filter(Boolean);

  return (
    <div style={{ height: 500 }}>
      <ReactFlow elements={[...elements, ...edges]}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};
export default RoadmapGraph;
