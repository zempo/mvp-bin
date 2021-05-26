import React, { useEffect, useContext } from "react";
import ItemPreview from "./layout/utils/ItemPreview";
import worksContext from "../../context/worksContext";
import { fetchRepos } from "../../services/endpointsService";
import { gitApi } from "../../config";
import "../../styles/pages/Works.scss";
import { SearchForm } from "./layout/utils/SearchForm";

export const Works = () => {
  const WorksContext = useContext(worksContext);
  const { works, filteredWorks, getWorks, tags } = WorksContext;

  useEffect(() => {
    document.title = "Works";

    getWorks();

    const getRepoData = async () => {
      try {
        const res = await fetchRepos(
          `/users/zempo/repos?client_id=${gitApi.CLIENT_ID}&client_secret=${gitApi.CLIENT_SECRET}`
        );
        /**
         * Data of interest
         *
         * - updated_at
         * */
        console.log(res.data);
      } catch (err) {
        console.log(err.response);
      }
    };

    // getRepoData();
    // eslint-disable-next-line
  }, []);

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
