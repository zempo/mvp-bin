import React, { useContext } from 'react'
import bytesContext from "../../../../context/bytesContext";
import worksContext from "../../../../context/worksContext";
import styleContext from "../../../../context/styleContext";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "../../../../styles/Modal.scss";

export const ModalCarousel = ({imgSrcs, captions}) => {
    return (
        <>
        <Carousel>
            {imgSrcs.map((src, i) => (
            <div className='img-container'>
                <img src={src} alt={`Screenshot of the ${captions[i]}`}/>
                <p className='legend'>{captions[i]}</p>
            </div>
            ))}
        </Carousel>
        </>
    )
}

export const ModalControls = ({ hide }) => {
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
  
export const WorkModal = ({ item, type, hide }) => {
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
      status,
    } = currentWork[0];
  
    return (
      <div className={`modal-pg ${type}-modal`}>
        <h2>{title}</h2>
        <p>{desc}</p>
        <ModalControls hide={hide} />
      </div>
    );
  };
  
export const ByteModal = ({ item, type, hide }) => {
    const BytesContext = useContext(bytesContext);
    const { currentByte } = BytesContext;
    const {
      id,
      title,
      desc,
      link,
      github_repo,
      guest_creds,
      preview_img,
      code_embed,
    } = currentByte[0];
  
    return (
      <div className={`modal-pg ${type}-modal`}>
        <h2>{title}</h2>
        <p>{desc}</p>
        <ModalControls hide={hide} />
      </div>
    );
  };