import {
  CLEAR_FILTER_WORK,
  FILTER_WORKS,
  GET_WORKS,
  SET_CURRENT_WORK,
} from "../_types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case GET_WORKS:
      return {
        ...state,
        works: action.payload,
      };
    case SET_CURRENT_WORK:
      return {
        ...state,
        currentWork: state.works.filter((w) => w.id === action.payload),
      };
    case FILTER_WORKS:
      return {
        ...state,
        filteredWorks: action.payload,
      };
    case CLEAR_FILTER_WORK:
      console.log("hello");
      return {
        ...state,
        filteredWorks: null,
      };
    default:
      return state;
  }
};
