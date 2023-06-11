import NavBar from "./components/header/NavBar.js";
import GridExample from "./components/main/ProductItems.js";
import { CartProvider } from './components/Contex.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
//const axios = require('axios/dist/browser/axios.cjs'); // browser

function App() {
  return (
    <CartProvider>
    <NavBar />
    <GridExample />
    </CartProvider>
  );
}

export default App;
