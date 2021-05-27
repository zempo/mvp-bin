import React, { useContext } from "react";
import worksContext from "../../../../context/worksContext";
import { capitalizeStr } from "../../../../services/genService";

const SearchTag = ({ tag, type }) => {
  const WorksContext = useContext(worksContext);
  const { currentTag, filterWorks, clearWorksFilter } = WorksContext;

  const filterResults = (e, query, type) => {
    e.preventDefault();

    if (type === "work") {
      clearWorksFilter();
      filterWorks(query);
    } else {
      console.log("hello");
    }
  };

  return (
    <>
      <button
        className={`search-tag ${tag === currentTag ? "active" : ""}`}
        onClick={(e) => filterResults(e, tag, type)}
      >
        {capitalizeStr(tag)}
      </button>
    </>
  );
};

export const SearchForm = ({ tags, type }) => {
  return (
    <form className='form search-form'>
      <div className='tags-container'>
        {tags.map((t, i) => (
          <SearchTag key={i} tag={t} type={type} />
        ))}
      </div>
    </form>
  );
};
