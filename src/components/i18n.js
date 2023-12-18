import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
 .use(LanguageDetector)
 .init({
        fallbackLng: process.env.REACT_APP_I18N_FALLBACK_LOCALE || 'en',
        interpolation: {
            escapeValue: false,
        },
 });

const I18nProvider = ({ children }) => {
    return (
        <I18nextProvider i18n={i18n}>
            {children}
        </I18nextProvider>
    );
};

export default I18nProvider;
