// PAGES
import RunningConfig from "./pages/RunningConfig";
import Home from "./pages/Home"
import Blog from "./pages/Blog"
import About from "./pages/About"
import Tools from "./pages/Tools"
import Login from "./pages/Login"

// COMPONENTS
import Header from "./components/header"
import Footer from "./components/footer"

// MODULES
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
      <Header />
        <Switch>
          <Route path="/running-config"><RunningConfig/></Route>
          <Router path="/blog"><Blog/></Router>
          <Router path="/about"><About/></Router>
          <Router path="/tools"><Tools/></Router>
          <Router path="/login"><Login/></Router>
          <Route path="/" exact><Home/></Route>
        </Switch>
      <Footer />
      </Router>
    </div>
  );
}

export default App;
