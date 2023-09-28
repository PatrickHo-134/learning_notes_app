import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from "../actions/userActions";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loading: true,
      };

    case LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };

    case LOGIN_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {
        loading: true,
      };

    case REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      };

    case REGISTER_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
      return {};

    default:
      return state;
  }
};
