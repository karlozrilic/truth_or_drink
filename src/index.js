import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AppAds from './components/AppAds';

let comp;

if (window.location.pathname === "/app-ads.txt") {
  comp = <AppAds />;
  document.getElementsByTagName("HEAD")[0].innerHTML = "";
} else {
  comp = <App />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {comp}
  </React.StrictMode>
);