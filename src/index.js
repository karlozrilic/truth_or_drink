import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AppAds from './components/AppAds';

let comp;

if (window.location.pathname === "/app-ads.txt") {
  comp = <AppAds />;
  document.getElementsByTagName("HEAD")[0].innerHTML = "";
} else {
  comp = <App />;
}

ReactDOM.render(
  comp,
  document.getElementsByTagName("BODY")[0]
);