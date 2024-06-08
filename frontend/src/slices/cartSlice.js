import { createSlice } from '@reduxjs/toolkit'
import { updateCart } from '../utils/cartUtils'

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : { cartItems: [] }

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload

            const existItem = state.cartItems.find((x) => x._id == item._id)

            if (existItem) {
                state.cartItems = state.cartItems.map((x) => x._id == existItem._id ? { ...x, qty: x.qty + item.qty } : x)
                console.log('Found existItem: ', existItem)
            } else {
                state.cartItems = [...state.cartItems, item]
                console.log('Couldnt find existItem')
            }

            return updateCart(state)
        },
        adjustQty: (state, action) => {
            const { id, operator } = action.payload;
      
            const existItem = state.cartItems.find((x) => x._id === id);
      
            if (existItem) {
              state.cartItems = state.cartItems.map((x) =>
                x._id === existItem._id
                  ? { ...x, qty: operator === '++' ? x.qty + 1 : x.qty - 1 }
                  : x
              ).filter(item => item.qty > 0);
            }
      
            return updateCart(state);
        },
    },
})

export const { addToCart, adjustQty } = cartSlice.actions

export default cartSlice.reducer