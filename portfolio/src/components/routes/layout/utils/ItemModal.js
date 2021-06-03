import React, { useContext } from "react";
import ReactDOM from "react-dom";
import styleContext from "../../../../context/styleContext";
import "../../../../styles/Modal.scss";

const ModalControls = ({ hide }) => {
  const StyleContext = useContext(styleContext);

  const { toggleModalWin, modalExpanded } = StyleContext;

  return (
    <div className='modal-controls' aria-label='window-controls'>
      <button
        className='close-modal modal-btn'
        onClick={hide}
        title='close'
      ></button>
      <button
        className='min-modal modal-btn'
        onClick={hide}
        title='hide'
      ></button>
      <button
        className='resize-modal modal-btn'
        onClick={toggleModalWin}
        title={`${modalExpanded ? "resize" : "expand"}`}
      ></button>
    </div>
  );
};

const WorkModal = ({ item, type, hide }) => {
  return (
    <div className={`modal-pg ${type}-modal`}>
      {item}
      <ModalControls hide={hide} />
    </div>
  );
};

const ByteModal = ({ item, type, hide }) => {
  return (
    <div className={`modal-pg ${type}-modal`}>
      {item}
      <ModalControls hide={hide} />
    </div>
  );
};

export const ItemModal = ({ item, type, isShowing, hide }) => {
  const StyleContext = useContext(styleContext);

  const { navOffset, modalExpanded } = StyleContext;

  const ModalStyles = modalExpanded
    ? {
        height: `calc(${navOffset}px`,
      }
    : {
        height: `calc(${navOffset}px - 6rem`,
        width: "calc(100% - 6rem)",
        top: "3rem",
        maxWidth: `1100px`,
      };

  if (isShowing) {
    return ReactDOM.createPortal(
      <div onClick={hide} className='Modal'>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`Modal__inner ${isShowing}`}
          style={ModalStyles}
        >
          {type === "work" ? (
            <WorkModal item={item} hide={hide} type={type} />
          ) : (
            <ByteModal item={item} hide={hide} type={type} />
          )}
        </div>
      </div>,
      document.querySelector("#modal")
    );
  } else {
    return null;
  }
};
