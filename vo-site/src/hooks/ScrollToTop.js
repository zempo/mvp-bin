import { useEffect } from "react";
import { withRouter } from "react-router-dom";

/*
USAGE
------------------------------
import ScrollToTop from "./hooks/ScrollToTop";
  export const App = () => {
    return (
      <>
        <ScrollToTop />
        <main>
          <Switch>
            {Children...}
          </Switch>
        </main>
      </>
    )
  }
  -------------------------
 * 
*/

function ScrollToTop({ history }) {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export default withRouter(ScrollToTop);
