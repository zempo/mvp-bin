import React, { useReducer } from "react";
import styleReducer from "../reducers/styleReducer";
import StyleContext from "../styleContext";
import { GET_NAV_OFFSET, SET_NAV_OFFSET, TOGGLE_MODAL_WIN } from "../_types";

const StyleState = (props) => {
  const initialState = {
    navOffset: null,
    modalExpanded: true,
  };

  const [state, dispatch] = useReducer(styleReducer, initialState);

  const getOffset = (navOffset) => {
    dispatch({ type: GET_NAV_OFFSET, payload: navOffset });
  };

  const setOffset = (newOffset) => {
    dispatch({ type: SET_NAV_OFFSET, payload: newOffset });
  };

  const toggleModalWin = () => {
    dispatch({ type: TOGGLE_MODAL_WIN, payload: null });
  };

  return (
    <StyleContext.Provider
      value={{
        navOffset: state.navOffset,
        modalExpanded: state.modalExpanded,
        getOffset,
        setOffset,
        toggleModalWin,
      }}
    >
      {props.children}
    </StyleContext.Provider>
  );
};

export default StyleState;
