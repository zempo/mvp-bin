import React from "react";
import ReactDOM from "react-dom";

const WorkModal = ({ item, type, payload, cancel }) => {
  return <div className={`modal-pg ${type}-modal`}>{item}</div>;
};

const ByteModal = ({ item, type, payload, cancel }) => {
  return <div className={`modal-pg ${type}-modal`}>{item}</div>;
};

export const ItemModal = ({ item, type, payload, isShowing, hide }) => {
  if (isShowing) {
    return ReactDOM.createPortal(
      <div onClick={hide} className='Modal'>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`Modal__inner ${isShowing}`}
        >
          {type === "work" ? <WorkModal /> : <ByteModal />}
        </div>
      </div>
    );
  } else {
    return null;
  }
};
