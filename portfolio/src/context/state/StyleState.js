import React, { useReducer } from "react";
import styleReducer from "../reducers/styleReducer";
import StyleContext from "../styleContext";
import { GET_NAV_OFFSET, SET_NAV_OFFSET } from "../_types";

const StyleState = (props) => {
  const initialState = {
    navOffset: null,
  };

  const [state, dispatch] = useReducer(styleReducer, initialState);

  const getOffset = (navOffset) => {
    dispatch({ type: GET_NAV_OFFSET, payload: navOffset });
  };

  const setOffset = (newOffset) => {
    dispatch({ type: SET_NAV_OFFSET, payload: newOffset });
  };

  return (
    <StyleContext.Provider
      value={{
        navOffset: state.navOffset,
        getOffset,
        setOffset,
      }}
    >
      {props.children}
    </StyleContext.Provider>
  );
};

export default StyleState;
