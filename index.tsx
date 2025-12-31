
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

console.log("System: Starting initialization...");

const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("System: App successfully mounted to DOM.");
  } catch (err) {
    console.error("System: Render failed:", err);
    rootElement.innerHTML = `
      <div style="color:#fda4af; padding:20px; font-family:serif; text-align:center;">
        <p>抱歉，星光在加载时遇到了一点问题</p>
        <small style="opacity:0.5;">${err.message}</small>
      </div>
    `;
  }
} else {
  console.error("System Error: Root element '#root' was not found in the HTML.");
}
