## Project Overview

The app is a visual pipeline builder using React + ReactFlow on the frontend and FastAPI on the backend.

Users can:
- drag and drop pipeline nodes
- connect nodes with edges
- remove nodes
- toggle dark/light theme
- open a sidebar node palette
- submit the pipeline to the backend
- receive DAG analysis results via toast notifications

## Folder Structure

- `frontend/`
  - `src/`
    - `App.js` — root app and theme/sidebar state
    - `ui.js` — ReactFlow pipeline canvas, drag/drop, background, controls, minimap
    - `toolbar.js` — top toolbar, node palette groups, sidebar toggle
    - `submit.js` — backend submission and toast feedback
    - `store.js` — Zustand node/edge state management
    - `nodes/` — reusable node abstraction and concrete node definitions
    - `index.css` — theme variables and ReactFlow styling
- `backend/`
  - `main.py` — FastAPI backend with pipeline parse endpoint

## Key Features

### Node Abstraction
- `frontend/src/nodes/baseNode.js` provides a shared node wrapper
- node visuals, layout, handle placement, and remove action are centralized
- concrete nodes reuse `BaseNode` with different icons, labels, and handles

### Styling
- theme-aware dark/light mode with CSS variables
- polished top toolbar and sidebar
- consistent node and palette styling
- ReactFlow UI enhancements:
  - dotted background grid
  - themed controls
  - MiniMap color adjustment

### Text Node Logic
- The current code includes a text node built from the shared abstraction
- Dynamic resizing and variable-handle parsing can be added next

### Backend Integration
- `frontend/src/submit.js` sends `{ nodes, edges }` to:
  - `http://localhost:8000/pipelines/parse`
- `backend/main.py` returns:
  - `num_nodes`
  - `num_edges`
  - `is_dag`
- DAG detection implemented using Kahn’s algorithm

## Installation

### Frontend
```bash
cd frontend
npm install
npm start
