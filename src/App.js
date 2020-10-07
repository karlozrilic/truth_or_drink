import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './components/pages/Home';
import ExtraDirty from './components/pages/ExtraDirty';
import HappyHour from './components/pages/HappyHour';
import LastCall from './components/pages/LastCall';
import OnTheRocks from './components/pages/OnTheRocks';

import Login from './components/pages/Login';
import Logout from './components/pages/Logout';

import Dashboard from './components/pages/Dashboard.js';
import HowToPlay from './components/pages/HowToPlay';
import Categories from './components/pages/Categories';

import UserInfo from './components/pages/dashboard/UserInfo';
import SuggestQuestion from './components/pages/dashboard/SuggestQuestion';

import jwt_decode from "jwt-decode";

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

function App() {
  const bckp = 'https://hn.algolia.com/api/v1/search?query=redux';
  const url = 'https://zrilich.pythonanywhere.com/api/v1/extraDirty/all';

  const footerUrls = ["/", "/dashboard/user-info", "/dashboard/suggest-question", "/how-to-play", "/categories"]

  if (localStorage.token == null) {
    localStorage.token = "";
  }

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  const [valid, setValid] = useState();

  useEffect(() => {
    setValid(checkExp);
  }, []);

  const checkExp = () => {
    const date = new Date();
    const trenutno = Math.floor(new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())/1000)
    if (localStorage.token != "") {
      if (jwt_decode(localStorage.token).exp > trenutno) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  return (
    <>
      <Router>
        <Navbar valid={valid} />
        <div className="cont">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/extradirty" exact component={ExtraDirty} />
            <Route path="/happyhour" exact component={HappyHour} />
            <Route path="/lastcall" exact component={LastCall} />
            <Route path="/ontherocks" exact component={OnTheRocks} />
            <Route path="/login" exact>
            {!valid ? <Login /> : <Redirect to="/dashboard/user-info" />}
            </Route>
            <Route path="/logout" exact>
              <Logout/>
              <Redirect to="/" />
            </Route>
            <Route path="/dashboard/user-info" exact >
              <Dashboard comp={UserInfo} current={0} />
            </Route>
            <Route path="/dashboard/suggest-question" exact >
              <Dashboard comp={SuggestQuestion} current={1} />
            </Route>
            <Route path="/how-to-play" exact component={HowToPlay}/>
            <Route path="/categories" exact component={Categories}/>

            
          </Switch>
          {footerUrls.includes(window.location.pathname) && <div className="push"></div> }
          
        </div>
        {footerUrls.includes(window.location.pathname) && <Footer /> }
      </Router>
     
      
    </>
  );
}

export default App;
