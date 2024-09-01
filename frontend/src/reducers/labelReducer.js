import { LABELS_FETCH_REQUEST, LABELS_FETCH_SUCCESS, LABELS_FETCH_FAIL } from '../actions/labelActions';

export const labelListReducer = (state = { labels: [] }, action) => {
    switch (action.type) {
        case LABELS_FETCH_REQUEST:
            return { loading: true, labels: [] };
        case LABELS_FETCH_SUCCESS:
            return { loading: false, labels: action.payload };
        case LABELS_FETCH_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};
