import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

const WHATSAPP_NUMBER = "5554996211604";

const buildWhatsAppMessage = (items, total) => {
    const lines = [
        "Olá! Gostaria de solicitar um *orçamento* das seguintes camisas:",
        "",
        ...items.map((item) =>
            `• *${item.name}* | Tam: ${item.size} | Qtd: ${item.quantity} | R$ ${(item.price * item.quantity).toFixed(2).replace(".", ",")}`
        ),
        "",
        `*Total: R$ ${total.toFixed(2).replace(".", ",")}*`,
        "",
        "Aguardo retorno. Obrigado! 🙏⚽",
    ];
    return encodeURIComponent(lines.join("\n"));
};

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

    const handleWhatsApp = () => {
        const msg = buildWhatsAppMessage(items, total);
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    };

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

                            {/* WhatsApp Quote Button */}
                            <button
                                className="btn cart__whatsapp-btn"
                                id="whatsapp-quote-btn"
                                onClick={handleWhatsApp}
                            >
                                <span className="cart__whatsapp-icon">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </span>
                                Pedir Orçamento via WhatsApp
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
