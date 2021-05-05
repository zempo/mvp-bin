import React from "react";
import { Link } from "react-router-dom";
import {
  AboutIcon,
  BytesIcon,
  ContactIcon,
  HomeIcon,
  WorksIcon,
} from "../icons/MenuIcons";

export const Header = () => {
  return (
    <header>
      <nav>
        <li>
          <Link to='/'>
            <HomeIcon />
          </Link>
        </li>
        <li>
          <Link to='/about'>
            <AboutIcon />
          </Link>
        </li>
        <li>
          <Link to='/works'>
            <WorksIcon />
          </Link>
        </li>
        <li>
          <Link to='/bytes'>
            <BytesIcon />
          </Link>
        </li>
        <li>
          <Link to='/contact'>
            <ContactIcon />
          </Link>
        </li>
        <li>
          <Link to='/butt'>Error</Link>
        </li>
      </nav>
    </header>
  );
};
