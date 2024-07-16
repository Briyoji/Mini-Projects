import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./Components/Navbar";
import TextForm from "./Components/TextForm";
import About from "./Components/About";


import * as utility from './utils'
import Alert from "./Components/Alert";

function App() {

  const [theme, setTheme] = useState("light");
  const [alert, setalert] = useState(null);

  const toggleTheme = (mode) => {
    setTheme(mode);
    utility.setMode(mode);
  }
  
  const raiseAlert = (type, message) => {
    setalert({
      type : type,
      message : message
    })
    setTimeout(() => {
      setalert(null)
    }, 1500);
  } 

  return (
    <>
      <Navbar title="TextUtils" theme={{"theme" : theme, "toggle": toggleTheme, "themes": utility.themes}} />
      <Alert alert={alert} raiseAlert={raiseAlert} />
      
      <Routes>
        <Route index element={<TextForm funcs={{raiseAlert: raiseAlert}} />} />
        <Route path="/about" element={<About funcs={{raiseAlert: raiseAlert}} />} />
      </Routes>
    </>
  );
}
 
export default App;
