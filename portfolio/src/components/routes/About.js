import React, { useEffect } from "react";
import "../../styles/pages/About.scss";

export const About = () => {
  useEffect(() => {
    document.title = "About";
  }, []);

  return (
    <section className='pg about-pg'>
      <h1>Who is Solomon?</h1>
      <h2>
        I am a Full-Stack <span>Web Dev </span>
        living in <span>LA</span>.
      </h2>
    </section>
  );
};
