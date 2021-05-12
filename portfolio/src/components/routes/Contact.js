import React from "react";
import { getClientTime } from "../../services/genService";

export const Contact = () => {
  return (
    <section className='pg contact-pg'>
      <header>
        <h1>Let's get in touch!</h1>
        <h2 className='sub-head'>
          From <span>{getClientTime()[0]}</span> to{" "}
          <span>{getClientTime()[1]}</span>, your time <br />
          I'd be happy to chat with you.{" "}
        </h2>
      </header>
    </section>
  );
};
