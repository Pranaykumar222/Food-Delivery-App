import React from 'react';
import { MinusCircle, PlusCircle, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart, addToCart } = useCart();
  const { menuItem, quantity } = item;

 const handleRemove = () => {
  removeFromCart(menuItem._id, 1); 
};


  const handleAddMore = () => {
    addToCart(menuItem._id);
  };

  return (
    <div className="flex items-center py-4 border-b border-gray-200">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{menuItem.name}</h3>
        <p className="text-sm text-gray-500 capitalize">{menuItem.category}</p>
      </div>

      <div className="flex items-center">
        <button 
          onClick={handleRemove} 
          className="p-1 text-gray-400 hover:text-orange-500"
          aria-label="Remove one"
        >
          <MinusCircle className="h-5 w-5" />
        </button>
        
        <span className="mx-3 w-8 text-center">{quantity}</span>
        
        <button 
          onClick={handleAddMore} 
          className="p-1 text-gray-400 hover:text-orange-500"
          aria-label="Add one"
        >
          <PlusCircle className="h-5 w-5" />
        </button>
      </div>

      <div className="ml-6 w-24 text-right">
        <p className="text-lg font-medium text-gray-900">
        ₹{(menuItem.price * quantity).toFixed(2)}
        </p>
      </div>

      <button 
        onClick={() => removeFromCart(menuItem._id, quantity)}
        className="ml-4 p-1 text-gray-400 hover:text-red-500"
        aria-label="Remove from cart"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CartItem;
