import {useTranslation} from 'react-i18next';

const useChangeLanguage = () => {
    const {i18n} = useTranslation();
    return lng => {
        i18n.changeLanguage(lng);
        console.log('Change Language to ' + lng);
    };
};

export default useChangeLanguage;
