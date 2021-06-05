import React, { useContext } from "react";
import bytesContext from "../../../../context/bytesContext";
import worksContext from "../../../../context/worksContext";
import styleContext from "../../../../context/styleContext";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "../../../../styles/Modal.scss";

export const ModalCarousel = ({ imgSrcs, captions }) => {
  return (
    <>
      <Carousel>
        {imgSrcs.map((src, i) => (
          <div className='img-container'>
            <img src={src} alt={`Screenshot of the ${captions[i]}`} />
            <p className='legend'>{captions[i]}</p>
          </div>
        ))}
      </Carousel>
    </>
  );
};

export const ModalControls = ({ hide }) => {
  const StyleContext = useContext(styleContext);

  const { currWidth, toggleModalWin, modalExpanded } = StyleContext;

  const controlStyles = modalExpanded
    ? {
        close: {
          top: `0.4rem`,
          left: `0.41rem`,
        },
        min: {
          top: `0.4rem`,
          left: `2.12rem`,
        },
        resize: {
          top: `0.4rem`,
          left: `3.73rem`,
        },
      }
    : {
        close: {
          top: `3.4rem`,
          left: `${
            currWidth <= 1196 ? "3.41rem" : "calc(50vw - 550px + .41rem)"
          }`,
        },
        min: {
          top: `3.4rem`,
          left: `${
            currWidth <= 1196 ? "5.12rem" : "calc(50vw - 550px + 2.12rem)"
          }`,
        },
        resize: {
          top: `3.4rem`,
          left: `${
            currWidth <= 1196 ? "6.73rem" : "calc(50vw - 550px + 3.73rem)"
          }`,
        },
      };

  return (
    <div className='modal-controls' aria-label='pop-up controls'>
      <button
        className='close-modal modal-btn'
        onClick={hide}
        title='close'
        style={controlStyles.close}
      ></button>
      <button
        className='min-modal modal-btn'
        onClick={hide}
        title='hide'
        style={controlStyles.min}
      ></button>
      <button
        className='resize-modal modal-btn'
        onClick={toggleModalWin}
        title={`${modalExpanded ? "resize" : "expand"}`}
        style={controlStyles.resize}
      ></button>
    </div>
  );
};

export const WorkModal = ({ item, type, hide }) => {
  const WorksContext = useContext(worksContext);
  const { currentWork } = WorksContext;
  const {
    id,
    title,
    desc,
    github_repo,
    guest_creds,
    live_site,
    role,
    screenshots,
    screenshot_captions,
    status,
  } = currentWork[0];

  return (
    <div className={`modal-pg ${type}-modal`}>
      <ModalControls hide={hide} />
      <div className='modal-content'>
        <h1>{title}</h1>
        <h2>Status: {status}</h2>
        <ModalCarousel imgSrcs={screenshots} captions={screenshot_captions} />
        <div className='modal-desc'>{desc}</div>
      </div>
    </div>
  );
};

export const ByteModal = ({ item, type, hide }) => {
  const BytesContext = useContext(bytesContext);
  const { currentByte } = BytesContext;
  const {
    id,
    title,
    desc,
    link,
    github_repo,
    guest_creds,
    preview_img,
    code_embed,
  } = currentByte[0];

  return (
    <div className={`modal-pg ${type}-modal`}>
      <h2>{title}</h2>
      <p>{desc}</p>
      <ModalControls hide={hide} />
    </div>
  );
};
