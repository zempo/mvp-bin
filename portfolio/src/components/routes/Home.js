import React from "react";
import { LandingIcon } from "../icons/MainIcons";
import "../../styles/Home.scss";

export const Home = () => {
  return (
    <section className='pg home-pg'>
      <LandingIcon />
      {/* To do
          Add resume/contact btns
           Add git hub stats 
           And some more quick links
      */}
    </section>
  );
};
