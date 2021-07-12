// MAIN PAGES
import Home from "./pages/Home"
import MyDevices from './pages/MyDevices'
import Tools from "./pages/tools/Tools"
import Login from "./pages/Login"
import Logout from "./pages/Logout"

//TOOLS
import IosTools from "./pages/tools/ios/IosTools"
import RunningConfig from "./pages/tools/ios/RunningConfig";


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
          <Route path="/tools/ios/running-config" component={RunningConfig} />
          <Route exact path="/tools/ios" component={IosTools} />
          <Route exact path="/tools" component={Tools} />
          <Route path="/mydevices" component={MyDevices} />
          <Route path="/login" component={Login} />
          <Route path="/logout" component={Logout} />
          <Route exact path="/" component={Home} />
        </Switch>
      <Footer />
      </Router>
    </div>
  );
}

export default App;
