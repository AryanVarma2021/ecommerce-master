import { createSlice } from "@reduxjs/toolkit";

const storedCart = localStorage.getItem("cart");
const initialState = storedCart ? JSON.parse(storedCart) : [];

const cartSlice = createSlice({  
    name: 'cart',
    initialState, 
    reducers: {
        add(state, action) {
            state.push(action.payload);
        },

        remove(state, action) {


            return(  state.filter((item) => (item.uniqueId !== action.payload)));
            



            
        },
        
    },
});

export const totalPrice =  (state) =>{
    return state.cart.reduce((total, item) => total + item.price, 0);

}

export const { add, remove } = cartSlice.actions;  
export default cartSlice.reducer;
