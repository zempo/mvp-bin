import React, { useContext, useState } from "react";
import ReactEmbedGist from "react-embed-gist";
import bytesContext from "../../../../context/bytesContext";
import worksContext from "../../../../context/worksContext";
import styleContext from "../../../../context/styleContext";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "../../../../styles/Modal.scss";
import { capitalizeStr, splitParas } from "../../../../services/genService";
import {
  ExternalLink,
  CredsIcon,
  PlusIcon,
  MinusIcon,
  CopyIcon,
  Copied,
} from "../../../icons/StatusIcons";
import {
  ArrowFirst,
  ArrowLeft,
  ArrowRight,
  ArrowLast,
} from "../../../static/NavBtns";
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

export const GuestCreds = ({ creds }) => {
  const [open, setOpen] = useState(false);
  const [copiedCreds, setCopiedCreds] = useState({
    email: false,
    pwd: false,
  });

  const toggleCreds = () => {
    setOpen(!open);
  };

  const copyCred = (field, txt) => {
    navigator.clipboard.writeText(txt);

    setCopiedCreds({
      ...copiedCreds,
      [`${field}`]: true,
    });

    setTimeout(() => {
      setCopiedCreds({
        ...copiedCreds,
        [`${field}`]: false,
      });
    }, 1000);
  };

  return (
    <div
      aria-label='guest credentials'
      className='guest-creds'
      title={`${open ? "Hide guest creds" : "View guest creds"}`}
    >
      <div className='guest-head' onClick={toggleCreds}>
        <p>
          {" "}
          <CredsIcon /> Guest Credentials
        </p>
        {open ? <PlusIcon /> : <MinusIcon />}
      </div>
      <ul style={{ display: `${open ? "block" : "none"}` }}>
        <li>
          <b>Email</b> <br />
          <span
            className={`email-${copiedCreds.email ? "active" : ""}`}
            onClick={() => copyCred("email", creds.email)}
          >
            {creds.email} {copiedCreds.email ? <Copied /> : <CopyIcon />}
          </span>
        </li>
        <li>
          <b>Password</b> <br />
          <span
            className={`pwd-${copiedCreds.pwd ? "active" : ""}`}
            onClick={() => copyCred("pwd", creds.password)}
          >
            {"*".repeat(creds.password.length)}{" "}
            {copiedCreds.pwd ? <Copied /> : <CopyIcon />}
          </span>
        </li>
      </ul>
    </div>
  );
};

export const ModalNav = ({ item, modalType }) => {
  const WorksContext = useContext(worksContext);
  const { paginateWork, checkBtnStatus } = WorksContext;
  const BytesContext = useContext(bytesContext);
  const { paginateByte, checkByteBtnStatus } = BytesContext;

  if (modalType === "work") {
    const handleWorkPagination = (e, type) => {
      e.preventDefault();
      paginateWork(item, type);
    };

    return (
      <div
        aria-label='Pagination Navigation'
        role='navigation'
        className='modal-pagination'
      >
        <button
          className='pagination-btn'
          onClick={(e) => handleWorkPagination(e, "first")}
          disabled={checkBtnStatus(item, "first")}
        >
          <ArrowFirst />
        </button>
        <button
          className='pagination-btn'
          onClick={(e) => handleWorkPagination(e, "prev")}
          disabled={checkBtnStatus(item, "prev")}
        >
          <ArrowLeft />
        </button>
        <button
          className='pagination-btn'
          onClick={(e) => handleWorkPagination(e, "next")}
          disabled={checkBtnStatus(item, "next")}
        >
          <ArrowRight />
        </button>
        <button
          className='pagination-btn'
          onClick={(e) => handleWorkPagination(e, "last")}
          disabled={checkBtnStatus(item, "last")}
        >
          <ArrowLast />
        </button>
      </div>
    );
  } else {
    const handleBytePagination = (e, type) => {
      e.preventDefault();
      paginateByte(item, type);
    };

    return (
      <div
        aria-label='Pagination Navigation'
        role='navigation'
        className='modal-pagination'
      >
        <button
          className='pagination-btn'
          onClick={(e) => handleBytePagination(e, "first")}
          disabled={checkByteBtnStatus(item, "first")}
        >
          <ArrowFirst />
        </button>
        <button
          className='pagination-btn'
          onClick={(e) => handleBytePagination(e, "prev")}
          disabled={checkByteBtnStatus(item, "prev")}
        >
          <ArrowLeft />
        </button>
        <button
          className='pagination-btn'
          onClick={(e) => handleBytePagination(e, "next")}
          disabled={checkByteBtnStatus(item, "next")}
        >
          <ArrowRight />
        </button>
        <button
          className='pagination-btn'
          onClick={(e) => handleBytePagination(e, "last")}
          disabled={checkByteBtnStatus(item, "last")}
        >
          <ArrowLast />
        </button>
      </div>
    );
  }
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
    <div className={`modal-pg ${modalType}-modal`} id={id}>
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
        {guest_creds ? <GuestCreds creds={guest_creds} /> : null}
        <ModalCarousel imgSrcs={screenshots} captions={screenshot_captions} />
        <hr />
        <div className='modal-desc'>
          <h3>Project Role: {role}</h3>
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
        <ModalNav item={id} modalType={modalType} />
      </div>
    </div>
  );
};

export const ByteModal = ({ item, modalType, hide }) => {
  const BytesContext = useContext(bytesContext);
  const { currentByte } = BytesContext;
  const { id, title, type, desc, link, github_repo, preview_img, code_embed } =
    currentByte[0];

  return (
    <div className={`modal-pg ${modalType}-modal`} id={id}>
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
        {code_embed ? (
          <>
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
            <hr />
            <ModalNav item={id} modalType={modalType} />
            <br />
            <ReactEmbedGist gist={getGist(github_repo)} />
            <ModalNav item={id} modalType={modalType} />
          </>
        ) : (
          <>
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
            <hr />
            <img
              className='modal-preview'
              src={preview_img}
              alt={`Preview for ${type} named, "${title}".`}
            />
            <ModalNav item={id} modalType={modalType} />
          </>
        )}
      </div>
    </div>
  );
};
