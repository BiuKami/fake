import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { getLanguageItems } from "@/config/i18n";
import useChangeLanguage from "@/utils/useChangeLanguage";
import { getLocalItem, setLocalItem } from "@/utils/localStorage";
import styles from './language.module.less';
const { Option } = Select;

const LanguageSelector = () => {
    const [currentLng, setCurrentLng] = useState(navigator.language || navigator.userLanguage);
    const changeLanguage = useChangeLanguage();

    useEffect(() => {
        const localLng = getLocalItem('language');
        if (localLng) {
            setCurrentLng(localLng.toUpperCase());
            changeLanguage(localLng);
        }
    }, []);

    const handleChangeLanguage = (value) => {
        changeLanguage(value);
        setLocalItem('language', value);
        setCurrentLng(value.toUpperCase());
        window.location.reload();
    };

    return (
        <Select
            className={styles['language-selector']}
            value={currentLng}
            onChange={handleChangeLanguage}
        >
            {getLanguageItems().map((item) => (
                <Option key={item.value} value={item.value}>{item.label}</Option>
            ))}
        </Select>
    );
};

export default LanguageSelector;