import React, { useEffect } from "react";

export const Bytes = () => {
  useEffect(() => {
    document.title = "Home";
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
