import Menu from "../models/Menu.js";

export const getMenu = async (req, res) => {
    try {
        const menu = await Menu.find();
        res.json(menu);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const addMenuItem = async (req, res) => {
    try {
        const { name, category, price, availability = true } = req.body;
        if (!name || !price) return res.status(400).json({ msg: "Name and Price required" });

        const newItem = new Menu({ name, category, price, availability });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const updateMenuItem = async (req, res) => {
    try {
        const updatedItem = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ msg: "Item not found" });

        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export const deleteMenuItem = async (req, res) => {
    try {
        const deleted = await Menu.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ msg: "Item not found" });

        res.json({ msg: "Menu item deleted" });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};
