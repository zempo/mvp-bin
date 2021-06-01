import React, { useReducer } from "react";
import bytesReducer from "../reducers/bytesReducer";
import BytesContext from "../bytesContext";
import { bytes } from "../data/bytesData";
import {
  CLEAR_FILTER_BYTE,
  FILTER_BYTES,
  GET_BYTES,
  SET_CURRENT_BYTE,
} from "../_types";
import { getTags, queryData } from "../../services/queryService";
 
const BytesState = (props) => {
  const initialState = {
    bytes: bytes,
    tags: getTags(bytes),
    currentByte: null,
    currentByteTag: "show all",
    filteredBytes: null,
  };  

  const [state, dispatch] = useReducer(bytesReducer, initialState);

  const getBytes = async () => {
    dispatch({
      type: GET_BYTES,
      payload: bytes,
    });
  }; 

  const setCurrentByte = (currentId) => {
    dispatch({ type: SET_CURRENT_BYTE, payload: currentId });
  };

  const filterBytes = (query) => {
    let result = {
      query,
      data: queryData(state.bytes, query),
    }; 

    dispatch({ type: FILTER_BYTES, payload: result });
  };

  const clearBytesFilter = () => {
    dispatch({ type: CLEAR_FILTER_BYTE });
  };

  return (
    <BytesContext.Provider
      value={{
        bytes: state.bytes,
        tags: state.tags, 
        filteredBytes: state.filteredBytes,
        currentByte: state.currentByte,
        currentByteTag: state.currentByteTag,
        getBytes,
        setCurrentByte,
        filterBytes,
        clearBytesFilter,
      }}
    >
      {props.children}
    </BytesContext.Provider>
  );
};

export default BytesState;