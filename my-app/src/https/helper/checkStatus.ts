/*
 * @Date: 2024-01-29 16:55:25
 * @LastEditors: BiuKami lijiayong369@gmail.com
 * @LastEditTime: 2024-03-19 13:30:45
 * @FilePath: \new-per\my-app\src\https\helper\checkStatus.ts
 */
import {message} from 'antd';
/**
 * @description: 校验网络请求状态码
 * @param {Number} status
 * @return void
 */
export const checkStatus = (status: number): void => {
    console.log(status, 'status--');
    // 各种错误拦截返回
    switch (status) {
        case 400:
            message.error('Request failed! Please try again later');
            break;
        case 401:
            message.error('Login failed! Please log in again');
            break;
        case 403:
            message.error('The current account does not have permission to access!');
            break;
        case 404:
            message.error('The resource you are accessing does not exist!');
            break;
        case 405:
            message.error('Request method error! Please try again later');
            break;
        case 408:
            message.error('Request timed out! Please try again later');
            break;
        case 500:
            message.error('Service exception!');
            break;
        case 502:
            message.error('Gateway error!');
            break;
        case 503:
            message.error('Service unavailable!');
            break;
        case 504:
            message.error('Gateway timeout!');
            break;
        default:
            message.error('Request failed!');
    }
};
