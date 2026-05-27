import { useState, useEffect } from 'react';
import { PipelineToolbar, ToolbarSidebar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { Toaster } from 'sonner';

function App() {
  const [theme, setTheme] = useState('dark');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  const toggleSidebar = () => setSidebarOpen((open) => !open);
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      background: 'var(--bg)',
      color: 'var(--text)',
      overflow: 'hidden',
    }}>
      <PipelineToolbar theme={theme} toggleTheme={toggleTheme} toggleSidebar={toggleSidebar} />
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <PipelineUI theme={theme} />
        <ToolbarSidebar open={sidebarOpen} onClose={closeSidebar} />
      </div>
      <SubmitButton />
      <Toaster richColors position="top-right" closeButton />
    </div>
  );
}

export default App;
