import './App.css';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import NotFound from './Components/NotFound';
import Contacts from './Components/Contacts';

function App() {
  return (
    <>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="about">About</NavLink></li>
          <li><NavLink to="contacts">Contacts</NavLink></li>
        </ul> 
      </nav>    

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts/*" element={<Contacts />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
