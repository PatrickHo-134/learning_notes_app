import { combineReducers } from 'redux';
import learningNoteReducer from './learningNoteReducer';
import { userRegisterReducer, userLoginReducer } from './userReducer';
import { labelListReducer } from './labelReducer';

const rootReducer = combineReducers({
  learningNotes: learningNoteReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  labelList: labelListReducer,
});

export default rootReducer;
