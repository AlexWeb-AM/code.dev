import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice'
import codeReducer from '../slices/codeSlice'

export const store = configureStore({
    reducer: {
        auth:authReducer,
        code:codeReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;