import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, loading, fetchCart } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (cart && cart.items) {
      const total = cart.items.reduce((sum, item) => {
        return sum + (item.menuItem.price * item.quantity);
      }, 0);
      setTotalAmount(total);
    }
  }, [cart]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Cart</h1>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          ) : cart && cart.items && cart.items.length > 0 ? (
            <>
              <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                <div className="p-6">
                  {cart.items.map((item) => (
                    <CartItem key={item.menuItem._id} item={item} />
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                <div className="p-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">₹2.99</span>
                  </div>
                  <div className="border-t border-gray-200 my-4"></div>
                  <div className="flex justify-between">
                    <span className="text-lg font-bold">Total</span>
                    <span className="text-lg font-bold text-orange-500">
                      ₹{(totalAmount + 2.99).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Link 
                  to="/checkout" 
                  className="px-6 py-3 bg-orange-500 text-white font-medium rounded-md shadow-md hover:bg-orange-600 transition duration-300"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="flex justify-center mb-4">
                <ShoppingBag className="h-16 w-16 text-gray-300" />
              </div>
              <h2 className="text-xl font-medium text-gray-800 mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Link
                to="/menu"
                className="inline-block px-6 py-3 bg-orange-500 text-white font-medium rounded-md shadow-md hover:bg-orange-600 transition duration-300"
              >
                Browse Menu
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
