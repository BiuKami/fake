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
import {useLocation} from 'react-router-dom';
import {Spin, message} from 'antd';
import {subscribeOfStripe, createOrderOfStripe} from '@/api';
import {useAuthSuccess} from '@/utils/utils';
import './index.less';
const CallbackIndex = () => {
    const [messageApi] = message.useMessage();
    const location = useLocation();
    const {search} = location;
    const queryParams = new URLSearchParams(search);
    const user_id = queryParams.get('userId');
    const level = queryParams.get('level');
    const stripe_pid = queryParams.get('stripe_pid');
    const tokenInstance = queryParams.get('tokenInstance');
    const authSuccess = useAuthSuccess();
    // //普通购买
    const handlePaymentOfStript = async () => {
        authSuccess(tokenInstance);
        const res = await createOrderOfStripe(Number(user_id), stripe_pid, tokenInstance);
        if (res?.code === 0) {
            const url = res.result?.gateway_url;
            window.location.href = url;
        } else if (res?.code === 1) {
            messageApi.open({
                type: 'error',
                content: 'Payment error'
            });
        }
    };
    // //订阅
    const handleSubSubscribe = async () => {
        authSuccess(tokenInstance);
        //已订阅
        // if (is_subscribe !== 0) {
        //     toastShow(I18n('You are already a member, please unsubscribe first'));
        //     return;
        // }
        const res = await subscribeOfStripe(Number(user_id), Number(level), tokenInstance);
        if (res?.code === 0) {
            const url = res.result?.gateway_url;
            window.location.href = url;
        } else if (res?.code === 1) {
            messageApi.open({
                type: 'error',
                content: 'Payment error'
            });
            // setPending(false);
        }
        console.log(res);
    };
    useEffect(() => {
        if (stripe_pid) {
            handlePaymentOfStript();
        } else {
            handleSubSubscribe();
        }
    }, []);
    return (
        <div className="container">
            <Spin spinning={true} fullscreen />
        </div>
    );
};
export default CallbackIndex;
