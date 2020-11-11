import React, { useState, useEffect } from 'react';
import './App.css';
import moment from 'moment';
import { BrowserView, MobileView } from "react-device-detect";
import AppAds from './components/AppAds';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './components/pages/Home';
import ExtraDirty from './components/pages/ExtraDirty';
import HappyHour from './components/pages/HappyHour';
import LastCall from './components/pages/LastCall';
import OnTheRocks from './components/pages/OnTheRocks';

import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Logout from './components/pages/Logout';

import Dashboard from './components/pages/Dashboard.js';
import HowToPlay from './components/pages/HowToPlay';
import Categories from './components/pages/Categories';

import NotFound from './components/pages/NotFound';

import UserInfo from './components/pages/dashboard/UserInfo';
import SuggestQuestion from './components/pages/dashboard/SuggestQuestion';
import MySuggestions from './components/pages/dashboard/MySuggestions';

import jwt_decode from "jwt-decode";

import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

function App() {
  /* fix for mobile viewport height */
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  const footerUrls = ["/", "/dashboard/user-info", "/dashboard/suggest-question", "/dashboard/my-suggestions", "/how-to-play", "/categories"]

  if (localStorage.token == null) {
    localStorage.token = "";
  }

  /*
  Sada: 1605012905724

  Za 15 dana: 1606308833761
  */

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  const [valid, setValid] = useState();
  const [currentURL, setCurrentURL] = useState("/");
  const [displaySmartBanner, setDisplaySmartBanner] = useState(false);
  const checkIfUsesFooter = () => {
    setCurrentURL(window.location.pathname);
  };

  useEffect(() => {
    setValid(checkExp);
    checkIfUsesFooter();
    setDisplaySmartBanner(checkSmartBanner);
  }, []);

  const checkExp = () => {
    const date = new Date();
    const trenutno = Math.floor(new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())/1000)
    if (localStorage.token != "") {
      /*
      if (jwt_decode(localStorage.token).exp > trenutno) {
        return true;
      } else {
        localStorage.token = "";
        return false;
      }
      */
      return true;
    } else {
      return false;
    }
  };

  const checkSmartBanner = () => {
    const sada = moment().valueOf();
    const za15dana = localStorage.smartBannerTime;
    if (za15dana == null || za15dana == "") {
      return true;
    } else {
      if (sada >= za15dana) {
        localStorage.smartBannerTime = null;
        return true;
      } else {
        return false;
      }
    }
  };

  const hideSmartBanner = () => {
    setDisplaySmartBanner(false);
    localStorage.smartBannerTime = moment().add(15, "days").valueOf();
  };

  return (
    <>
    <noscript>You need to enable JavaScript to run this app.</noscript>
      <Router forceRefresh={true}>
        {currentURL !== "/app-ads.txt" &&<Navbar valid={valid} />}
        <div className="cont">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/app-ads.txt" exact component={AppAds} />
            <Route path="/extradirty" exact component={ExtraDirty} />
            <Route path="/happyhour" exact component={HappyHour} />
            <Route path="/lastcall" exact component={LastCall} />
            <Route path="/ontherocks" exact component={OnTheRocks} />
            <Route path="/how-to-play" exact component={HowToPlay}/>
            <Route path="/categories" exact component={Categories}/>
            <Route path="/login" exact>
              {!valid ? <Login /> : <Redirect push to="/dashboard/user-info" />}
            </Route>
            <Route path="/register" exact>
              {localStorage.token == "" ? <Register /> : <Redirect push to="/dashboard/user-info" />}
            </Route>
            <Route path="/logout" exact>
                <Logout/>
            </Route>

            <Route path="/dashboard/user-info" exact >
              {valid ? <Dashboard token={localStorage.token} comp={UserInfo} current={0} />:<Route component={NotFound} /> }
            </Route>
            <Route path="/dashboard/suggest-question" exact >
              {valid ? <Dashboard token={localStorage.token} comp={SuggestQuestion} current={1} />:<Route component={NotFound} /> }
            </Route>
            <Route path="/dashboard/my-suggestions" exact >
              {valid ? <Dashboard token={localStorage.token} comp={MySuggestions} current={2} />:<Route component={NotFound} /> }
            </Route>
            <Route component={NotFound} />
          </Switch>
          {footerUrls.includes(currentURL) && <div className="push"></div> }
          
        </div>
        {footerUrls.includes(currentURL) && <Footer smartBanner={displaySmartBanner} /> }
        {displaySmartBanner && footerUrls.includes(currentURL) &&
        <MobileView style={{position: "fixed", bottom: 0, left: 0, width: "100%", height: "auto", padding: 5, backgroundColor: "#e8e6e4", display: "flex", justifyContent: "center" }}>
            <a href="https://play.google.com/store/apps/details?id=com.truthordrinkzrilich&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
                <img /*src={process.env.PUBLIC_URL + '/imgs/apk-banner.png'}*/ src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" width="150" height="58" />
            </a>
            <button onClick={hideSmartBanner} style={{borderWidth: 0, width: 40, height: 40, alignSelf: "center", backgroundColor: "transparent"}}><i class="fal fa-times-circle"></i></button>
        </MobileView>
        }
      </Router>
     
      
    </>
  );
}

export default App;
