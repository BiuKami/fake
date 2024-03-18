/*
 * @Date: 2024-01-29 16:43:25
 * @LastEditors: BiuKami lijiayong369@gmail.com
 * @LastEditTime: 2024-03-04 15:55:54
 * @FilePath: \new-per\my-app\src\App.tsx
 */
import RootRoute from './router';
// import {useEffect} from 'react';
import './App.css';

function App() {
    // // 禁止右键菜单
    // document.addEventListener('contextmenu', function (event) {
    //     event.preventDefault();
    // });

    // // 禁止F12打开开发工具
    // document.addEventListener('keydown', function (event) {
    //     if (event.keyCode === 123) {
    //         // F12的键码是123
    //         event.preventDefault();
    //     }
    // });

    // // 禁止Ctrl+Shift+I组合键
    // document.addEventListener('keydown', function (event) {
    //     if (event.ctrlKey && event.shiftKey && event.keyCode === 73) {
    //         // Ctrl+Shift+I的键码组合
    //         event.preventDefault();
    //     }
    // });

    // // 禁止Ctrl+Shift+C组合键
    // document.addEventListener('keydown', function (event) {
    //     if (event.ctrlKey && event.shiftKey && event.keyCode === 67) {
    //         // Ctrl+Shift+C的键码组合
    //         event.preventDefault();
    //     }
    // });
    return (
        <>
            <RootRoute />
        </>
    );
}

export default App;
