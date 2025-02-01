import { BrowserRouter, Route, Routes } from "react-router-dom";

//Componentes importados
import Navbar from "./Componentes/NavBar";
import Footer from "./Componentes/Footer";

//Pages importadas
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Productos from "./pages/Productos";
import Formulario from "./pages/Formulario";
import Profile from "./pages/Profile";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Productos />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload" element={<Formulario />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
