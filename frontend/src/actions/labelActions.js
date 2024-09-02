import axios from "axios";
import { BASE_URL } from "../appConstants";

export const LABELS_FETCH_REQUEST = "LABELS_FETCH_REQUEST";
export const LABELS_FETCH_SUCCESS = "LABELS_FETCH_SUCCESS";
export const LABELS_FETCH_FAIL = "LABELS_FETCH_FAIL";
export const LABEL_CREATE_REQUEST = "LABEL_CREATE_REQUEST";
export const LABEL_CREATE_SUCCESS = "LABEL_CREATE_SUCCESS";
export const LABEL_CREATE_FAILURE = "LABEL_CREATE_FAILURE";

export const fetchLabels = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: LABELS_FETCH_REQUEST });

    const { data } = await axios.get(`${BASE_URL}/api/labels/${userInfo.id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: LABELS_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LABELS_FETCH_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

const createLabelRequest = () => ({
  type: LABEL_CREATE_REQUEST,
});

export const createLabel = (labelData, userInfo) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    dispatch(createLabelRequest());
    const { data } = await axios.post(
      `${BASE_URL}/api/labels/create/`,
      labelData,
      config
    );

    dispatch({
      type: LABEL_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LABEL_CREATE_FAILURE,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
