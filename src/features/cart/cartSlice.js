import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity = existingItem.quantity + newItem.quantity;
        existingItem.total =
          existingItem.total + newItem.quantity * newItem.price;
      } else {
        state.items.push({
          ...newItem,
          quantity: newItem.quantity,
          total: newItem.price * newItem.quantity,
        });
      }

      state.totalQuantity = state.totalQuantity + newItem.quantity;
      state.totalPrice = state.items.reduce((sum, item) => sum + item.total, 0); //.Reduce method
    },
    removeFromCart: (state, action) => {
      const removeItem = action.payload;
      const itemToRemove = state.items.find(
        (item) => item.id === removeItem.id
      );
      state.items = state.items.filter((item) => item.id !== removeItem.id);

      state.totalQuantity = state.totalQuantity - itemToRemove.quantity;
      state.totalPrice = state.totalPrice - itemToRemove.total;
    },

    increaseInCart: (state, action) => {
      const cartItem = action.payload;
      const increaseItem = state.items.find((item) => item.id === cartItem.id);
      increaseItem.quantity = increaseItem.quantity + 1;
      increaseItem.total = increaseItem.price * increaseItem.quantity;

      state.totalQuantity = state.totalQuantity + 1;
      state.totalPrice = state.totalPrice + increaseItem.price;
    },

    decreaseInCart: (state, action) => {
      const cartItem = action.payload;
      const decreaseItem = state.items.find((item) => item.id === cartItem.id);

      if (decreaseItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== cartItem.id);
        state.totalQuantity -= 1;
        state.totalPrice -= decreaseItem.price;
      } else {
        decreaseItem.quantity -= 1;
        decreaseItem.total = decreaseItem.price * decreaseItem.quantity;
        state.totalQuantity -= 1;
        state.totalPrice -= decreaseItem.price;
      }
    },
    clearCart : (state) => {
        state.items = [];
        state.totalQuantity = 0;
        state.totalPrice = 0;
    }
  },
});

export const { addToCart, removeFromCart, increaseInCart, decreaseInCart , clearCart} =
  cartSlice.actions;
export default cartSlice.reducer;
