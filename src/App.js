import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import Section from "./pages/Section";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Likes from "./pages/Likes";
import { useSelector } from "react-redux";

function App() {
  const authentication = useSelector((state) => state.auth.authentication);
  return (
    <div className="App">
      <Header islogin={authentication} />
      <Routes>
        <Route path="/" element={<Section />} />
        <Route path="/:search" element={<Section />} />
        <Route path="/item/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/likes" element={<Likes />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
