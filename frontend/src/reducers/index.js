import { combineReducers } from 'redux';
import learningNoteReducer from './learningNoteReducer';
import { userRegisterReducer, userLoginReducer } from './userReducer';

const rootReducer = combineReducers({
  learningNotes: learningNoteReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer
});

export default rootReducer;
