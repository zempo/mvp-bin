import React from "react";
import { returnYear } from "../../services/genService";
import "../../styles/Static.scss";

export const Footer = () => {
  return (
    <footer className='app-footer'>
      <h3>Code Your Vision&trade;</h3>
      <p>&copy; {returnYear()} Solomon Zelenko.</p>
      <p>All rights reserved. Powered by React.</p>
    </footer>
  );
};
