import { GET_NAV_OFFSET, SET_NAV_OFFSET } from "../_types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case GET_NAV_OFFSET:
      return {
        ...state,
        navOffset: action.payload,
      };
    case SET_NAV_OFFSET:
      return {
        ...state,
        navOffset: action.payload,
      };
    default:
      return state;
  }
};
