import { Routes, Route } from "react-router-dom";
import PerfilCliente from "./pages/cliente/PerfilCliente";
export default function App() {
  return (
    <Routes>
      <Route path="/cliente" element={<PerfilCliente />} />
    </Routes>
  );
}