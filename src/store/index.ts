import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './features/authSlice';
import designerReducer from './features/designerSlice';
import formReducer from './features/formSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isAuthenticated', 'user']
};

const designerPersistConfig = {
  key: 'designer',
  storage,
  whitelist: ['components']
};

const formPersistConfig = {
  key: 'forms',
  storage,
  whitelist: ['savedForms']
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    designer: persistReducer(designerPersistConfig, designerReducer),
    forms: persistReducer(formPersistConfig, formReducer)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;