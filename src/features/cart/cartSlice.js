import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

export const cartSlice = createSlice({
    name : 'cart',
    initialState : {
        items : [],
        totalQuantity : 0,
        totalPrice : 0
    },
    reducers : {
        addToCart : (state , action) => {
            const newItem = action.payload
            const existingItem = state.items.find((item) => item.id === newItem.id)

            if(existingItem){
                existingItem.quantity = existingItem.quantity + newItem.quantity;
                existingItem.total = existingItem.total + (newItem.quantity * newItem.price);
            }else{
                state.items.push({
                    ...newItem,
                    quantity : newItem.quantity,
                    total : newItem.price * newItem.quantity
                })
            }

            state.totalQuantity = state.totalQuantity + newItem.quantity;
            state.totalPrice = state.items.reduce((sum, item) => sum + item.total, 0); //.Reduce method

        },
        removeFromCart : (state , action) => {
            
        }
    }

})

export const {addToCart} = cartSlice.actions;
export default cartSlice.reducer