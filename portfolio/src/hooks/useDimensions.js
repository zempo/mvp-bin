import { useContext, useLayoutEffect, useRef, useState } from "react";
import styleContext from "../context/styleContext";

/**
 * Hook Creator: https://swizec.com/blog/usedimensions-a-react-hook-to-measure-dom-nodes/
 * GitHub: https://github.com/Swizec/useDimensions
 *
 * This hook has been modified to work on window resize
 */

export const useDimensions = () => {
  const ref = useRef();
  const [dimensions, setDimensions] = useState({});
  const StyleContext = useContext(styleContext);
  const { setOffset } = StyleContext;

  useLayoutEffect(() => {
    function handleResize() {
      setDimensions(ref.current.getBoundingClientRect().toJSON());

      setOffset(ref.current.offsetTop);
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);

    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  return [ref, dimensions];
};
