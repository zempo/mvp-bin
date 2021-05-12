import React from "react";
import { SadIcon } from "../icons/StatusIcons";

export const Error = () => {
  return (
    <section className='pg err-pg'>
      <header>
        <h1>Uh Oh.</h1>
        <h2 className='sub-head'>This page does not exist right now...</h2>
        <SadIcon />
      </header>
    </section>
  );
};
