import React, { useReducer } from "react";
import { projects } from "../data/worksData";

const WorksState = (props) => {
  const initialState = {
    works: projects,
    searchWorks: [],
  };

  return (
    <div>
      <h1></h1>
    </div>
  );
};

export default WorksState;
