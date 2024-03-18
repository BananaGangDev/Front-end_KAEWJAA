import React from 'react'
import ReactDOM from 'react-dom/client'
import LoginForm from '/src/pages/LoginForm.jsx';
import ResetPassword from '/src/pages/ResetPassword.jsx';
import ImportDefault from '/src/pages/ImportDefault.jsx';
import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Concordance from "./pages/Concordance";
import './style/main.css';

import DocumentPage from './pages/DocumentPage';
import TagsetPage from './pages/TagsetPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginForm />} />
          <Route path="/document" element={<DocumentPage />} />
          <Route path="tagset" element={<TagsetPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/import" element={<ImportDefault />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/concordance" element={<Concordance />} />

          <Route path="*" element={<> not found</>} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  


)
  