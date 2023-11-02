// src/routes/AppRouter.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PLP from '../pages/PLP';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/plp" element={<PLP />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
