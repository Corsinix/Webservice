// Context.js
import React, { createContext, useReducer } from 'react';

// Créez le contexte du panier
export const CartContext = createContext();

// Actions
const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { item } = action.payload;
      const existingIndex = state.findIndex((product) => product.name === item.name);
      if (existingIndex !== -1) {
        // Le produit existe déjà dans le panier, mettre à jour la quantité
        const updatedItems = [...state];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + item.quantity,
          total: (updatedItems[existingIndex].quantity + item.quantity) * updatedItems[existingIndex].price,
        };

        return updatedItems;
      } else {
        // Le produit n'existe pas dans le panier, l'ajouter
        return [...state, item];
      }
      case REMOVE_FROM_CART:
        const { item: removedItem } = action.payload;
        const updatedItems = state.filter((product) => product.name !== removedItem.name);
        return updatedItems;

    default:
      return state;
  }
};

// Créez le fournisseur de contexte de panier
export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  // Fonction pour ajouter un article au panier
  const addToCart = (item) => {
    dispatch({ type: ADD_TO_CART, payload: { item } });
  };
    // Fonction pour supprimer un article du panier
    const removed = (item) => {
      dispatch({ type: REMOVE_FROM_CART, payload: { item } });
    };
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removed }}>
      {children}
    </CartContext.Provider>
  );
};