import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: { 
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User', required: true 
    },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
      quantity: Number,
    },
  ],
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;