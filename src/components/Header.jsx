import React from "react";
import { useTranslation } from "react-i18next";
import DownloadTemplate from "./DownloadTemplate.jsx";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = ({ serverUrls, showBackButton, onBackClick }) => {
  const { t } = useTranslation();

  return (
    <div id="title">
      <h1>{t("title")}</h1>
      <div className="title-buttons">
        {serverUrls && <DownloadTemplate apiUrl={serverUrls.template} />}
        {showBackButton && (
          <button onClick={onBackClick}>← {t("backToHome")}</button>
        )}
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default Header;
