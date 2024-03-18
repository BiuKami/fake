/*
 * @Date: 2024-01-29 16:50:58
 * @LastEditors: BiuKami lijiayong369@gmail.com
 * @LastEditTime: 2024-03-04 14:29:06
 * @FilePath: \new-per\my-app\src\pages\callbackIndex\index.tsx
 */
/*
 * @Date: 2024-01-29 16:49:36
 * @LastEditors: BiuKami lijiayong369@gmail.com
 * @LastEditTime: 2024-01-29 16:51:31
 * @FilePath: \my-app\src\pages\home\index.tsx
 */

import {useEffect} from 'react';
import {Spin} from 'antd';
const CallbackIndex = () => {
    useEffect(() => {
        window.close();
    }, []);
    return (
        <div className="container">
            <Spin spinning={true} fullscreen />
        </div>
    );
};
export default CallbackIndex;
