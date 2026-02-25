import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import TeamModal from "./components/TeamModal/TeamModal";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Cart from "./pages/Cart/Cart";
import "./styles/global.css";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [favoriteTeam, setFavoriteTeam] = useState(() => {
    const saved = localStorage.getItem("favoriteTeam");
    return saved && saved !== "__skip__" ? saved : null;
  });

  useEffect(() => {
    const saved = localStorage.getItem("favoriteTeam");
    if (!saved) {
      // Small delay so the page renders first
      const timer = setTimeout(() => setShowModal(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleModalClose = (team) => {
    setShowModal(false);
    if (team) setFavoriteTeam(team);
  };

  return (
    <BrowserRouter>
      <CartProvider>
        {showModal && <TeamModal onClose={handleModalClose} />}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home favoriteTeam={favoriteTeam} />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={
            <main style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ textAlign: "center", color: "var(--text-secondary)" }}>
                <div style={{ fontSize: "4rem" }}>404</div>
                <h2 style={{ color: "var(--text-primary)", margin: "1rem 0" }}>Página não encontrada</h2>
                <a href="/" style={{ color: "var(--accent)" }}>← Voltar ao início</a>
              </div>
            </main>
          } />
        </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
