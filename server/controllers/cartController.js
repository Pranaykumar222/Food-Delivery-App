import Cart from '../models/Cart.js';
import Menu from '../models/Menu.js';

export const addToCart = async (req, res) => {
    try {
        const { menuItemId, quantity } = req.body;
        const userId = req.user.id;  

        if (!menuItemId || !quantity) {
            return res.status(400).json({ msg: "Menu item and quantity are required" });
        }

        const menuItem = await Menu.findById(menuItemId);
        if (!menuItem) {
            return res.status(404).json({ msg: "Menu item not found" });
        }

        if (!menuItem.availability) {
            return res.status(400).json({ msg: "Menu item is not available" });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.menuItem.toString() === menuItemId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ menuItem: menuItemId, quantity });
        }

        await cart.save();

        res.json({ msg: "Item added to cart", cart });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const removeFromCart = async (req, res) => {
    const userId = req.user.id;
    const { menuItemId } = req.body;
  
    if (!menuItemId) {
      return res.status(400).json({ msg: "Menu item ID is required" });
    }
  
    try {
      const cart = await Cart.findOne({ userId });
  
      if (!cart) {
        return res.status(404).json({ msg: "Cart not found" });
      }
  
      const itemIndex = cart.items.findIndex(item => item.menuItem.toString() === menuItemId);
      if (itemIndex === -1) {
        return res.status(404).json({ msg: "Item not found in cart" });
      }
  
      cart.items.splice(itemIndex, 1);
      await cart.save();
  
      res.json({ msg: "Item removed from cart", cart });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
};

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate('items.menuItem');
  res.json(cart || { items: [] });
};
