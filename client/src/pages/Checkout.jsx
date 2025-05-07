import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { CreditCard, MapPin, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../api/orderService';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const { cart, loading: cartLoading, clearCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [totalAmount, setTotalAmount] = useState(0);
  const [processingOrder, setProcessingOrder] = useState(false);
  
  const [customerInfo, setCustomerInfo] = useState({
    address: '',
    phone: '',
    paymentMethod: 'card'
  });

  useEffect(() => {
    if (cart && cart.items) {
      const total = cart.items.reduce((sum, item) => {
        return sum + (item.menuItem.price * item.quantity);
      }, 0);
      setTotalAmount(total);
    }
  }, [cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!cart.items || cart.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    setProcessingOrder(true);
    
    try {
      await placeOrder(token);
      toast.success('Order placed successfully!');
      await clearCart();
      navigate('/orders');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order');
    } finally {
      setProcessingOrder(false);
    }
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!cart.items || cart.items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Delivery Information</h2>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                      <label htmlFor="address" className="block text-gray-700 text-sm font-medium mb-2">
                        Delivery Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <MapPin className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="address"
                          name="address"
                          type="text"
                          value={customerInfo.address}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="Enter your full address"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-5">
                      <label htmlFor="phone" className="block text-gray-700 text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={customerInfo.phone}
                          onChange={handleChange}
                          required
                          className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-5">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Payment Method
                      </label>
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <input
                            id="card-payment"
                            name="paymentMethod"
                            type="radio"
                            value="card"
                            checked={customerInfo.paymentMethod === 'card'}
                            onChange={handleChange}
                            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                          />
                          <label htmlFor="card-payment" className="ml-2 flex items-center text-sm text-gray-700">
                            <CreditCard className="h-5 w-5 mr-1 text-gray-500" />
                            Credit Card
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="cash-payment"
                            name="paymentMethod"
                            type="radio"
                            value="cash"
                            checked={customerInfo.paymentMethod === 'cash'}
                            onChange={handleChange}
                            className="h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
                          />
                          <label htmlFor="cash-payment" className="ml-2 block text-sm text-gray-700">
                            Cash on Delivery
                          </label>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={processingOrder}
                      className={`w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                        processingOrder ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {processingOrder ? 'Processing...' : 'Place Order'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    {cart.items.map((item) => (
                      <div key={item.menuItem._id} className="flex justify-between">
                        <div className="flex-1">
                          <p className="text-gray-700">
                            {item.menuItem.name} <span className="text-gray-500">x{item.quantity}</span>
                          </p>
                        </div>
                        <p className="font-medium">
                          ₹{(item.menuItem.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 my-4 pt-4">
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
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
