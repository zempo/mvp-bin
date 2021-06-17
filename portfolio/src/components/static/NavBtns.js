import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { getNextPg } from "../../services/navService";
import "../../styles/Static.scss";

export const SlideNavigation = (props) => {
  const { direction } = props;
  let location = useLocation();

  return (
    <>
      {location ? (
        <NavLink
          to={getNextPg(direction, location.pathname)}
          className={`side-nav-link nav-${direction}`}
          title={direction === "fwd" ? "Next" : "Prev"}
        >
          {direction === "fwd" ? <ArrowRight /> : <ArrowLeft />}
        </NavLink>
      ) : (
        <NavLink
          to={getNextPg(direction, "/home")}
          className={`side-nav-link nav-${direction}`}
          title={direction === "fwd" ? "Next" : "Prev"}
        >
          {direction === "fwd" ? <ArrowRight /> : <ArrowLeft />}
        </NavLink>
      )}
    </>
  );
};

export const ArrowRight = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='none'
      stroke='#3d3a3a'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      className='icon icon-tabler icon-tabler-chevron-right'
      viewBox='0 0 24 24'
    >
      <path stroke='none' d='M0 0h24v24H0z'></path>
      <path d='M9 6L15 12 9 18'></path>
    </svg>
  );
};

export const ArrowLeft = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='none'
      stroke='#3d3a3a'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      className='icon icon-tabler icon-tabler-chevron-left'
      viewBox='0 0 24 24'
    >
      <path stroke='none' d='M0 0h24v24H0z'></path>
      <path d='M15 6L9 12 15 18'></path>
    </svg>
  );
};

export const ArrowLast = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='none'
      viewBox='0 0 24 24'
    >
      <path
        xmlns='http://www.w3.org/2000/svg'
        fill='#0D0D0D'
        d='M5 7.766c0-1.554 1.696-2.515 3.029-1.715l7.056 4.234c1.295.777 1.295 2.653 0 3.43L8.03 17.949c-1.333.8-3.029-.16-3.029-1.715V7.766zM14.056 12L7 7.766v8.468L14.056 12zM18 6a1 1 0 011 1v10a1 1 0 11-2 0V7a1 1 0 011-1z'
      ></path>
    </svg>
  );
};

export const ArrowFirst = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      fill='none'
      viewBox='0 0 24 24'
    >
      <path
        xmlns='http://www.w3.org/2000/svg'
        fill='#0D0D0D'
        d='M19 7.766c0-1.554-1.696-2.515-3.029-1.715l-7.056 4.234c-1.295.777-1.295 2.653 0 3.43l7.056 4.234c1.333.8 3.029-.16 3.029-1.715V7.766zM9.944 12L17 7.766v8.468L9.944 12zM6 6a1 1 0 011 1v10a1 1 0 11-2 0V7a1 1 0 011-1z'
      ></path>
    </svg>
  );
};
