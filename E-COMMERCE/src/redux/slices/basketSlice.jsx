import { createSlice } from '@reduxjs/toolkit'

const getBasketFromStorage = () => {
    if (localStorage.getItem("basket")) {
        return JSON.parse(localStorage.getItem("basket"));
    }
    return [];
}

const initialState = {
    products: getBasketFromStorage(),
    drawer: false,
    totalAmount: 0
}

const writeFromBasketToStorage = (basket) => {
    localStorage.setItem("basket", JSON.stringify(basket))
}

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        addToBasket: (state, action) => {
            const findProduct = state.products.find((product) => product.id === action.payload.id);
            if (findProduct) {
                const extractedProducts = state.products.filter((product) => product.id !== action.payload.id);
                findProduct.count += action.payload.count;
                state.products = [...extractedProducts, findProduct];
            } else {
                state.products = [...state.products, action.payload];
            }
            writeFromBasketToStorage(state.products);
        },
        removeFromBasket: (state, action) => {
            state.products = state.products.filter((product) => product.id !== action.payload);
            writeFromBasketToStorage(state.products);
        },
        setDrawer: (state) => {
            state.drawer = !state.drawer;
        },
        calculateBasket: (state) => {
            let total = 0;
            state.products.forEach((product) => {
                total += product.price * product.count;
            });
            state.totalAmount = total;
        }

    }
})

export const { addToBasket, removeFromBasket, setDrawer, calculateBasket } = basketSlice.actions
export default basketSlice.reducer
