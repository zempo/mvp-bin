import React from "react";
import { returnYear } from "../../services/genService";
import "../../styles/Static.scss";
import {
  CodePen,
  GitHub,
  Instagram,
  LinkedIn,
  Medium,
} from "../icons/SocialIcons";

export const Footer = () => {
  return (
    <footer className='app-footer'>
      <nav className='social-nav' aria-label='social media nav'>
        <ul>
          <li>
            <a
              href='https://medium.com/@zelenkosolomon'
              target='_blank'
              rel='noopener noreferrer'
              title='Medium'
            >
              <Medium />
            </a>
          </li>
          <li>
            <a
              href='https://codepen.io/zemposPen'
              target='_blank'
              rel='noopener noreferrer'
              title='CodePen'
            >
              <CodePen />
            </a>
          </li>
          <li>
            <a
              href='https://github.com/zempo'
              target='_blank'
              rel='noopener noreferrer'
              title='GitHub'
            >
              <GitHub />
            </a>
          </li>
          <li>
            <a
              href='https://www.instagram.com/zempo_creates/'
              target='_blank'
              rel='noopener noreferrer'
              title='Instagram'
            >
              <Instagram />
            </a>
          </li>
          <li>
            <a
              href='https://www.linkedin.com/in/solomon-zelenko/'
              target='_blank'
              rel='noopener noreferrer'
              title='LinkedIn'
            >
              <LinkedIn />
            </a>
          </li>
        </ul>
      </nav>
      <h3>Let's code your vision.</h3>
      <p>&copy; {returnYear()} Solomon Zelenko &#8212; All rights reserved.</p>
      <p>Powered by Caffeine &amp;&amp; Stack Overflow.</p>
    </footer>
  );
};
