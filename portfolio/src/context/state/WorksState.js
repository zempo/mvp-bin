import React, { useReducer } from "react";
import worksReducer from "../reducers/worksReducer";
import WorksContext from "../worksContext";
import { projects } from "../data/worksData";
import { GET_WORKS, ERR_WORKS, SET_CURRENT_WORK } from "../_types";
import { getTags, queryData } from "../../services/queryService";

const WorksState = (props) => {
  const initialState = {
    works: projects,
    tags: getTags(projects),
    currentWork: null,
    filteredWorks: null,
  };

  const [state, dispatch] = useReducer(worksReducer, initialState);

  const getWorks = async () => {
    let tags = getTags(projects);
    let exsearch = queryData(projects, "team");
    console.log(tags, exsearch);
    dispatch({
      type: GET_WORKS,
      payload: projects,
    });
  };

  const setCurrentWork = (currentId) => {
    dispatch({ type: SET_CURRENT_WORK, payload: currentId });
  };

  return (
    <WorksContext.Provider
      value={{
        works: state.works,
        tags: state.tags,
        filteredWorks: state.filteredWorks,
        currentWork: state.currentWork,
        getWorks,
        setCurrentWork,
      }}
    >
      {props.children}
    </WorksContext.Provider>
  );
};

export default WorksState;
