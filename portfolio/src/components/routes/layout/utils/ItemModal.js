import React, { useContext } from "react";
import ReactDOM from "react-dom";
import styleContext from "../../../../context/styleContext";
import { ByteModal, WorkModal } from "./ModalUtils";
import "../../../../styles/Modal.scss";

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
