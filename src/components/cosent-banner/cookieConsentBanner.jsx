import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TagManager from "react-gtm-module";

const CookieConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    initializeTagManager();

    const storedConsent = JSON.parse(sessionStorage.getItem("consentMode"));
    if (storedConsent) {
      setConsent(storedConsent);
      setShowBanner(false);
    }
  }, []);

  const initializeTagManager = () => {
    const tagManagerArgs = {
      gtmId: "GTM-PQ2XPWNH",
      dataLayer: {
        consent: {
          ad_storage: "denied",
          analytics_storage: "denied",
          functionality_storage: "true",
          personalization_storage: "true",
          security_storage: "true",
        },
      },
    };
    TagManager.initialize(tagManagerArgs);
  };

  const handleAcceptAll = () => {
    setConsent({
      necessary: true,
      analytics: true,
      preferences: true,
      marketing: true,
    });

    setShowBanner(false);
  };
  const setConsent = (consent) => {
    const consentMode = {
      ad_storage: consent.marketing ? "granted" : "denied",
      analytics_storage: consent.analytics ? "granted" : "denied",
      functionality_storage: "true", // Sempre permitido
      security_storage: "true", // Sempre permitido
      personalization_storage: consent.preferences ? "granted" : "denied",
    };
    sessionStorage.setItem("consentMode", JSON.stringify(consentMode));

    // Atualizar o consentimento no Google Tag Manager
    TagManager.dataLayer({
      dataLayer: {
        event: "consentGiven",
        consent: consentMode,
      },
    });
  };

  const Media = {
    PhoneLarge: "@media(max-width:800px)",
  };

  const Container = styled.div`
    width: 100%;
    margin: auto;
    z-index: 999999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .cookie-consent-banner {
      width: 50%;
      height: 10rem;
      margin: auto;
      position: fixed;
      bottom: 2rem;
      background-color: #ffffffe3;
      padding: 20px;
      z-index: 999999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
      border-radius: 10px;

      ${Media.PhoneLarge} {
        width: 80%;
        height: 15rem;
        .cookie-consent-button {
          background-color: var(--blue);
          color: #fff;
        }
      }
    }
    p {
      font-size: 1.21rem;
      margin-bottom: 10px;
      color: var(--black);
      text-align: center;
    }
    a {
      color: var(--blue);
    }

    .cookie-consent-button {
      margin-top: 10px;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1rem;
      transition: background-color 0.3s ease;
    }

    .cookie-consent-button:hover {
      background-color: var(--blue);
      color: #fff;
    }
  `;

  return (
    showBanner && (
      <Container>
        <div className="cookie-consent-banner">
          <p>
            {" "}
            <b>Nome da empresa:</b> Nós usamos cookies para personalizar
            anúncios e melhorar a sua experiência no site. Ao continuar
            navegando, você concorda com a nossa{" "}
            <Link to="/politica">Política de privacidade</Link>
          </p>
          <button
            type="button"
            className="cookie-consent-button btn-success"
            onClick={handleAcceptAll}
          >
            Aceitar
          </button>
        </div>
      </Container>
    )
  );
};

export default CookieConsentBanner;
