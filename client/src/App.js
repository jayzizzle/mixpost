import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Register from './components/session/Register';
import Login from './components/session/Login';
import { Dashboard } from './components/dashboard/Dashboard';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' exact element={<Register />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/dashboard' exact element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
