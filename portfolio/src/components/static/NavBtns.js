import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { getNextPg } from "../../services/navService";

export const SlideNavigation = (props) => {
  const { direction } = props;
  let location = useLocation();

  return (
    <>
      {location ? (
        <NavLink to={getNextPg(direction, location.pathname)}>
          {direction === "fwd" ? <ArrowRight /> : <ArrowLeft />}
        </NavLink>
      ) : (
        <NavLink to={getNextPg(direction, "/home")}>
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
      stroke='currentColor'
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
      stroke='currentColor'
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
