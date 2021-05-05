import React from "react";
import { SadIcon } from "../icons/StatusIcons";

export const Error = () => {
  return (
    <section className='pg err-pg'>
      <h1>Shit.</h1>
      <h2>This page does not exist right now...</h2>
      <SadIcon />
    </section>
  );
};
