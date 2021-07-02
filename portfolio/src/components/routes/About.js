import React, { useEffect, useState } from "react";
import { CountUpAnimation } from "./layout/utils/AnimationUtils";
import { fetchRepos } from "../../services/endpointsService";
import { gitApi } from "../../config";
import "../../styles/pages/About.scss";
import { PortfolioArt } from "./layout/views/PortfolioArt";

const initialStats = {
  avatar_url: "https://avatars.githubusercontent.com/u/39205476?v=4",
  repos: false,
  contributions: false,
  followers: false,
};

const fallbackStats = {
  avatar_url: "https://avatars.githubusercontent.com/u/39205476?v=4",
  repos: 71,
  contributions: 1000,
  followers: 25,
};

export const About = () => {
  const [stats, setStats] = useState(initialStats);

  useEffect(() => {
    document.title = "About";

    const getRepoData = async () => {
      const API = `client_id=${gitApi.CLIENT_ID}&client_secret=${gitApi.CLIENT_SECRET}`;

      try {
        const resStats = await fetchRepos(`/users/zempo?${API}`);
        // const resContributions = await fetchRepos(
        //   `/users/zempo/events/public?per_page=100&${API}`
        // );

        console.log(resStats.data);

        setStats({
          avatar_url: resStats.data.avatar_url,
          repos: resStats.data.public_repos,
          contributions: 700,
          followers: resStats.data.followers,
        });
      } catch (err) {
        console.log(err.response);
        setStats(fallbackStats);
      }
    };

    getRepoData();
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
      <hr />
      <div className='about-stats'>
        <div className='stat stat-repo'>
          <h3>
            {stats.repos ? (
              <CountUpAnimation>{stats.repos}</CountUpAnimation>
            ) : (
              0
            )}
          </h3>
          <p>
            GitHub <br /> Projects
          </p>
        </div>
        <div className='stat stat-contributions'>
          <h3>
            {stats.contributions ? (
              <>
                <CountUpAnimation>{stats.contributions}</CountUpAnimation>+
              </>
            ) : (
              0
            )}
          </h3>
          <p>
            GitHub <br /> Contributions
          </p>
        </div>
        <div className='stat stat-followers'>
          <h3>
            {stats.followers ? (
              <CountUpAnimation>{stats.followers}</CountUpAnimation>
            ) : (
              0
            )}
          </h3>
          <p>
            GitHub <br /> Followers
          </p>
        </div>
      </div>
      <article className='about-summary'>
        <img
          className='prof-img'
          src={stats.avatar_url}
          alt='Avatar for Solomon Zelenko'
        />
        <h3>Hi, there! 👋</h3>
        <p>
          I am a web developer living in Los Angeles, CA. Today, I work
          with&nbsp;
          <a
            href='https://www.aleks.com/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span>McGraw Hill &amp;&amp; ALEKS</span>
          </a>
          &nbsp;as an IT specialist and offer quality service as a Coding Tutor
          through&nbsp;
          <a
            href='https://www.wyzant.com/match/tutor/88373025'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span>Wyzant</span>
          </a>
          . In addition, I hone my skills by working with others, freelance
          clients, or by myself to build web experiences. I write Semantic HTML,
          compile Sassy CSS, and use JavaScript &amp;&amp; Frameworks to build
          22<sup>nd</sup> century apps.
        </p>
        <p>
          Previously, I attended the&nbsp;
          <a
            href='https://liberalarts.du.edu/academics-admissions/programs-ug/ba-minor-psychology'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span>University of Denver</span>
          </a>
          &nbsp; where I graduated with a B.S. in Psychology. However, I soon
          found myself at a crossroads. To support my education, I had worked
          with the now defunct&nbsp;
          <a
            href='https://www.facebook.com/OpenWorldLearning/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span>OpenWorld Learning (OWL)</span>
          </a>
          . During my time with OWL, I studied the{" "}
          <a
            href='http://www.microworlds.com/solutions/mwex.html'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span>MicroWorlds Curriculum</span>
          </a>
          &nbsp;&amp;&amp;&nbsp;
          <a
            href='http://beta.edtechpolicy.org/AAASGW/Session2/const_inquiry_paper.pdf'
            target='_blank'
            rel='noopener noreferrer'
          >
            <span>Constructivist Learning Theory</span>
          </a>
          &nbsp; to help mentor elementary school students all across Denver,
          CO. Shortly after graduating, I followed my newfound passion and moved
          to California to continue learning how to code.
        </p>
        <p>
          I also happen to be an avid adventurer, baker, and voiceover artist.
          Since receiving the Pfizer vaccine, you can catch me exploring LA,
          trying new recipes, and living a healthy lifestyle.
        </p>
      </article>
      {/* <AboutCanvas /> */}
    </section>
  );
};
