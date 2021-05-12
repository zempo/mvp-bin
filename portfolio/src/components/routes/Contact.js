import React, { useEffect } from "react";
import { getClientTime } from "../../services/genService";

export const Contact = () => {
  useEffect(() => {
    document.title = "Contact";
  }, []);

  return (
    <section className='pg contact-pg'>
      <header>
        <h1>Let's get in touch!</h1>
        <h2 className='sub-head'>
          I am free from <span>{getClientTime()[0].replace(":00 ", "")}</span>{" "}
          to <span>{getClientTime()[1].replace(":30 ", "")}</span>.
        </h2>
        <h2 className='sub-head'>Your local time.</h2>
      </header>
    </section>
  );
};
