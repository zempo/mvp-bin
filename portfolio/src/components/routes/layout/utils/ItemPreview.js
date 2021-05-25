import React from "react";

const ItemPreview = ({ payload, itemType }) => {
  const { id, title, type, preview_img } = payload;

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
          <button className={`open-item`}>
            <span>See More</span>
          </button>
        </div>
      </div>
    </li>
  );
};

export default ItemPreview;
