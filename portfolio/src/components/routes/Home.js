import React, { useEffect } from "react";
import { LandingIcon } from "../icons/MainIcons";
import Typed from "react-typed";
import "../../styles/Home.scss";

export const Home = () => {
  useEffect(() => {
    document.title = "Solomon Zelenko";
  }, []);

  return (
    <section className='pg home-pg'>
      <header role='banner'>
        <LandingIcon />
        {/* To do
          Add git hub stats 
          And some more quick links
        */}
        <h1 className='mega-header' role='presentation'>
          Codes&nbsp;&nbsp;
          <Typed
            strings={[
              "HTML",
              "CSS3",
              "React.js",
              "Node.js",
              "NoSQL",
              "SQL",
              "SASS",
              "Svelte",
              "Python",
              "Three.js",
              "Bash",
            ]}
            typeSpeed={145}
            backDelay={400}
            backSpeed={90}
            loop
          ></Typed>
        </h1>
      </header>
      <button className='btn-contact' data-text='Contact'>
        <span>Contact</span>
      </button>
      <button className='btn-resume' data-text='Resumé'>
        <span>Resumé</span>
      </button>
      <p className='hand'>← Try Swiping →</p>
    </section>
  );
};
