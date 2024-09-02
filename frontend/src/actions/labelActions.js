import axios from "axios";
import { BASE_URL } from "../appConstants";

export const LABELS_FETCH_REQUEST = "LABELS_FETCH_REQUEST";
export const LABELS_FETCH_SUCCESS = "LABELS_FETCH_SUCCESS";
export const LABELS_FETCH_FAIL = "LABELS_FETCH_FAIL";

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
