import React, { useEffect } from "react";
import { fetchRepos } from "../../services/endpointsService";
import { gitApi } from "../../config";

export const Works = () => {
  useEffect(() => {
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
  }, []);
  return (
    <section className='pg works-pg'>
      <h1>What do I Code?</h1>
    </section>
  );
};
