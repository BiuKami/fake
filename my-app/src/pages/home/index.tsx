import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {Popover, Avatar, Button} from 'antd';
import {translate} from '@/api';
import Language from '@/pages/language/language';
import './index.less'; // 引入CSS样式文件

// 定义接口来描述用户数据的结构
interface UserData {
    user_id: number;
    username: string;
    level: number;
    email: string;
    avatar: string;
}

const UserProfilePopoverContent: React.FC<{userData: UserData; logout: () => void}> = ({userData, logout}) => {
    return (
        <div>
            <p>user: {userData.username}</p>
            <p>Membership level: {userData.level}</p>
            <Button onClick={logout} type="primary">
                Log out
            </Button>
        </div>
    );
};

const TranslationPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLang, setSourceLang] = useState('en');
    const [targetLang, setTargetLang] = useState('de');

    useEffect(() => {
        const userString = localStorage.getItem('user');

        // 将JSON字符串转换回对象
        const user = userString ? JSON.parse(userString) : null;
        setUserData(user);
    }, []);
    const handleVisibleChange = (newVisible: boolean) => {
        setVisible(newVisible);
    };
    const handleTranslateClick = async () => {
        if (userData) {
            setLoading(true);
            // TODO: 这里应该调用翻译API来获取翻译结果
            // 模拟翻译过程
            const res = await translate({
                user_id: userData?.user_id,
                src_lang: sourceLang,
                target_lang: targetLang,
                message: inputText
            });
            console.log();
            const msg = res?.result?.target_msg;
            setLoading(false);
            setTranslatedText(msg);
            console.log('handle click patreon:', res);
        } else {
            navigate('/login');
        }
    };
    const handleLogin = () => {
        if (userData) {
            navigate('/price', {
                state: {
                    userData
                }
            });
        } else {
            navigate('/login');
        }
    };
    // 假设有一个logout函数用于处理退出登录的逻辑
    const logout = () => {
        // 实现退出登录的逻辑，比如清除localStorage中的用户信息，跳转到登录页等
        localStorage.clear();

        // 刷新页面数据
        window.location.reload();
    };
    return (
        <>
            <div className="translation-page">
                <header className="header">
                    <h1>AIdeepTranslate</h1>
                    {userData ? (
                        <Popover
                            content={<UserProfilePopoverContent userData={userData} logout={logout} />}
                            title="useInfo"
                            trigger="click"
                            open={visible}
                            onOpenChange={handleVisibleChange}
                        >
                            <Avatar
                                style={{backgroundColor: 'red', verticalAlign: 'middle', cursor: 'pointer'}}
                                size="large"
                                src={userData.avatar}
                            >
                                {userData.username}
                            </Avatar>
                        </Popover>
                    ) : (
                        <button className="login-button" onClick={handleLogin}>
                            Login
                        </button>
                    )}
                </header>
                <main className="main-content">
                    <div className="language-selectors">
                        <div className="language-selector">
                            <label>source language:</label>
                            <select value={sourceLang} onChange={e => setSourceLang(e.target.value)}>
                                {/* 这里可以添加更多的语言选项 */}
                                <option value="en">English</option>
                                <option value="de">German</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="fr">Hindi</option>
                                <option value="it">Italy</option>
                                <option value="ja">ja</option>
                                <option value="ko">Korean</option>
                                <option value="pt">Portuguese</option>
                                <option value="ru">Russian</option>
                            </select>
                        </div>
                        <div className="language-selector">
                            <label>target language:</label>
                            <select value={targetLang} onChange={e => setTargetLang(e.target.value)}>
                                <option value="en">English</option>
                                <option value="de">German</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                                <option value="fr">Hindi</option>
                                <option value="it">Italy</option>
                                <option value="ja">ja</option>
                                <option value="ko">Korean</option>
                                <option value="pt">Portuguese</option>
                                <option value="ru">Russian</option>
                            </select>
                        </div>
                    </div>
                    <div className="text-areas">
                        <textarea
                            className="input-text"
                            placeholder="Input content"
                            value={inputText}
                            onChange={e => setInputText(e.target.value)}
                        />
                        <textarea
                            className="translated-text"
                            placeholder="Translation results"
                            value={translatedText}
                            readOnly
                        />
                    </div>
                    <Button className="translate-button" onClick={handleTranslateClick} loading={loading}>
                        translate
                    </Button>
                </main>
                <div className="main-list">
                    <div style={{display: 'flex'}}>
                        <div>
                            <div className="test">Unlock all AIdeepTranslate functions for free trial</div>
                            <button className="login-button" onClick={handleLogin}>
                                Free trial for 30 days
                            </button>
                        </div>
                        {/* <div style={{paddingLeft: 10}}>
                            <div style={{fontWeight: 600}}>解锁AIdeepTranslate全部功能</div>
                            <div style={{paddingTop: 4}}>最大程度数据安全</div>
                            <div style={{paddingTop: 4}}>无限制文本翻译</div>
                            <div style={{paddingTop: 4}}>翻译并编辑更多文档</div>
                        </div> */}
                    </div>
                    <div style={{display: 'flex'}}>
                        <div style={{paddingRight: 80}}>
                            <ul className="styled-list">
                                <div style={{fontWeight: 600}}>Upgrade Pro membership</div>
                                <div style={{paddingTop: 14}}>200000 translated words</div>
                                <div style={{paddingTop: 14}}>2wAi translation</div>
                                <div style={{paddingTop: 14}}>100 times Ai assistant</div>
                            </ul>
                        </div>
                        <div>
                            <ul className="styled-list">
                                <div style={{fontWeight: 600}}>Upgrade Pro+ membership</div>
                                <div style={{paddingTop: 14}}>Unlimited translation</div>
                                <div style={{paddingTop: 14}}>AI Assistant Unlimited Use</div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer">
                <div>
                    <Language />
                </div>
                <div>
                    <div>AIdeepTranslate</div>
                    <div>
                        <div onClick={() => navigate('/price')}>Price</div>
                        <a href="/PRIVACY-POLICY.html">Privacy Policy</a>
                        <a href="/TERMS-OF-USE.html">Terms & conditions</a>
                    </div>
                    <div>
                        <a href="/FutureMind.html">company</a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TranslationPage;
