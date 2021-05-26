import React, { useContext } from "react";
import ReactDOM from "react-dom";
import styleContext from "../../../../context/styleContext";
import "../../../../styles/Modal.scss";

const WorkModal = ({ item, type, hide }) => {
  return <div className={`modal-pg ${type}-modal`}>{item}</div>;
};

const ByteModal = ({ item, type, hide }) => {
  return <div className={`modal-pg ${type}-modal`}>{item}</div>;
};

export const ItemModal = ({ item, type, isShowing, hide }) => {
  const StyleContext = useContext(styleContext);

  const { navOffset } = StyleContext;

  if (isShowing) {
    return ReactDOM.createPortal(
      <div onClick={hide} className='Modal'>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`Modal__outer ${isShowing}`}
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
