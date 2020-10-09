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
import MySuggestions from './components/pages/dashboard/MySuggestions';

import jwt_decode from "jwt-decode";

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

function App() {
  const bckp = 'https://hn.algolia.com/api/v1/search?query=redux';
  const url = 'https://zrilich.pythonanywhere.com/api/v1/extraDirty/all';

  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  const footerUrls = ["/", "/dashboard/user-info", "/dashboard/suggest-question", "/dashboard/my-suggestions", "/how-to-play", "/categories"]

  if (localStorage.token == null) {
    localStorage.token = "";
  }

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  const [valid, setValid] = useState();

  const [currentURL, setCurrentURL] = useState("/");

  const checkIfUsesFooter = () => {
    setCurrentURL(window.location.pathname);
  };

  useEffect(() => {
    setValid(checkExp);
    checkIfUsesFooter();
  }, []);

  const checkExp = () => {
    const date = new Date();
    const trenutno = Math.floor(new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())/1000)
    if (localStorage.token != "") {
      if (jwt_decode(localStorage.token).exp > trenutno) {
        return true;
      } else {
        localStorage.token = "";
        return false;
      }
    } else {
      return false;
    }
  }

  return (
    <>
      <Router forceRefresh={true}>
        <Navbar valid={valid} />
        <div className="cont">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/extradirty" exact component={ExtraDirty} />
            <Route path="/happyhour" exact component={HappyHour} />
            <Route path="/lastcall" exact component={LastCall} />
            <Route path="/ontherocks" exact component={OnTheRocks} />
            <Route path="/how-to-play" exact component={HowToPlay}/>
            <Route path="/categories" exact component={Categories}/>
            <Route path="/login" exact>
              {!valid ? <Login /> : <Redirect push to="/dashboard/user-info" />}
            </Route>
            <Route path="/logout" exact>
                <Logout/>
            </Route>
            {valid && 
            <>
              <Route path="/dashboard" exact>
                <Redirect push to="/dashboard/user-info" />
              </Route>
              <Route path="/dashboard/user-info" exact >
                <Dashboard token={localStorage.token} comp={UserInfo} current={0} />
              </Route>
              <Route path="/dashboard/suggest-question" exact >
                <Dashboard token={localStorage.token} comp={SuggestQuestion} current={1} />
              </Route>
              <Route path="/dashboard/my-suggestions" exact >
                <Dashboard token={localStorage.token} comp={MySuggestions} current={2} />
              </Route>
            </>
            }
          </Switch>
          {footerUrls.includes(currentURL) && <div className="push"></div> }
          
        </div>
        {footerUrls.includes(currentURL) && <Footer /> }
      </Router>
     
      
    </>
  );
}

export default App;
