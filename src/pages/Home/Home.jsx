import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { featuredProducts, products } from "../../data/products";
import { leagues } from "../../data/teams";
import "./Home.css";

const teamCategories = [
    { name: "Flamengo", emoji: "🔴⚫", country: "Brasil" },
    { name: "Barcelona", emoji: "🔴🔵", country: "Espanha" },
    { name: "Real Madrid", emoji: "⚪", country: "Espanha" },
    { name: "Corinthians", emoji: "⚫⚪", country: "Brasil" },
    { name: "Liverpool", emoji: "🔴", country: "Inglaterra" },
    { name: "Palmeiras", emoji: "🟢", country: "Brasil" },
];

const Home = () => {
    const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

    return (
        <main className="home page-wrapper">
            {/* Hero */}
            <section className="hero">
                <div className="hero__bg" />
                <div className="container hero__content">
                    <div className="hero__badge badge badge-accent">⚽ Nova Coleção 2024/25</div>
                    <h1 className="hero__title">
                        Vista a Camisa
                        <br />
                        <span className="hero__title-accent">do seu Time</span>
                    </h1>
                    <p className="hero__desc">
                        Camisas oficiais dos melhores times do Brasil e do mundo. Qualidade garantida, entrega rápida.
                    </p>
                    <div className="hero__actions">
                        <Link to="/shop" className="btn btn-primary hero__cta" id="hero-shop-btn">
                            Ver Coleção
                        </Link>
                        <Link to="/shop?filter=new" className="btn btn-outline">
                            Lançamentos
                        </Link>
                    </div>
                    <div className="hero__stats">
                        <div className="hero__stat">
                            <span className="hero__stat-value">+20</span>
                            <span className="hero__stat-label">Times</span>
                        </div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat">
                            <span className="hero__stat-value">100%</span>
                            <span className="hero__stat-label">Original</span>
                        </div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat">
                            <span className="hero__stat-value">4.8★</span>
                            <span className="hero__stat-label">Avaliação</span>
                        </div>
                    </div>
                </div>
                <div className="hero__scroll-hint">
                    <span>↓</span>
                </div>
            </section>

            {/* Leagues */}
            <section className="leagues-strip">
                <div className="container">
                    <div className="leagues-strip__inner">
                        {leagues.map((l) => (
                            <Link key={l.id} to={`/shop?league=${l.name}`} className="league-chip">
                                <span>{l.flag}</span>
                                <span>{l.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div>
                            <div className="divider" />
                            <h2 className="section-title">Mais Vendidos 🔥</h2>
                            <p className="section-subtitle">Os queridinhos da torcida</p>
                        </div>
                        <Link to="/shop" className="btn btn-ghost">Ver todos →</Link>
                    </div>
                    <div className="product-grid">
                        {featuredProducts.map((p, i) => (
                            <div key={p.id} className="fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Banner */}
            <section className="promo-banner">
                <div className="container">
                    <div className="promo-banner__inner">
                        <div className="promo-banner__left">
                            <span className="badge badge-sale">⚡ Oferta Especial</span>
                            <h2>Até <strong>R$ 100 off</strong> nas camisas selecionadas</h2>
                            <p>Use o cupom <code>MONKY10</code> e aproveite</p>
                            <Link to="/shop?filter=sale" className="btn btn-primary">Ver Ofertas</Link>
                        </div>
                        <div className="promo-banner__right">⚽</div>
                    </div>
                </div>
            </section>

            {/* Team Picks */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div>
                            <div className="divider" />
                            <h2 className="section-title">Por Time</h2>
                            <p className="section-subtitle">Encontre a camisa do seu coração</p>
                        </div>
                    </div>
                    <div className="team-grid">
                        {teamCategories.map((t) => (
                            <Link
                                key={t.name}
                                to={`/shop?team=${t.name}`}
                                className="team-card"
                                id={`team-card-${t.name.toLowerCase().replace(/\s/g, "-")}`}
                            >
                                <span className="team-card__emoji">{t.emoji}</span>
                                <span className="team-card__name">{t.name}</span>
                                <span className="team-card__country">{t.country}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* New Arrivals */}
            <section className="section">
                <div className="container">
                    <div className="section-header">
                        <div>
                            <div className="divider" />
                            <h2 className="section-title">Lançamentos ✨</h2>
                            <p className="section-subtitle">Chegou fresquinho</p>
                        </div>
                        <Link to="/shop?filter=new" className="btn btn-ghost">Ver todos →</Link>
                    </div>
                    <div className="product-grid">
                        {newArrivals.map((p, i) => (
                            <div key={p.id} className="fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                                <ProductCard product={p} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="features">
                <div className="container">
                    <div className="features__grid">
                        {[
                            { icon: "🚀", title: "Entrega Rápida", desc: "Receba em até 5 dias úteis" },
                            { icon: "🛡️", title: "100% Original", desc: "Produto autêntico garantido" },
                            { icon: "↩️", title: "Troca Fácil", desc: "30 dias para troca ou devolução" },
                            { icon: "💳", title: "Pague Como Quiser", desc: "Pix, cartão ou boleto" },
                        ].map((f) => (
                            <div key={f.title} className="feature-card">
                                <span className="feature-card__icon">{f.icon}</span>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
