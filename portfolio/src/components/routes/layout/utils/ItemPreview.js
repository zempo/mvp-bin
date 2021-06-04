import React, { useContext } from "react";
import worksContext from "../../../../context/worksContext";
import bytesContext from "../../../../context/bytesContext";
import { useModal } from "../../../../hooks/useModal";
import { shortenWord } from "../../../../services/genService";
import { ItemModal } from "./ItemModal";

const ItemPreview = ({ payload, itemType }) => {
  const WorksContext = useContext(worksContext);
  const { setCurrentWork } = WorksContext;
  const BytesContext = useContext(bytesContext);
  const { setCurrentByte } = BytesContext;
  const { isShowing: isShowingItemPreview, toggle: toggleItemPreview } =
    useModal();
  const { id, title, type, preview_img } = payload;

  const openItem = () => {
    if (itemType === "work") {
      setCurrentWork(id);
      toggleItemPreview();
    } else {
      setCurrentByte(id);
      toggleItemPreview();
    }
  };

  return (
    <li className={`list-item ${itemType}-list-item`}>
      <span>{shortenWord(title, 25)}</span>
      <div className='img-wrapper-outer'>
        <div className='img-wrapper-inner'>
          <img
            src={preview_img}
            alt={`${itemType === "work" ? "Landing page" : "Preview"} for ${
              itemType !== "work"
                ? `my ${type} named,`
                : `my ${type} project named,`
            } '${title}'.`}
          />
          <div className={`ribbon ribbon-${type}`}>
            <span>{type}</span>
          </div>
          <button className={`open-item`} onClick={openItem}>
            <span>See More</span>
          </button>
        </div>
      </div>
      <ItemModal
        item={id}
        type={itemType}
        isShowing={isShowingItemPreview}
        hide={toggleItemPreview}
      />
    </li>
  );
};

export default ItemPreview;
