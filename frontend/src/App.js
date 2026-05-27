import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { Toaster } from 'sonner';

function App() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: '#0f1219',
      overflow: 'hidden',
    }}>
      <PipelineToolbar />
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <PipelineUI />
      </div>
      <SubmitButton />
      <Toaster richColors position="top-right" closeButton />
    </div>
  );
}

export default App;
