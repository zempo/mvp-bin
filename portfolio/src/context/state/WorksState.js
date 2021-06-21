import React, { useReducer } from "react";
import worksReducer from "../reducers/worksReducer";
import WorksContext from "../worksContext";
import { projects } from "../data/worksData";
import {
  CLEAR_FILTER_WORK,
  FILTER_WORKS,
  GET_WORKS,
  SET_CURRENT_WORK,
} from "../_types";
import {
  getNewIdx,
  btnStatus,
  getTags,
  queryData,
} from "../../services/queryService";

const WorksState = (props) => {
  const initialState = {
    works: projects,
    tags: getTags(projects),
    currentWork: null,
    currentTag: "show all",
    filteredWorks: null,
  };

  const [state, dispatch] = useReducer(worksReducer, initialState);

  const getWorks = async () => {
    dispatch({
      type: GET_WORKS,
      payload: projects,
    });
  };

  const setCurrentWork = (currentId) => {
    dispatch({ type: SET_CURRENT_WORK, payload: currentId });
  };

  const paginateWork = (currentId, type) => {
    // are we working with filtered or standard works
    let whichWorks =
      state.filteredWorks == null ? state.works : state.filteredWorks;

    let newItem = getNewIdx(currentId, whichWorks, type);

    dispatch({ type: SET_CURRENT_WORK, payload: newItem.id });
  };

  const checkBtnStatus = (currentId, type) => {
    // are we working with filtered or standard works
    let whichWorks =
      state.filteredWorks == null ? state.works : state.filteredWorks;

    return btnStatus(currentId, whichWorks, type);
  };

  const filterWorks = (query) => {
    let result = {
      query,
      data: queryData(state.works, query),
    };

    dispatch({ type: FILTER_WORKS, payload: result });
  };

  const clearWorksFilter = () => {
    dispatch({ type: CLEAR_FILTER_WORK });
  };

  return (
    <WorksContext.Provider
      value={{
        works: state.works,
        tags: state.tags,
        filteredWorks: state.filteredWorks,
        currentWork: state.currentWork,
        currentTag: state.currentTag,
        getWorks,
        setCurrentWork,
        checkBtnStatus,
        paginateWork,
        filterWorks,
        clearWorksFilter,
      }}
    >
      {props.children}
    </WorksContext.Provider>
  );
};

export default WorksState;
