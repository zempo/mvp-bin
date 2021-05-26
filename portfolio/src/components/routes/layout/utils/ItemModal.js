import React from "react";
import ReactDOM from "react-dom";
import "../../../../styles/Modal.scss";

const WorkModal = ({ item, type, hide }) => {
  return <div className={`modal-pg ${type}-modal`}>{item}</div>;
};

const ByteModal = ({ item, type, hide }) => {
  return <div className={`modal-pg ${type}-modal`}>{item}</div>;
};

export const ItemModal = ({ item, type, isShowing, hide }) => {
  if (isShowing) {
    return ReactDOM.createPortal(
      <div onClick={hide} className='Modal'>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`Modal__inner ${isShowing}`}
        >
          {type === "work" ? (
            <WorkModal item={item} hide={hide} />
          ) : (
            <ByteModal item={item} hide={hide} />
          )}
        </div>
      </div>,
      document.querySelector("#modal")
    );
  } else {
    return null;
  }
};
