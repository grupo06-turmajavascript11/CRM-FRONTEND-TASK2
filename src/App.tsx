import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import { Oportunidades } from './pages/Oportunidades';
import { Solucoes } from './pages/Solucoes';

function App() {
  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sobre-nos" element={<About />} />
        <Route path="/solucoes" element={<Solucoes />} />
        <Route path="/oportunidades" element={<Oportunidades />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App;
