//拼接i18n   比如login.sign up

import {TFunction} from 'i18next';

//每个t函数都需要login.去拼接很麻烦
const useI18nWithHead = (t: TFunction<'translation', undefined>, head: string) => {
    return (text: unknown) => {
        return t(`${head}.${text}`);
    };
};
export default useI18nWithHead;
