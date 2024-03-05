/*
 * @Date: 2024-01-29 16:55:53
 * @LastEditors: BiuKami lijiayong369@gmail.com
 * @LastEditTime: 2024-01-29 17:06:33
 * @FilePath: \my-app\src\https\helper\axiosCancel.ts
 */
import axios, {AxiosRequestConfig, Canceler} from 'axios';
import qs from 'qs';

const isFunction = (val: unknown) => {
    return toString.call(val) === `[object Function]`;
};
// * 声明一个 Map 用于存储每个请求的标识 和 取消函数
let pendingMap = new Map<string, Canceler>();

// * 序列化参数
export const getPendingUrl = (config: AxiosRequestConfig) =>
    [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join('&');

export class AxiosCanceler {
    /**
     * @description: 添加请求
     * @param {Object} config
     * @return void
     */
    addPending(config: AxiosRequestConfig) {
        // * 在请求开始前，对之前的请求做检查取消操作
        this.removePending(config);
        const url = getPendingUrl(config);
        config.cancelToken =
            config.cancelToken ||
            new axios.CancelToken(cancel => {
                if (!pendingMap.has(url)) {
                    // 如果 pending 中不存在当前请求，则添加进去
                    pendingMap.set(url, cancel);
                }
            });
    }

    /**
     * @description: 移除请求
     * @param {Object} config
     */
    removePending(config: AxiosRequestConfig) {
        const url = getPendingUrl(config);

        if (pendingMap.has(url)) {
            // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
            const cancel = pendingMap.get(url);
            cancel && cancel();
            pendingMap.delete(url);
        }
    }

    /**
     * @description: 清空所有pending
     */
    removeAllPending() {
        pendingMap.forEach(cancel => {
            cancel && isFunction(cancel) && cancel();
        });
        pendingMap.clear();
    }

    /**
     * @description: 重置
     */
    reset(): void {
        pendingMap = new Map<string, Canceler>();
    }
}
