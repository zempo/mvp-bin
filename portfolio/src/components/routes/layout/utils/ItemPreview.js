import React, { useContext } from "react";
import worksContext from "../../../../context/worksContext";
import { useModal } from "../../../../hooks/useModal";
import { ItemModal } from "./ItemModal";

const ItemPreview = ({ payload, itemType }) => {
  const WorksContext = useContext(worksContext);
  const { setCurrentWork, currentWork } = WorksContext;
  const { isShowing: isShowingItemPreview, toggle: toggleItemPreview } =
    useModal();
  const { id, title, type, preview_img } = payload;

  const openItem = () => {
    setCurrentWork(id);

    toggleItemPreview();
  };

  return (
    <li className={`list-item ${itemType}-list-item`}>
      <span>{title}</span>
      <div className='img-wrapper-outer'>
        <div className='img-wrapper-inner'>
          <img src={preview_img} alt={`Preview for ${title} ${itemType}.`} />
          {itemType === "work" ? (
            <div className={`ribbon ribbon-${type}`}>
              <span>{type}</span>
            </div>
          ) : null}
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
