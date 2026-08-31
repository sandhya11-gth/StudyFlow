import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { StudyFlowProvider } from './context/StudyFlowContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode><StudyFlowProvider><App /></StudyFlowProvider></StrictMode>,
);