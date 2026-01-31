import { BrowserRouter, Routes, Route } from "react-router-dom";

import PerfilAdmin from "./pages/admin/PerfilAdmin";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<PerfilAdmin />} />
      </Routes>
    </BrowserRouter>
  );
}

