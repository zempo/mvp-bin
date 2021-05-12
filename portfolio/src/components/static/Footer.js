import React from "react";
import { returnYear } from "../../services/genService";
import "../../styles/Static.scss";

export const Footer = () => {
  return (
    <footer className='app-footer'>
      <h3>Let's code your vision.</h3>
      <p>&copy; {returnYear()} Solomon Zelenko &#8212; All rights reserved.</p>
      <p>Powered by Caffeine &amp;&amp; Determination.</p>
    </footer>
  );
};
