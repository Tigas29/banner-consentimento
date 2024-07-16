import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./reset.css";
import { Router } from "./router";
import TagManager from "react-gtm-module";
import CookieConsentBanner from "./components/cosent-banner/cookieConsentBanner";

const tagManagerArgs = {
  gtmId: "",
};
TagManager.initialize(tagManagerArgs);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CookieConsentBanner />
      <Router />
    </BrowserRouter>
  </React.StrictMode>
);
