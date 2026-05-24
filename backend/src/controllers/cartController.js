import Cart from "../models/Cart.model.js";

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    let { foodId, quantity } = req.body;

    if (!foodId) {
      return res.status(400).json({ message: "FoodId required" });
    }

    quantity = Number(quantity) || 1;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({
        userId,
        items: [{ foodId, quantity }],
      });

      return res.status(201).json({
        message: "Cart created and item added",
        cart,
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.foodId.toString() === foodId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ foodId, quantity });
    }

    await cart.save();

    res.status(200).json({
      message: "Item added to cart",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET CART 
export const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(200).json({
        message: "Cart empty",
        cart: { items: [] },
      });
    }

    res.status(200).json({
      message: "Cart fetched",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

// REMOVE FROM CART 
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { foodId } = req.body;

    if (!foodId) {
      return res.status(400).json({ message: "FoodId required" });
    }

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.foodId.toString() !== foodId
    );

    await cart.save();

    res.status(200).json({
      message: "Removed",
      cart,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};