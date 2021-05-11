import React from "react";
import { NavLink } from "react-router-dom";
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
      <nav className='main-nav'>
        <ul>
          <li>
            <NavLink exact to='/' activeClassName='link-active'>
              <HomeIcon />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/about' activeClassName='link-active'>
              <AboutIcon />
              About
            </NavLink>
          </li>
          <li>
            <NavLink to='/works' activeClassName='link-active'>
              <WorksIcon />
              Works
            </NavLink>
          </li>
          <li>
            <NavLink to='/bytes' activeClassName='link-active'>
              <BytesIcon />
              Bytes
            </NavLink>
          </li>
          <li>
            <NavLink to='/contact' activeClassName='link-active'>
              <ContactIcon />
              Contact
            </NavLink>
          </li>
          {/* <li>
            <NavLink to='/err'>Error</NavLink>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};
