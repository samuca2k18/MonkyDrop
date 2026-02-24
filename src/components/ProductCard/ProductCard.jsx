import { Link } from "react-router-dom";
import "./ProductCard.css";

const Stars = ({ rating }) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (
        <span className="stars">
            {[...Array(5)].map((_, i) => (
                <span key={i}>{i < full ? "★" : i === full && half ? "⯨" : "☆"}</span>
            ))}
        </span>
    );
};

const ProductCard = ({ product }) => {
    const discount = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : null;

    return (
        <Link to={`/product/${product.id}`} className="product-card" id={`product-card-${product.id}`}>
            {/* Image */}
            <div className="product-card__image-wrap">
                <img
                    src={product.image}
                    alt={product.name}
                    className="product-card__image"
                    loading="lazy"
                />
                <div className="product-card__overlay" />

                {/* Badges */}
                <div className="product-card__badges">
                    {product.isNew && <span className="badge badge-new">Novo</span>}
                    {discount && <span className="badge badge-sale">-{discount}%</span>}
                    {product.isBestSeller && !product.isNew && (
                        <span className="badge badge-accent">🔥 Top</span>
                    )}
                </div>

                {/* Hover CTA */}
                <div className="product-card__cta">
                    <span>Ver Produto →</span>
                </div>
            </div>

            {/* Info */}
            <div className="product-card__info">
                <div className="product-card__team">
                    <span className="product-card__league">{product.league}</span>
                    <span className="product-card__type">{product.type}</span>
                </div>
                <h3 className="product-card__name">{product.name}</h3>
                <div className="product-card__rating">
                    <Stars rating={product.rating} />
                    <span className="product-card__reviews">({product.reviews})</span>
                </div>
                <div className="product-card__price-row">
                    <span className="product-card__price">
                        R$ {product.price.toFixed(2).replace(".", ",")}
                    </span>
                    {product.originalPrice && (
                        <span className="product-card__original">
                            R$ {product.originalPrice.toFixed(2).replace(".", ",")}
                        </span>
                    )}
                </div>
                <div className="product-card__sizes">
                    {product.sizes.slice(0, 4).map((s) => (
                        <span key={s} className="product-card__size">{s}</span>
                    ))}
                    {product.sizes.length > 4 && (
                        <span className="product-card__size product-card__size--more">+{product.sizes.length - 4}</span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
