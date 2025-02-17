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
import MyPublications from "./pages/myPublications";
import PrivateRoute from "./context/PrivateRoute";
import AuthProvider from "./context/AuthContext";
import EditPublication from "./pages/editpublication";
import OrderDetail from "./pages/OrderDetail";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Productos />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/upload" element={<Formulario />} />
            <Route element={<PrivateRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/myPublications" element={<MyPublications />} />
              <Route
                path="/editpublication/:publication_id"
                element={<EditPublication />}
              />
              <Route
                path="/orderdetail/:publication_id"
                element={<OrderDetail />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
