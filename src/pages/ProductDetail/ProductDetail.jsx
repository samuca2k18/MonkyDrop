import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./ProductDetail.css";

const Stars = ({ rating }) => {
    return (
        <span className="stars">
            {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} style={{ color: i <= Math.round(rating) ? "var(--yellow)" : "var(--text-muted)" }}>★</span>
            ))}
        </span>
    );
};

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addItem } = useCart();
    const [selectedSize, setSelectedSize] = useState(null);
    const [added, setAdded] = useState(false);
    const [sizeError, setSizeError] = useState(false);

    const product = products.find((p) => p.id === parseInt(id));
    const related = products.filter((p) => p.team === product?.team && p.id !== product?.id).slice(0, 4);

    if (!product) {
        return (
            <main className="page-wrapper">
                <div className="container empty-state" style={{ paddingTop: "6rem" }}>
                    <div className="icon">😕</div>
                    <h3>Produto não encontrado</h3>
                    <p>Este produto não existe ou foi removido</p>
                    <Link to="/shop" className="btn btn-primary">Voltar à Loja</Link>
                </div>
            </main>
        );
    }

    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null;

    const handleAddToCart = () => {
        if (!selectedSize) {
            setSizeError(true);
            setTimeout(() => setSizeError(false), 2000);
            return;
        }
        addItem(product, selectedSize);
        setAdded(true);
        setTimeout(() => setAdded(false), 2500);
    };

    const handleBuyNow = () => {
        if (!selectedSize) {
            setSizeError(true);
            setTimeout(() => setSizeError(false), 2000);
            return;
        }
        addItem(product, selectedSize);
        navigate("/cart");
    };

    return (
        <main className="product-detail page-wrapper">
            <div className="container">
                {/* Breadcrumb */}
                <nav className="breadcrumb">
                    <Link to="/">Início</Link>
                    <span>›</span>
                    <Link to="/shop">Loja</Link>
                    <span>›</span>
                    <span>{product.team}</span>
                </nav>

                {/* Main Grid */}
                <div className="product-detail__grid">
                    {/* Image */}
                    <div className="product-detail__image-col">
                        <div className="product-detail__image-wrap">
                            <img src={product.image} alt={product.name} className="product-detail__image" />
                            {product.isNew && <span className="badge badge-new product-detail__badge">Novo</span>}
                            {discount && <span className="badge badge-sale product-detail__badge-discount">-{discount}%</span>}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="product-detail__info">
                        <div className="product-detail__meta">
                            <span className="product-detail__league">{product.league}</span>
                            <span className="product-detail__country">🌍 {product.country}</span>
                        </div>
                        <h1 className="product-detail__name">{product.name}</h1>

                        {/* Rating */}
                        <div className="product-detail__rating">
                            <Stars rating={product.rating} />
                            <span className="product-detail__rating-value">{product.rating}</span>
                            <span className="product-detail__reviews">({product.reviews} avaliações)</span>
                        </div>

                        {/* Price */}
                        <div className="product-detail__price-block">
                            <span className="product-detail__price">
                                R$ {product.price.toFixed(2).replace(".", ",")}
                            </span>
                            {product.originalPrice && (
                                <span className="product-detail__original">
                                    R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                                </span>
                            )}
                            {discount && <span className="badge badge-sale">-{discount}%</span>}
                        </div>
                        <p className="product-detail__installments">
                            ou <strong>3x de R$ {(product.price / 3).toFixed(2).replace(".", ",")} sem juros</strong>
                        </p>

                        {/* Size */}
                        <div className="product-detail__section">
                            <div className="product-detail__section-header">
                                <h3>Tamanho</h3>
                                {sizeError && <span className="product-detail__size-error">Selecione um tamanho!</span>}
                                <a href="#" className="product-detail__size-guide">Guia de tamanhos →</a>
                            </div>
                            <div className="product-detail__sizes">
                                {product.sizes.map((s) => (
                                    <button
                                        key={s}
                                        id={`size-btn-${s}`}
                                        className={`product-detail__size-btn ${selectedSize === s ? "active" : ""} ${sizeError ? "error" : ""}`}
                                        onClick={() => { setSelectedSize(s); setSizeError(false); }}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="product-detail__actions">
                            <button
                                id="add-to-cart-btn"
                                className={`btn btn-primary btn-full product-detail__add-btn ${added ? "added" : ""}`}
                                onClick={handleAddToCart}
                            >
                                {added ? "✓ Adicionado!" : "Adicionar ao Carrinho"}
                            </button>
                            <button
                                id="buy-now-btn"
                                className="btn btn-outline btn-full"
                                onClick={handleBuyNow}
                            >
                                Comprar Agora
                            </button>
                        </div>

                        {/* Badges */}
                        <div className="product-detail__trust">
                            <span>✅ Produto original</span>
                            <span>🚀 Frete rápido</span>
                            <span>↩️ 30 dias para troca</span>
                        </div>

                        {/* Details */}
                        <div className="product-detail__details">
                            <div className="product-detail__detail">
                                <span>Time</span>
                                <strong>{product.team}</strong>
                            </div>
                            <div className="product-detail__detail">
                                <span>Liga</span>
                                <strong>{product.league}</strong>
                            </div>
                            <div className="product-detail__detail">
                                <span>Tipo</span>
                                <strong style={{ textTransform: "capitalize" }}>{product.type}</strong>
                            </div>
                            <div className="product-detail__detail">
                                <span>País</span>
                                <strong>{product.country}</strong>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related */}
                {related.length > 0 && (
                    <section className="product-detail__related">
                        <div className="divider" />
                        <h2 className="section-title">Mais do {product.team}</h2>
                        <p className="section-subtitle">Você também pode gostar</p>
                        <div className="product-grid">
                            {related.map((p) => <ProductCard key={p.id} product={p} />)}
                        </div>
                    </section>
                )}
            </div>
        </main>
    );
};

export default ProductDetail;
