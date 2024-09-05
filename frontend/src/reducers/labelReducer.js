import {
  LABELS_FETCH_REQUEST,
  LABELS_FETCH_SUCCESS,
  LABELS_FETCH_FAIL,
  LABEL_CREATE_SUCCESS,
  LABEL_CREATE_FAILURE,
  LABEL_DELETE_SUSSCESS,
  LABEL_DELETE_FAILURE,
} from "../actions/labelActions";

const initialState = {
  labels: [],
  loading: false,
  error: null,
};

export const labelListReducer = (state = initialState, action) => {
  switch (action.type) {
    case LABELS_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LABELS_FETCH_SUCCESS:
      return {
        labels: action.payload,
        loading: false,
      };
    case LABELS_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LABEL_CREATE_SUCCESS:
      return {
        ...state,
        labels: [...state.labels, action.payload],
        loading: false,
      };
    case LABEL_CREATE_FAILURE:
    case LABEL_DELETE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LABEL_DELETE_SUSSCESS:
      return {
        ...state,
        labels: state.labels.filter(
          (label) => label.id !== action.payload.labelId
        ),
      };

    default:
      return state;
  }
};
