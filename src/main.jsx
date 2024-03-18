import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
// import './styles/main.css';

import LoginForm from '/src/pages/LoginForm.jsx';
import ResetPassword from '/src/pages/ResetPassword.jsx';
import ImportDefault from '/src/pages/ImportDefault.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/import" element={<ImportDefault />} />

        <Route path="*" element={<> not found</>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
