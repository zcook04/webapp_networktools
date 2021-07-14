// MAIN PAGES
import Home from "./pages/Home"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import Register from "./pages/Register"

//TOOLS
import Tools from "./pages/tools/Tools"
import IosTools from "./pages/tools/ios/IosTools"
import RunningConfig from "./pages/tools/ios/RunningConfig";

//CONFIGURE
import Configure from "./pages/configure/Configure"

//MYDEVICES
import DeviceInfo from "./pages/mydevices/DeviceInfo"
import MyDevices from './pages/mydevices/MyDevices'

// COMPONENTS
import Header from "./components/Header"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"

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
      <ScrollToTop />
        <Switch>
          <Route path="/tools/ios/running-config" component={RunningConfig} />
          <Route exact path="/tools/ios" component={IosTools} />
          <Route exact path="/tools" component={Tools} />
          <Route exact path="/mydevices" component={MyDevices} />
          <Route path="/mydevices/:deviceid" component={DeviceInfo} />
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
