import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Menu from '../models/Menu.js';

export const placeOrder = async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findOne({ userId }).populate('items.menuItem');
  if (!cart || cart.items.length === 0) return res.status(400).json({ msg: 'Cart is empty' });

  let totalAmount = 0;
  const items = cart.items.map((item) => {
    totalAmount += item.menuItem.price * item.quantity;
    return { menuItem: item.menuItem._id, quantity: item.quantity };
  });

  const order = new Order({ userId, items, totalAmount });
  await order.save();
  await Cart.findByIdAndDelete(cart._id);

  res.status(201).json(order);
};

export const getUserOrders = async (req, res) => {
  try {
    let orders;

    if (req.user.role === 'admin') {
      orders = await Order.find().populate('items.menuItem userId');
    } else {
      orders = await Order.find({ userId: req.user.id }).populate('items.menuItem');
    }

    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch orders' });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
  if (!order) return res.status(404).json({ msg: 'Order not found' });
  res.json(order);
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'username')
      .populate('items.menuItem');

    res.json(orders);
  } catch (error) {
    res.status(500).json({ msg: 'Server error while fetching orders' });
  }
};
