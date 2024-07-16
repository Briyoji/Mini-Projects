// import logo from './logo.svg';
import './App.css';

import { Routes, Route } from 'react-router-dom'



function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="dashboard" element={<>
          <Home></Home>
        </>} />
        <Route path="about" element={<h1>About</h1>} />
        <Route path="*" element={<h1>Not Found</h1>} /> 
      </Routes>
    </>
  );
}

export default App;
