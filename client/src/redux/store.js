import { configureStore } from '@reduxjs/toolkit';
import userslice from './features/userslice';


const store = configureStore({
    reducer: {
        user : userslice
    },
})

export default store;