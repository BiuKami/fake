import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
// import EN from './modules/en.json';
// import DE from './modules/DE.json';
// import ES from './modules/ES.json';
// import FR from './modules/FR.json';
// import PT from './modules/PT.json';
import AR from './modules/web-ar.json';
import DE from './modules/web-de.json';
import EN from './modules/web-en.json';
import ES from './modules/web-es.json';
import FR from './modules/web-fr.json';
import HI from './modules/web-hi.json';
import IT from './modules/web-it.json';
import JA from './modules/web-ja.json';
import KR from './modules/web-kr.json';
import PT from './modules/web-pt.json';
import RU from './modules/web-ru.json';
import ZH from './modules/web-zh-HK.json';
const resources = {
    en: {
        name: 'English',
        translation: EN
    },
    'zh-TW': {
        name: '中文繁體',
        translation: ZH
    },
    de: {
        name: 'Deutsch',
        translation: DE
    },
    ar: {
        name: 'عربي',
        translation: AR
    },
    hi: {
        name: 'नहीं',
        translation: HI
    },
    it: {
        name: 'Italiano',
        translation: IT
    },
    ja: {
        name: '日本語',
        translation: JA
    },
    kr: {
        name: '한국인',
        translation: KR
    },
    ru: {
        name: 'Русский',
        translation: RU
    },
    es: {
        name: 'Español',
        translation: ES
    },
    fr: {
        name: 'Français',
        translation: FR
    },
    pt: {
        name: 'Português',
        translation: PT
    }
};
const defaultLanguage = ['en', 'es', 'fr', 'zh-TW', 'pt', 'ru', 'kr', 'ja', 'it', 'hi', 'ar', 'de'];
const lang = navigator.language || navigator.userLanguage;
i18n.use(initReactI18next).init({
    resources,
    lng: defaultLanguage[lang] || 'en',
    interpolation: {
        escapeValue: false // react already safes from xss
    }
});
console.log(
    navigator.language || navigator.userLanguage,
    ' navigator.language || navigator.userLanguage-----------------'
);
/**
 * 获取多语言所有语言的数据
{
  en:"English"
}
 */
const getLanguageItems = () => {
    const lngItems = [];
    const lngs = Object.keys(resources);
    lngs.forEach(key => {
        lngItems.push({
            label: resources[key].name,
            value: key
        });
    });
    return lngItems;
};
export {getLanguageItems};
export default i18n;
