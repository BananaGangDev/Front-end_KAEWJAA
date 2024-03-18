import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Document from "./pages/Document";
import Tagset from "./pages/Tagset";
import Logout from "./pages/Logout";
import Concordance from "./pages/Concordance";
import './style/main.css';

import DocumentPage from './pages/DocumentPage';
import TagsetPage from './pages/TagsetPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<DocumentPage />} />
          <Route path="tagset" element={<TagsetPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/concordance" element={<Concordance />} />
          <Route path="/logout" element={<Logout />} />

          <Route path="*" element={<> not found</>} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  


)
  