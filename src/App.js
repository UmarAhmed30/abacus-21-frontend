import React, { Component, useState, useContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory, withRouter } from 'react-router-dom'
import Cookies from "js-cookie"
import './App.css';

import Homepage from './pages/Homepage/Homepage';
import AboutUs from './pages/About-Us/AboutUs';
import Events from './pages/Events/Events';
import Workshops from './pages/Workshops/Workshops';
import { Footer } from './components/Footer/Footer';
import EventTemplate from './components/EventTemplate/EventTemplate';
import TechEvents from './pages/Events/TechEvents';
import NonTechEvents from './pages/Events/NonTechEvents';
import Dashboard from './pages/Dashboard/Dashboard'

import LoginRegister from './pages/LoginRegister/LoginRegister.js'
import ForgotPassword from './pages/ForgotPassword/ForgotPassword.js'
import Navbar from './components/Navbar/Navbar';

// import AuthApi from "./api/AuthApi"

// componentWillUnmount() {
//   window.removeEventListener('resize', this.updateWindowDimensions);
// }

export const AuthApi = React.createContext();
export const SetAuthApi = React.createContext();

function App() {
  const [auth, setauth] = useState(false)
  const [width, setwidth] = useState(0)
  const [height, setheight] = useState(0)

  const history = useHistory()

  useEffect(() => {
    updateWindowDimensions();
    window.addEventListener('resize', updateWindowDimensions);
    return () => {

    }
  }, [])


  const updateWindowDimensions = () => {
    setwidth(window.innerWidth)
    setheight(window.innerHeight)
  }



  return (
    <div className="App">
      <AuthApi.Provider value={auth}>
        <SetAuthApi.Provider value={setauth}>
          <Router>
            <Navbar width={width} />

            <Routes />
            <Footer />
          </Router>
        </SetAuthApi.Provider>
      </AuthApi.Provider>

    </div>
  )
}

const Routes = () => {
  const Auth = React.useContext(AuthApi)
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/homepage" />
      </Route>
      <Route path="/homepage" exact component={Homepage} />
      <Route path="/about-us" exact component={AboutUs} />
      <Route path="/events" exact component={Events} />
      <Route path="/workshops" exact component={Workshops} />

      <Route path="/tech-events" exact component={TechEvents} />
      <Route path="/non-tech-events" exact component={NonTechEvents} />

      <Route path="/event-template" exact component={EventTemplate} />

      <Route path="/forgot-password" exact component={ForgotPassword} />
      <Route path="/login-register" exact component={LoginRegister} />
      <ProtectedRoute path="/dashboard" auth={Auth} exact component={Dashboard} />
    </Switch>
  )
}

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (auth) {
          return <Component />
        }
        else {
          return <Redirect to="/login-register"></Redirect>
        }
      }} />
  )
}

export default (App)