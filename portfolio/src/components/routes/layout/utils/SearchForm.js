import React from "react";
import { capitalizeStr } from "../../../functions/textManipulation";

export const SearchForm = (props) => {
  /**
   * Tags and data would come from context
   */
  const { name, tags, data } = props.payload;

  return (
    <form className='form search-form'>
      <legend>Search {capitalizeStr(name)}</legend>
    </form>
  );
};
