import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

const CartItemRow = ({ item, onUpdateQty, onRemove }) => {
    const discount = item.originalPrice
        ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
        : null;

    return (
        <div className="cart-item" id={`cart-item-${item.id}-${item.size}`}>
            <div className="cart-item__image-wrap">
                <img src={item.image} alt={item.name} className="cart-item__image" />
            </div>
            <div className="cart-item__info">
                <div className="cart-item__meta">
                    <span className="cart-item__team">{item.team}</span>
                    <span className="cart-item__type">{item.type}</span>
                </div>
                <h3 className="cart-item__name">{item.name}</h3>
                <div className="cart-item__tags">
                    <span className="cart-item__size-tag">Tamanho: {item.size}</span>
                    {discount && <span className="badge badge-sale">-{discount}%</span>}
                </div>
                <div className="cart-item__price-row">
                    <span className="cart-item__price">R$ {item.price.toFixed(2).replace(".", ",")}</span>
                    {item.originalPrice && (
                        <span className="cart-item__original">R$ {item.originalPrice.toFixed(2).replace(".", ",")}</span>
                    )}
                </div>
            </div>
            <div className="cart-item__actions">
                <div className="cart-item__qty">
                    <button
                        id={`qty-minus-${item.id}-${item.size}`}
                        className="cart-item__qty-btn"
                        onClick={() => onUpdateQty(item.id, item.size, item.quantity - 1)}
                    >−</button>
                    <span className="cart-item__qty-value">{item.quantity}</span>
                    <button
                        id={`qty-plus-${item.id}-${item.size}`}
                        className="cart-item__qty-btn"
                        onClick={() => onUpdateQty(item.id, item.size, item.quantity + 1)}
                    >+</button>
                </div>
                <span className="cart-item__subtotal">
                    R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                </span>
                <button
                    id={`remove-${item.id}-${item.size}`}
                    className="cart-item__remove"
                    onClick={() => onRemove(item.id, item.size)}
                    aria-label="Remover"
                >🗑</button>
            </div>
        </div>
    );
};

const Cart = () => {
    const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
    const shipping = totalPrice > 300 ? 0 : 29.9;
    const total = totalPrice + shipping;

    if (items.length === 0) {
        return (
            <main className="cart page-wrapper">
                <div className="container">
                    <h1 className="section-title" style={{ padding: "3rem 0 2rem" }}>Carrinho</h1>
                    <div className="empty-state">
                        <div className="icon">🛒</div>
                        <h3>Seu carrinho está vazio</h3>
                        <p>Adicione camisas incríveis para começar</p>
                        <Link to="/shop" className="btn btn-primary" id="cart-go-shop-btn">Explorar Loja</Link>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="cart page-wrapper">
            <div className="container">
                <div className="cart__header">
                    <h1 className="section-title">Carrinho</h1>
                    <button className="btn btn-ghost cart__clear" onClick={clearCart} id="cart-clear-btn">
                        Esvaziar carrinho
                    </button>
                </div>

                <div className="cart__layout">
                    {/* Items */}
                    <div className="cart__items">
                        {items.map((item) => (
                            <CartItemRow
                                key={`${item.id}-${item.size}`}
                                item={item}
                                onUpdateQty={updateQuantity}
                                onRemove={removeItem}
                            />
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="cart__summary">
                        <div className="cart__summary-card">
                            <h2 className="cart__summary-title">Resumo do Pedido</h2>

                            <div className="cart__summary-rows">
                                <div className="cart__summary-row">
                                    <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} itens)</span>
                                    <span>R$ {totalPrice.toFixed(2).replace(".", ",")}</span>
                                </div>
                                <div className="cart__summary-row">
                                    <span>Frete</span>
                                    <span className={shipping === 0 ? "cart__summary-free" : ""}>
                                        {shipping === 0 ? "Grátis 🎉" : `R$ ${shipping.toFixed(2).replace(".", ",")}`}
                                    </span>
                                </div>
                                {shipping === 0 && (
                                    <div className="cart__summary-notice">
                                        ✅ Frete grátis para pedidos acima de R$ 300
                                    </div>
                                )}
                                {shipping > 0 && (
                                    <div className="cart__summary-notice">
                                        Faltam R$ {(300 - totalPrice).toFixed(2).replace(".", ",")} para frete grátis
                                    </div>
                                )}
                            </div>

                            <div className="cart__summary-total">
                                <span>Total</span>
                                <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                            </div>
                            <p className="cart__installments">
                                ou <strong>3x de R$ {(total / 3).toFixed(2).replace(".", ",")} sem juros</strong>
                            </p>

                            <button className="btn btn-primary btn-full cart__checkout-btn" id="checkout-btn">
                                Finalizar Compra
                            </button>
                            <Link to="/shop" className="btn btn-ghost btn-full cart__continue-btn">
                                ← Continuar Comprando
                            </Link>

                            <div className="cart__payment-methods">
                                <span>🏦 Pix</span>
                                <span>💳 Cartão</span>
                                <span>📄 Boleto</span>
                            </div>
                        </div>

                        {/* Coupon */}
                        <div className="cart__coupon">
                            <h3>Cupom de Desconto</h3>
                            <div className="cart__coupon-input">
                                <input type="text" placeholder="Ex: MONKY10" id="coupon-input" defaultValue="" />
                                <button className="btn btn-outline" id="apply-coupon-btn">Aplicar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Cart;
