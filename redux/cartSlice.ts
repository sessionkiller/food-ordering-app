import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE : {
    products : any[],
    total: number,
    quantity: number
} = {
    products: [],
    total: 0,
    quantity: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: INITIAL_STATE,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
            state.quantity += 1;
            state.total += action.payload.price * action.payload.quantity;
        },
        reset: (state) => {
            state.products = INITIAL_STATE.products
            state.quantity = INITIAL_STATE.quantity;
            state.total = INITIAL_STATE.total;
        }
    }
})

export const {addProduct, reset} = cartSlice.actions;
export default cartSlice.reducer;