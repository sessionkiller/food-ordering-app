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
            state = INITIAL_STATE
        }
    }
})

export const {addProduct, reset} = cartSlice.actions;
export default cartSlice.reducer;