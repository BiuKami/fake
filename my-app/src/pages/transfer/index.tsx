/*
 * @Date: 2024-01-29 16:50:58
 * @LastEditors: BiuKami lijiayong369@gmail.com
 * @LastEditTime: 2024-01-29 16:51:41
 * @FilePath: \my-app\src\pages\home\index.tsx
 */
/*
 * @Date: 2024-01-29 16:49:36
 * @LastEditors: BiuKami lijiayong369@gmail.com
 * @LastEditTime: 2024-01-29 16:51:31
 * @FilePath: \my-app\src\pages\home\index.tsx
 */

import {useEffect} from 'react';
const Transfer = () => {
    const url = window.location.href;

    const par = url?.split('?');
    const par2 = par[1]?.split('=');
    console.log(par2, 'par2--');
    console.log(par, 'par--');
    useEffect(() => {
        if (par2) {
            window.location.replace(par2[1]);
        }
    }, []);
    return <></>;
};
export default Transfer;
