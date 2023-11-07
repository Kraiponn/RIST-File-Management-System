import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import i18nBackend  from 'i18next-locize-backend';
import i18nBackend  from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
	.use(i18nBackend )
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		lng: "en",
		fallbackLng: "en",
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;