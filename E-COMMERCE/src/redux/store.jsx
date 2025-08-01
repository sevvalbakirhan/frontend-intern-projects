import { configureStore } from "@reduxjs/toolkit";
import appReducer from '../redux/slices/appSlice'
import productReducer from "./slices/productSlice";
import basketReducer from "./slices/basketSlice"

export const store = configureStore({
    //slices connect reducers, stores
    reducer: {
        app: appReducer,
        product: productReducer,
        basket: basketReducer
    },
})