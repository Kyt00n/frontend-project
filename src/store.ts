import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth.reducer';
import messageReducer from './reducers/message.reducer'

const store = configureStore({
    reducer: {
        auth: authReducer,
        message: messageReducer,
    },
    devTools: true
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

