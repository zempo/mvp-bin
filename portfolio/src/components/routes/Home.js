import React, { useEffect } from "react";
import { LandingIcon } from "../icons/MainIcons";
import Typed from "react-typed";
import pdf from "./layout/docs/resume.pdf";
import "../../styles/pages/Home.scss";

export const Home = () => {
  useEffect(() => {
    document.title = "Solomon Zelenko";
  }, []);

  const openResume = () => {
    window.open(pdf);
  };

  const handleContact = () => {
    window.open("https://calendly.com/solomon-zelenko");
  };

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
      <button
        className='btn-contact'
        data-text='Contact'
        onClick={handleContact}
      >
        <span>Contact</span>
      </button>
      <button className='btn-resume' data-text='Resumé' onClick={openResume}>
        <span>Resumé</span>
      </button>
      {/* back-burner task: implement swiping */}
      {/* <p className='hand'>← Try Swiping →</p> */}
    </section>
  );
};
