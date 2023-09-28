import axios from "axios";

// user login

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const loginRequest = () => {
  return { type: LOGIN_REQUEST };
};

export const loginSuccess = (responseData) => {
  return {
    type: LOGIN_SUCCESS,
    payload: responseData,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

// Asynchronous action to handle user login
export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      // Make the API call to your backend to authenticate the user
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/login/",
        { username: email, password: password }
      );

      dispatch(loginSuccess(response.data));

      localStorage.setItem("userInfo", JSON.stringify(response.data));
    } catch (error) {
      // Dispatch loginFailure action if login fails
      dispatch(loginFailure("Login failed. Please try again."));
    }
  };
};


// user logout

export const LOGOUT = "LOGOUT";

export const logout = (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({ type: LOGOUT });
};


// user register

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const register = (firstName, lastName, email, password) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/register/",
        { 'first_name': firstName, 'last_name': lastName, 'email': email, 'password': password }
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });

      dispatch(loginSuccess(response.data)); // we need this to store the data in userLogin

      localStorage.setItem("userInfo", JSON.stringify(response.data));
    } catch (error) {
      dispatch({
        type: REGISTER_FAILURE,
        payload: error,
      });
    }
  };
};