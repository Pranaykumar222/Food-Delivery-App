import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const API_BASE = import.meta.env.VITE_API_URL;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const { user, token } = useAuth();

  useEffect(() => {
    if (user && token) {
      fetchCart();
    } else {
      setCart({ items: [] });
    }
  }, [user, token]);

  const fetchCart = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCart(response.data);
    } catch (error) {
      toast.error('Failed to load your cart');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (menuItemId, quantity = 1) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/api/cart/add`, 
        { menuItemId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Item added to cart');
      await fetchCart();
    } catch (error) {
      toast.error('Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

 const removeFromCart = async (menuItemId, quantity = 1) => {
  if (!user) return;
  setLoading(true);
  try {
    await axios.post(`${API_BASE}/api/cart/remove`, 
      { menuItemId, quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toast.success('Item updated in cart');
    await fetchCart();
  } catch (error) {
    toast.error('Failed to update cart');
  } finally {
    setLoading(false);
  }
};


  const clearCart = async () => {
    setCart({ items: [] });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        fetchCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
