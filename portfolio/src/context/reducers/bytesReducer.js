import {
  CLEAR_FILTER_BYTE,
  FILTER_BYTES,
  GET_BYTES,
  SET_CURRENT_BYTE,
} from "../_types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case GET_BYTES:
      return {
        ...state,
        works: action.payload,
      };
    case SET_CURRENT_BYTE:
      return {
        ...state,
        currentWork: state.works.filter((w) => w.id === action.payload),
      };
    case FILTER_BYTES:
      return {
        ...state,
        filteredBytes: action.payload.data,
        currentByteTag: action.payload.query,
      };
    case CLEAR_FILTER_BYTE:
      return {
        ...state,
        filteredBytes: null,
      };
    default:
      return state;
  }
};
