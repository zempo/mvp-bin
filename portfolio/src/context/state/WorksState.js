import React, { useReducer } from "react";
import worksReducer from "../reducers/worksReducer";
import WorksContext from "../worksContext";
import { projects } from "../data/worksData";
import { GET_WORKS, ERR_WORKS } from "../_types";

const WorksState = (props) => {
  const initialState = {
    works: projects,
    currentWorks: null,
    filterWorks: null,
  };

  const [state, dispatch] = useReducer(worksReducer, initialState);

  const getWorks = async () => {
    dispatch({
      type: GET_WORKS,
      payload: projects,
    });
    // for a future axios endpoint
    // try {
    //   dispatch({
    //     type: GET_WORKS,
    //     payload: projects
    //   })
    // } catch (err) {
    //   dispatch({
    //     type: ERR_WORKS,

    //   })
    // }
  };

  return (
    <WorksContext.Provider
      value={{
        works: state.works,
        filteredWorks: state.filteredWorks,
        currentWorks: state.currentWorks,
        getWorks,
      }}
    >
      {props.children}
    </WorksContext.Provider>
  );
};

export default WorksState;
