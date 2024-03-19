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
export const sendEmailCode = (email: any) => {
    return config.post('/user/sendEmailCode', {
        email
    });
};
export const registByEmail = (pay: object | undefined) => {
    return config.post('/user/registByEmail', {
        ...pay
    });
};
export const resetPassword = (pay: object | undefined) => {
    return config.post('/user/resetPwd', {
        ...pay
    });
};
export const subscribeOfStripe = (user_id: any, level: any, tokenInstance: string | null | undefined) => {
    console.log(tokenInstance, 'tokenInstance--');

    return config.post(
        '/api/stripe/subscribe',
        {
            user_id,
            level
        },
        {
            headers: tokenInstance
                ? {
                      Authorization: `Bearer ${tokenInstance}`
                  }
                : {}
        }
    );
};
export const getTokenPackages = () => {
    return config.get('/api/tokenPackages');
};

export const getVipLevels = () => {
    return config.get('/api/web/vipLevels');
};
export const createOrderOfStripe = (user_id: any, package_id: any, tokenInstance: string | null | undefined) => {
    return config.post(
        '/api/stripe/createOrder',
        {
            user_id,
            package_id
        },
        {
            headers: tokenInstance
                ? {
                      Authorization: `Bearer ${tokenInstance}`
                  }
                : {}
        }
    );
};
