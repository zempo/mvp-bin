import React, { useEffect, useContext } from "react";
import ItemPreview from "./layout/utils/ItemPreview";
import worksContext from "../../context/worksContext";
import { SearchForm } from "./layout/utils/SearchForm";
import "../../styles/pages/Works.scss";

export const Works = () => {
  const WorksContext = useContext(worksContext);
  const { works, filteredWorks, getWorks, tags, currentTag } = WorksContext;

  useEffect(() => {
    document.title = "Works";

    getWorks();
    // eslint-disable-next-line
  }, []);

  const getWorksCount = () => {
    let len = works.length;

    if (filteredWorks == null || currentTag === "show all") {
      return `Showing all ${len} works. You can filter apps by type or tech.`;
    } else {
      let fLen = filteredWorks.length;
      return `Showing ${fLen} of ${len} works — filtered by ${currentTag.toUpperCase()}.`;
    }
  };

  return (
    <section className='pg works-pg'>
      <header>
        <h1>What do I code?</h1>
        <h2 className='sub-head'>
          I build apps with all the <span>Works</span>.
        </h2>
      </header>
      <SearchForm tags={tags} type='work' />
      <div className='app-content works-container'>
        <p className='works-count'>{getWorksCount()}</p>
        <ul className='app-list works-list'>
          {filteredWorks != null
            ? filteredWorks.map((w) => (
                <ItemPreview itemType='work' payload={w} key={w.id} />
              ))
            : works.map((w) => (
                <ItemPreview itemType='work' payload={w} key={w.id} />
              ))}
        </ul>
      </div>
    </section>
  );
};
