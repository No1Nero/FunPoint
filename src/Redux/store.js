import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/auth-reducer";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
    key: 'user',
    storage,
    whitelist: ['user'],
};

const store = configureStore({
    reducer: {
        auth: persistReducer(authPersistConfig, authReducer),
    },
});

const persistor = persistStore(store);

export default {store, persistor};