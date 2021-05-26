import React from "react";
import { capitalizeStr } from "../../../../services/textManipulation";

const SearchTag = ({ tag, type }) => {
  const filterResults = (tag) => {
    console.log("tag");
  };

  return (
    <button className='search-tag' onClick={filterResults(tag)}>
      {capitalizeStr(tag)}
    </button>
  );
};

export const SearchForm = ({ tags, type }) => {
  return (
    <form className='form search-form'>
      <div className='tags-container'>
        {tags.map((t) => (
          <SearchTag key={t.id} tag={t} type={type} />
        ))}
      </div>
    </form>
  );
};
