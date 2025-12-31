
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("App mounted successfully.");
  } catch (err) {
    console.error("Failed to mount React App:", err);
    rootElement.innerHTML = `<div style="color:red; padding:20px;">Mount Error: ${err.message}</div>`;
  }
} else {
  console.error("Critical: Root element not found.");
}
