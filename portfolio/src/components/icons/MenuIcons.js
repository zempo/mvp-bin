import React from "react";

export const HomeIcon = () => {
  return <p>Home</p>;
};

export const AboutIcon = () => {
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
      className='icon icon-tabler icon-tabler-info-circle'
      viewBox='0 0 24 24'
    >
      <path stroke='none' d='M0 0h24v24H0z'></path>
      <circle cx='12' cy='12' r='9'></circle>
      <path d='M12 8L12.01 8'></path>
      <path d='M11 12L12 12 12 16 13 16'></path>
    </svg>
  );
};

export const WorksIcon = () => {
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
      className='icon icon-tabler icon-tabler-folder'
      viewBox='0 0 24 24'
    >
      <path stroke='none' d='M0 0h24v24H0z'></path>
      <path d='M5 4h4l3 3h7a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2'></path>
    </svg>
  );
};

export const BytesIcon = () => {
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
      className='icon icon-tabler icon-tabler-code'
      viewBox='0 0 24 24'
    >
      <path stroke='none' d='M0 0h24v24H0z'></path>
      <path d='M7 8L3 12 7 16'></path>
      <path d='M17 8L21 12 17 16'></path>
      <path d='M14 4L10 20'></path>
    </svg>
  );
};

export const ContactIcon = () => {
  // Either this or envelope
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
      className='icon icon-tabler icon-tabler-send'
      viewBox='0 0 24 24'
    >
      <path stroke='none' d='M0 0h24v24H0z'></path>
      <path d='M10 14L21 3'></path>
      <path d='M21 3l-6.5 18a.55.55 0 01-1 0L10 14l-7-3.5a.55.55 0 010-1L21 3'></path>
    </svg>
  );
};
