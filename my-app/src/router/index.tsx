/*
 * @Date: 2024-01-29 16:49:36
 * @LastEditors: BiuKami lijiayong369@gmail.com
 * @LastEditTime: 2024-03-05 16:49:19
 * @FilePath: \new-per\my-app\src\router\index.tsx
 */
import {Routes, Route} from 'react-router-dom';
import {lazy, Suspense} from 'react';

const Home = lazy(() => import('@/pages/home'));
const Transfer = lazy(() => import('@/pages/transfer'));
const CallbackIndex = lazy(() => import('@/pages/callbackIndex'));
const Register = lazy(() => import('@/pages/register'));
const Login = lazy(() => import('@/pages/login'));
const Price = lazy(() => import('@/pages/price'));

function RootRoute(): JSX.Element {
    return (
        <>
            <Suspense>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/transfer" element={<Transfer />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/price" element={<Price />} />
                    <Route path="/Register" element={<Register />} />
                    <Route path="/callbackIndex" element={<CallbackIndex />} />
                </Routes>
            </Suspense>
        </>
    );
}
export default RootRoute;
