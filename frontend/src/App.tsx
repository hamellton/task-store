// import React, { Suspense, lazy } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import './App.css';

// const PLP = lazy(() => import('./pages/PLP'));

// function App() {
//   return (
//     <Router>
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//           <Route path="/plp" element={<PLP />} />
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// }

// export default App;

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import PLPPage from './pages/PLP';

const NotFound = () => {
  return <div>404</div>;
};

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <div>Home</div>,
      },
      {
        path: 'plp',
        element: <PLPPage />,
      },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
