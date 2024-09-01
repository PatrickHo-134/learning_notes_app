import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';
import thunk from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userLogin', 'learningNotes'], // Specify which reducers you want to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {
  learningNotes: { learningNotes: []},
  userLogin: { userInfo: JSON.parse(localStorage.getItem('userInfo')) || null }
}

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  preloadedState: initialState,
});

export const persistor = persistStore(store);
export default store;
