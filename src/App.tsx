import { Routes, Route } from "react-router-dom";
import PerfilUsuario from "./pages/cliente/PerfilUsuario";
export default function App() {
  return (
    <Routes>
      <Route path="/cliente" element={<PerfilUsuario />} />
    </Routes>
  );
}