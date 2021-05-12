import React from "react";
import { NavLink } from "react-router-dom";
import {
  AboutIcon,
  BytesIcon,
  ContactIcon,
  HomeIcon,
  WorksIcon,
} from "../icons/MenuIcons";
import "../../styles/Static.scss";

export const Header = () => {
  return (
    <header>
      <nav className='main-nav' aria-label='Global Navigation'>
        <ul className='nav-link-list'>
          <li>
            <NavLink exact to='/' activeClassName='link-active'>
              <HomeIcon /> <br />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/about' activeClassName='link-active'>
              <AboutIcon /> <br />
              About
            </NavLink>
          </li>
          <li>
            <NavLink to='/works' activeClassName='link-active'>
              <WorksIcon /> <br />
              Works
            </NavLink>
          </li>
          <li>
            <NavLink to='/bytes' activeClassName='link-active'>
              <BytesIcon /> <br />
              Bytes
            </NavLink>
          </li>
          <li>
            <NavLink to='/contact' activeClassName='link-active'>
              <ContactIcon /> <br />
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
