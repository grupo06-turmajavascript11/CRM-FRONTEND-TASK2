import { BrowserRouter, Routes, Route } from 'react-router-dom'
import About from './pages/about/About'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/sobre-nos" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
