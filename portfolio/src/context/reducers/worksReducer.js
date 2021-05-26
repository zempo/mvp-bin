import { GET_WORKS, SET_CURRENT_WORK } from "../_types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case GET_WORKS:
      return {
        ...state,
        works: action.payload,
        loading: false,
      };
    case SET_CURRENT_WORK:
      return {
        ...state,
        currentWork: state.works.filter((w) => w.id === action.payload),
      };
    default:
      return state;
  }
};
