import React, { useContext, useEffect } from "react";
import bytesContext from "../../context/bytesContext";
import ItemPreview from "./layout/utils/ItemPreview";
import { SearchForm } from "./layout/utils/SearchForm";
import "../../styles/pages/Bytes.scss";

export const Bytes = () => {
  const BytesContext = useContext(bytesContext);
  const { bytes, filteredBytes, getBytes, tags, currentTag } = BytesContext;

  useEffect(() => {
    document.title = "Bytes";

    getBytes()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getBytesCount = () => {
    let len = bytes.length;

    if (filteredBytes == null || currentTag === "show all") {
      return `Showing all ${len} bytes. You can filter apps by type or tech.`;
    } else {
      let fLen = filteredBytes.length;
      return `Showing ${fLen} of ${len} bytes — filtered by ${currentTag.toUpperCase()}.`;
    }
  };

  return (
    <section className='pg bytes-pg'>
      <header>
        <h1>How do I code?</h1>
        <h2 className='sub-head'>Bytes &#38;&#38; Snippets.</h2>
      </header>
      <SearchForm tags={tags} type='byte' />
      <div className='app-content bytes-container'>
        <p className='bytes-count'>{getBytesCount()}</p>
        <ul className='app-list bytes-list'>
          {filteredBytes != null
            ? filteredBytes.map((b) => (
                <ItemPreview itemType='byte' payload={b} key={b.id} />
              ))
            : bytes.map((b) => (
                <ItemPreview itemType='byte' payload={b} key={b.id} />
              ))}
        </ul> 
      </div>
    </section>
  );
}; 
