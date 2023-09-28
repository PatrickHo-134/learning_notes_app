import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import thunk from 'redux-thunk'

const userInfoFromStorage = localStorage.getItem('userInfo') ?
  JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
  learningNotes: { learningNotes: []},
  userLogin: { userInfo: userInfoFromStorage }
}

const store = configureStore({
  reducer: rootReducer,
  initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
