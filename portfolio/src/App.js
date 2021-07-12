import { Route, Switch } from "react-router";
import ScrollToTop from "./hooks/ScrollToTop";
// Static
import { Header } from "./components/static/Header";
import { Footer } from "./components/static/Footer";
import { SlideNavigation } from "./components/static/NavBtns";
// Routes
import { Home } from "./components/routes/Home";
import { About } from "./components/routes/About";
import { Bytes } from "./components/routes/Bytes";
import { Contact } from "./components/routes/Contact";
import { Works } from "./components/routes/Works";
// Error/Missing
import { Error } from "./components/routes/Error";
import "./styles/Animations.scss";
import "./styles/Global.scss";

function App() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <main>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/works' component={Works} />
          <Route exact path='/bytes' component={Bytes} />
          <Route exact path='/contact' component={Contact} />
          <Route path='*' component={Error} />
        </Switch>
        <nav className='side-nav' aria-label='Secondary Navigation'>
          <SlideNavigation direction='prev' />
          <SlideNavigation direction='fwd' />
        </nav>
      </main>
      <Footer />
    </>
  );
}

export default App;
