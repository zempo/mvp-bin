import React, { useContext } from "react";
import ReactEmbedGist from "react-embed-gist";
import bytesContext from "../../../../context/bytesContext";
import worksContext from "../../../../context/worksContext";
import styleContext from "../../../../context/styleContext";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "../../../../styles/Modal.scss";
import { capitalizeStr, splitParas } from "../../../../services/genService";
import { ExternalLink } from "../../../icons/StatusIcons";
import { GitHub } from "../../../icons/SocialIcons";
import { getEmoji, getGist } from "../../../../services/queryService";

export const ModalCarousel = ({ imgSrcs, captions }) => {
  return (
    <>
      <Carousel>
        {imgSrcs.map((src, i) => (
          <div className='img-container' key={i}>
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

export const GuestCreds = () => {
  return (
    <div aria-label='guest credentials'>
      <h3>
        {" "}
        <GuestCreds /> Guest Credentials
      </h3>
    </div>
  );
};

export const WorkModal = ({ item, modalType, hide }) => {
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
    <div className={`modal-pg ${modalType}-modal`}>
      <ModalControls hide={hide} />
      <header>
        <h1>{title}</h1>
        <h2>Status: {status}</h2>
      </header>
      <div className='modal-content'>
        <div className='modal-links'>
          <a href={live_site} target='_blank' rel='noopener noreferrer'>
            <ExternalLink />
            Visit the Site
          </a>
          {github_repo ? (
            <a href={github_repo} target='_blank' rel='noopener noreferrer'>
              <GitHub />
              Project Repo
            </a>
          ) : null}
        </div>
        <ModalCarousel imgSrcs={screenshots} captions={screenshot_captions} />
        <div className='modal-desc'>
          <p>
            {splitParas(desc).map((s, i) =>
              s.includes("NOTE") ? (
                <span key={i} className='note'>
                  *{s}*
                </span>
              ) : (
                <span key={i}>{s} </span>
              )
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ByteModal = ({ item, modalType, hide }) => {
  const BytesContext = useContext(bytesContext);
  const { currentByte } = BytesContext;
  const {
    id,
    title,
    type,
    desc,
    link,
    github_repo,
    guest_creds,
    preview_img,
    code_embed,
  } = currentByte[0];

  return (
    <div className={`modal-pg ${modalType}-modal`}>
      <ModalControls hide={hide} />
      <header>
        <h1>{title}</h1>
        <h2>Type: {getEmoji(type)}</h2>
      </header>
      <div className='modal-content'>
        <div className='modal-links'>
          {link ? (
            <a href={link} target='_blank' rel='noopener noreferrer'>
              <ExternalLink />
              View this {capitalizeStr(type)}
            </a>
          ) : null}
          {github_repo ? (
            <a href={github_repo} target='_blank' rel='noopener noreferrer'>
              <GitHub />
              {capitalizeStr(type)} Repo
            </a>
          ) : null}
        </div>
      </div>
      {code_embed ? (
        <ReactEmbedGist gist={getGist(github_repo)} />
      ) : (
        <img
          className='modal-preview'
          src={preview_img}
          alt={`Preview for ${type} named, "${title}".`}
        />
      )}
    </div>
  );
};
