import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
// import App from './test-app.tsx'

console.log('Main.tsx loading - v2');
const rootElement = document.getElementById('root');
console.log('Root element:', rootElement);

if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<div style="color: red; padding: 20px;">Error: Root element not found</div>';
} else {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
    console.log('React app mounted');
  } catch (error) {
    console.error('Error mounting app:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: sans-serif;">
        <h1 style="color: red;">Error Loading Dashboard</h1>
        <pre style="background: #f0f0f0; padding: 10px; overflow: auto;">${error}</pre>
        <p>Check browser console for details.</p>
      </div>
    `;
  }
}
