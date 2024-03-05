/*
 * @Date: 2024-03-05 11:54:08
 * @LastEditors: BiuKami lijiayong369@gmail.com
 * @LastEditTime: 2024-03-05 15:50:03
 * @FilePath: \new-per\my-app\src\api\index.ts
 */
import config from '../https';

export const translate = (pay: any) => {
    return config.post('/user/translate', {
        ...pay
    });
};

export const loginByEmail = (pay: any) => {
    return config.post('/user/loginByEmail', {
        ...pay
    });
};
