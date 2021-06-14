import React, { useEffect } from "react";
import { getClientTime } from "../../services/genService";
import { InlineWidget } from "react-calendly";
import "../../styles/pages/Contact.scss";

export const Contact = () => {
  useEffect(() => {
    document.title = "Contact";
  }, []);

  const calendlyStyles = {
    margin: `4rem auto 5rem`,
    height: `650px`,
  };

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
      <div className='calendly-container'>
        <InlineWidget
          styles={calendlyStyles}
          url='https://calendly.com/solomon-zelenko'
        />
      </div>
    </section>
  );
};
