import React, { useContext } from "react";
import ReactDOM from "react-dom";
import styleContext from "../../../../context/styleContext";
import "../../../../styles/Modal.scss";

const ModalControls = ({ hide }) => {
  const StyleContext = useContext(styleContext);

  const { toggleModalWin } = StyleContext;

  return (
    <div className='modal-controls' aria-label='window-controls'>
      <button className='close-modal' onClick={hide}></button>
      <button className='min-modal' onClick={hide}></button>
      <button className='resize-modal' onClick={toggleModalWin}></button>
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
        height: `calc(${navOffset}px - .44rem`,
      }
    : {
        height: `calc(${navOffset}px - .44rem - 5rem`,
        width: "85%",
        top: "2.5rem",
      };

  if (isShowing) {
    return ReactDOM.createPortal(
      <div onClick={hide} className='Modal'>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`Modal__outer ${isShowing}`}
          style={ModalStyles}
        >
          <div className={`Modal__inner`}>
            {type === "work" ? (
              <WorkModal item={item} hide={hide} type={type} />
            ) : (
              <ByteModal item={item} hide={hide} type={type} />
            )}
          </div>
        </div>
      </div>,
      document.querySelector("#modal")
    );
  } else {
    return null;
  }
};
