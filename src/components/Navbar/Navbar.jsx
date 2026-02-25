import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
    const { totalItems } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    const isActive = (path) => location.pathname === path;

    return (
        <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
            <div className="container navbar__inner">
                {/* Logo */}
                <Link to="/" className="navbar__logo">
                    <img src="/monky.png" alt="MonkyDrop" className="navbar__logo-img" />
                    <span className="navbar__logo-text">
                        monky<span className="navbar__logo-accent">drop</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="navbar__nav">
                    <Link to="/" className={`navbar__link ${isActive("/") ? "active" : ""}`}>Início</Link>
                    <Link to="/shop" className={`navbar__link ${isActive("/shop") ? "active" : ""}`}>Loja</Link>
                    <Link to="/shop?filter=new" className="navbar__link">Lançamentos</Link>
                    <Link to="/shop?filter=sale" className="navbar__link">Ofertas</Link>
                </nav>

                {/* Actions */}
                <div className="navbar__actions">
                    <Link to="/cart" className="navbar__cart" id="navbar-cart-btn" aria-label="Carrinho">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        {totalItems > 0 && (
                            <span className="navbar__cart-badge">{totalItems > 99 ? "99+" : totalItems}</span>
                        )}
                    </Link>

                    {/* Hamburger */}
                    <button
                        className={`navbar__hamburger ${menuOpen ? "open" : ""}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Menu"
                        id="navbar-hamburger"
                    >
                        <span /><span /><span />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`navbar__mobile ${menuOpen ? "open" : ""}`}>
                <nav className="navbar__mobile-nav">
                    <Link to="/" className={`navbar__mobile-link ${isActive("/") ? "active" : ""}`}>Início</Link>
                    <Link to="/shop" className={`navbar__mobile-link ${isActive("/shop") ? "active" : ""}`}>Loja</Link>
                    <Link to="/shop?filter=new" className="navbar__mobile-link">Lançamentos</Link>
                    <Link to="/shop?filter=sale" className="navbar__mobile-link">Ofertas</Link>
                    <Link to="/cart" className="navbar__mobile-link">
                        Carrinho {totalItems > 0 && <span className="navbar__cart-badge">{totalItems}</span>}
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
