import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer__inner">
                <div className="footer__brand">
                    <Link to="/" className="footer__logo">
                        <span>⚽</span> monky<span className="footer__logo-accent">drop</span>
                    </Link>
                    <p className="footer__tagline">
                        As melhores camisas de futebol do Brasil e do mundo.
                    </p>
                    <div className="footer__socials">
                        <a href="#" className="footer__social" aria-label="Instagram">📸</a>
                        <a href="#" className="footer__social" aria-label="Twitter">🐦</a>
                        <a href="#" className="footer__social" aria-label="TikTok">🎵</a>
                    </div>
                </div>

                <div className="footer__links">
                    <div className="footer__col">
                        <h4>Loja</h4>
                        <Link to="/shop">Todas as Camisas</Link>
                        <Link to="/shop?filter=new">Lançamentos</Link>
                        <Link to="/shop?filter=sale">Ofertas</Link>
                        <Link to="/shop?country=Brasil">Times Brasileiros</Link>
                        <Link to="/shop?country=Espanha">Times Europeus</Link>
                    </div>
                    <div className="footer__col">
                        <h4>Ajuda</h4>
                        <a href="#">Guia de Tamanhos</a>
                        <a href="#">Trocas e Devoluções</a>
                        <a href="#">Política de Frete</a>
                        <a href="#">Perguntas Frequentes</a>
                    </div>
                    <div className="footer__col">
                        <h4>Contato</h4>
                        <a href="#">contato@monkydrop.com</a>
                        <a href="#">WhatsApp</a>
                        <a href="#">Suporte</a>
                    </div>
                </div>
            </div>

            <div className="footer__bottom">
                <div className="container">
                    <p>© 2024 MonkyDrop. Todos os direitos reservados.</p>
                    <div className="footer__payment">
                        <span title="Pix">🏦 Pix</span>
                        <span title="Cartão">💳 Cartão</span>
                        <span title="Boleto">📄 Boleto</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
