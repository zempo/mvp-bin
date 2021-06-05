import {
  GET_NAV_OFFSET,
  SET_NAV_OFFSET,
  SET_WIDTH,
  TOGGLE_MODAL_WIN,
} from "../_types";

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
    case SET_WIDTH:
      return {
        ...state,
        currWidth: action.payload,
      };
    case TOGGLE_MODAL_WIN:
      return {
        ...state,
        modalExpanded: !state.modalExpanded,
      };
    default:
      return state;
  }
};
