import React, { useEffect, useState } from "react";
import { fetchRepos } from "../../services/endpointsService";
import { gitApi } from "../../config";
import "../../styles/pages/About.scss";

const initialStats = {
  repos: 71,
};

export const About = () => {
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    document.title = "About";

    const getRepoData = async () => {
      try {
        const resRepos = await fetchRepos(
          `/users/zempo/repos?per_page=200&client_id=${gitApi.CLIENT_ID}&client_secret=${gitApi.CLIENT_SECRET}`
        );
        console.log(resRepos.data.length);
      } catch (err) {
        console.log(err.response);
      }
    };

    // getRepoData();
    // eslint-disable-next-line
  }, []);

  return (
    <section className='pg about-pg'>
      <header>
        <h1>Who is Solomon?</h1>
        <h2>
          I am a Full-Stack <span>Web Dev </span>
          living in <span>LA</span>.
        </h2>
      </header>
      <div className='about-stats'>
        <div className='stat-repo'>
          <h3>{stats.repos}</h3>
          <p>Repos</p>
        </div>
        <div>
          <h3>{stats.repos}</h3>
          <p>Contributions</p>
        </div>
        <div>
          <h3>{stats.repos}</h3>
          <p>Followers</p>
        </div>
      </div>
      <article className='about-summary'>
        <h3>Hi there! 👋</h3>
        <p>
          I am a tech enthusiast and generalist living in
          <span> Los Angeles, CA</span>. Today, I work with&nbsp;
          <a
            href='https://www.aleks.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span>McGraw Hill &amp;&amp; ALEKS</span>
          </a>
          &nbsp;as an <span> IT Specialist</span> and offer quality service as a
          <span> Coding Tutor </span>
          through&nbsp;
          <a
            href='https://www.wyzant.com/match/tutor/88373025'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span>Wyzant</span>
          </a>
          . In addition, I hone my skills by working with others, freelance
          clients, or myself to build web experiences. I write
          <span> Semantic HTML</span>, compile
          <span> Sassy CSS</span>, and use
          <span> JavaScript &amp;&amp; Frameworks </span> to build 22
          <sup>nd</sup> century apps.
        </p>
        <p></p>
      </article>
    </section>
  );
};
