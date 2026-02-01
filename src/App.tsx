import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/about/About'
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} /> 
      <Route path="/cadastro" element={<Cadastro />} />  
      <Route path="/sobre-nos" element={<About />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
