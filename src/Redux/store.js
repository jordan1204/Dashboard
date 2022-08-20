import { configureStore } from '@reduxjs/toolkit';
import indexReducer from "./Reducers/IndexReducer";

const store = configureStore({
    reducer:{
        index:indexReducer
    }
})

export default store;