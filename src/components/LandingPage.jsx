import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Header from "./Header";

const LandingPage = ({ onGetStarted }) => {
  const { t } = useTranslation();

  return (
    <div className="landing-page">
      <Header showBackButton={false} />

      <main className="landing-main">
        <section className="hero">
          <div className="hero-content">
            <h2 className="hero-title">{t("heroTitle")}</h2>
            <p className="hero-description">{t("heroDescription")}</p>
            <button className="cta-button" onClick={onGetStarted}>
              {t("getStarted")}
            </button>
          </div>
          <div className="features-and-steps">
            <section className="features">
              <h3 className="features-title">{t("featuresTitle")}</h3>
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">📊</div>
                  <h4>{t("feature1Title")}</h4>
                  <p>{t("feature1Description")}</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">⚖️</div>
                  <h4>{t("feature2Title")}</h4>
                  <p>{t("feature2Description")}</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">👥</div>
                  <h4>{t("feature3Title")}</h4>
                  <p>{t("feature3Description")}</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">📋</div>
                  <h4>{t("feature4Title")}</h4>
                  <p>{t("feature4Description")}</p>
                </div>
              </div>
            </section>

            <section className="how-it-works">
              <h3 className="section-title">{t("howItWorksTitle")}</h3>
              <div className="steps">
                <div className="step">
                  <div className="step-number">1</div>
                  <h4>{t("step1Title")}</h4>
                  <p>{t("step1Description")}</p>
                </div>
                <div className="step">
                  <div className="step-number">2</div>
                  <h4>{t("step2Title")}</h4>
                  <p>{t("step2Description")}</p>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <h4>{t("step3Title")}</h4>
                  <p>{t("step3Description")}</p>
                </div>
                <div className="step">
                  <div className="step-number">4</div>
                  <h4>{t("step4Title")}</h4>
                  <p>{t("step4Description")}</p>
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
