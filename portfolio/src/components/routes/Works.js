import React, { useEffect, useContext } from "react";
import { fetchRepos } from "../../services/endpointsService";
import { gitApi } from "../../config";
import worksContext from "../../context/worksContext";

export const Works = () => {
  const WorksContext = useContext(worksContext);
  const { works, getWorks } = WorksContext;
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
        {works.length}
      </header>
    </section>
  );
};
