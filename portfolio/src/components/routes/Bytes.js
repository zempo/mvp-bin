import React, { useEffect } from "react";
import "../../styles/pages/Bytes.scss";

export const Bytes = () => {
  useEffect(() => {
    document.title = "Bytes";
  }, []);

  return (
    <section className='pg bytes-pg'>
      <header>
        <h1>How do I code?</h1>
        <h2 className='sub-head'>Bytes &#38;&#38; Snippets.</h2>
      </header>
      {/* todo: 3 tabs (Articles/Talks + Code Samples + 3d Art) */}
    </section>
  );
};
