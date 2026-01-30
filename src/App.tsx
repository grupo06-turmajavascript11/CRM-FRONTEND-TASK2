import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PerfilUsuario from "./pages/cliente/PerfilUsuario";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/perfil" element={<PerfilUsuario />} />
    </Routes>
  );
}

