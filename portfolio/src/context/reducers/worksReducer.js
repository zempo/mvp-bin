import { GET_WORKS } from "../_types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case GET_WORKS:
      return {
        ...state,
        works: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};
