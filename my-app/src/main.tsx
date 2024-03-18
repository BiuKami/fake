import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
// const ConsoleGuard = {
//     // 该方法用于跳转空白页面
//     openCallback() {
//         try {
//             window.open('about:blank', '_self');
//         } catch (e) {
//             const btn = document.createElement('button');
//             btn.addEventListener('click', () => {
//                 window.open('about:blank', '_self');
//             });
//             btn.click();
//         }
//     },
//     // 该方法适用于Safari浏览器，由于尝试在Safari中debugger无效，所以需要单独写
//     observeSafari() {
//         const div = document.createElement('div');
//         // 定义DOM节点对象属性的修饰符，当节点id被读取时，跳转空白页
//         Object.defineProperty(div, 'id', {
//             get: () => {
//                 this.openCallback();
//             }
//         });
//         // 在Safari等部分浏览器中，打印一个DOM节点时，如果控制台开启，浏览器会读取上面的属性，否则不会
//         console.log(div);
//     },
//     observe() {
//         const obj = Object.create(null);
//         // 记录当前时间
//         let t = Date.now();
//         // 修改对象属性的取值方法
//         Object.defineProperty(obj, 'a', {
//             get: () => {
//                 // 当对象属性的取值方法被触发时，判断时间间隔是否大于100ms
//                 if (Date.now() - t > 100) {
//                     // 如果打开了控制台，将弹出debugger，时间间隔一定会大于100ms，此时跳转空白页
//                     this.openCallback();
//                 }
//             }
//         });

//         // 定时打印obj.a触发属性的get方法进行判断
//         setInterval(() => {
//             // 更新时间t，关键点
//             t = Date.now();
//             // debugger，如果控制台开启，则会弹出debugger，否则不会
//             (function debug() {}).constructor('debugger')(); // debugger
//             // 触发obj.a的get方法
//             console.log(obj.a);
//         }, 200);
//     },
//     init() {
//         const userAgent = window.navigator.userAgent.toLowerCase();
//         if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
//             this.observeSafari();
//         } else {
//             this.observe();
//         }
//     }
// };
// ConsoleGuard.init();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
