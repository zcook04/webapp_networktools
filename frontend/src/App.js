// MAIN PAGES
import Home from "./pages/Home"
import MyDevices from './pages/mydevices/MyDevices'
import Tools from "./pages/tools/Tools"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import Register from "./pages/Register"

//TOOLS
import IosTools from "./pages/tools/ios/IosTools"
import RunningConfig from "./pages/tools/ios/RunningConfig";

//CONFIGURE
import Configure from "./pages/configure/Configure"


// COMPONENTS
import Header from "./components/Header"
import Footer from "./components/Footer"

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
          <Route path="/register" component={Register} />
          <Route exact path="/" component={Home} />
          <Route exact path="/configure" component={Configure} />
        </Switch>
      <Footer />
      </Router>
    </div>
  );
}

export default App;
