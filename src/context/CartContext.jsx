import { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM": {
            const existing = state.items.find(
                (i) => i.id === action.payload.id && i.size === action.payload.size
            );
            if (existing) {
                return {
                    ...state,
                    items: state.items.map((i) =>
                        i.id === action.payload.id && i.size === action.payload.size
                            ? { ...i, quantity: i.quantity + 1 }
                            : i
                    ),
                };
            }
            return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
        }
        case "REMOVE_ITEM":
            return {
                ...state,
                items: state.items.filter(
                    (i) => !(i.id === action.payload.id && i.size === action.payload.size)
                ),
            };
        case "UPDATE_QUANTITY":
            if (action.payload.quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter(
                        (i) => !(i.id === action.payload.id && i.size === action.payload.size)
                    ),
                };
            }
            return {
                ...state,
                items: state.items.map((i) =>
                    i.id === action.payload.id && i.size === action.payload.size
                        ? { ...i, quantity: action.payload.quantity }
                        : i
                ),
            };
        case "CLEAR_CART":
            return { ...state, items: [] };
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    const addItem = (product, size) => {
        dispatch({ type: "ADD_ITEM", payload: { ...product, size } });
    };

    const removeItem = (id, size) => {
        dispatch({ type: "REMOVE_ITEM", payload: { id, size } });
    };

    const updateQuantity = (id, size, quantity) => {
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, size, quantity } });
    };

    const clearCart = () => dispatch({ type: "CLEAR_CART" });

    const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        <CartContext.Provider
            value={{ items: state.items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
};
