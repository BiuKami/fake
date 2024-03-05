/*
 * @Date: 2024-01-29 16:43:25
 * @LastEditors: BiuKami lijiayong369@gmail.com
 * @LastEditTime: 2024-03-04 15:55:54
 * @FilePath: \new-per\my-app\src\App.tsx
 */
import RootRoute from './router';
import {useEffect} from 'react';
import './App.css';

function App() {
    // useEffect(() => {
    //     (function () {
    //         function debugDetector() {
    //             function detectDevTool(allow: number) {
    //                 if (isNaN(+allow)) allow = 100;
    //                 let start = +new Date(); // 记录当前时间
    //                 document.write('<br/>');
    //                 document.write('Welcome for People, Not Welcome for Machine!');
    //                 debugger; // 插入调试语句

    //                 let end = +new Date(); // 再次记录时间
    //                 // 如果代码执行被调试器暂停，时间差会明显增大
    //                 if (end - start > allow) {
    //                     console.log('停，此地禁止使用魔法！');
    //                     // 在这里执行一些反调试的操作，如关闭窗口或者清除控制台日志
    //                     document.write('<br/>');
    //                     document.write('Welcome for People, Not Welcome for Machine!');
    //                 }
    //             }

    //             // 定时检查是否被调试
    //             setInterval(() => {
    //                 detectDevTool(100);
    //             }, 2000);

    //             // 多加几个检测方式，提高反调试的深度与复杂度
    //             if (typeof window.console === 'object' && typeof window.console.log === 'function') {
    //                 console.log(
    //                     '%c',
    //                     Object.defineProperty({}, 'id', {
    //                         get: function () {
    //                             // 一旦console被打开，就执行反调试
    //                             console.log('不速之客，悠着点～');
    //                         }
    //                     })
    //                 );
    //             }
    //         }

    //         debugDetector();
    //     })();
    // }, []);
    return (
        <>
            <RootRoute />
        </>
    );
}

export default App;
