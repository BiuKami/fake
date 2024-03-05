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
            <p>用户名: {userData.username}</p>
            <p>会员等级: {userData.level}</p>
            <Button onClick={logout} type="primary">
                退出登录
            </Button>
        </div>
    );
};

const TranslationPage = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [visible, setVisible] = useState(false);

    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [sourceLang, setSourceLang] = useState('en');
    const [targetLang, setTargetLang] = useState('de');

    useEffect(() => {
        const userString = localStorage.getItem('user');

        // 将JSON字符串转换回对象
        const user = userString ? JSON.parse(userString) : null;
        console.log(user, 'user--');
        setUserData(user);
    }, []);
    const handleVisibleChange = (newVisible: boolean) => {
        setVisible(newVisible);
    };
    const handleTranslateClick = async () => {
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
        setTranslatedText(msg);
        console.log('handle click patreon:', res);
    };
    const handleLogin = () => {
        // TODO: 实现登录逻辑
        navigate('/login');
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
                    <h1>在线翻译</h1>
                    {userData ? (
                        <Popover
                            content={<UserProfilePopoverContent userData={userData} logout={logout} />}
                            title="用户信息"
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
                            登录
                        </button>
                    )}
                </header>
                <main className="main-content">
                    <div className="language-selectors">
                        <div className="language-selector">
                            <label>源语言:</label>
                            <select value={sourceLang} onChange={e => setSourceLang(e.target.value)}>
                                {/* 这里可以添加更多的语言选项 */}
                                <option value="en">英语</option>
                                <option value="de">德语</option>
                            </select>
                        </div>
                        <div className="language-selector">
                            <label>目标语言:</label>
                            <select value={targetLang} onChange={e => setTargetLang(e.target.value)}>
                                {/* 这里可以添加更多的语言选项 */}
                                <option value="en">英语</option>
                                <option value="de">德语</option>
                            </select>
                        </div>
                    </div>
                    <div className="text-areas">
                        <textarea
                            className="input-text"
                            placeholder="输入文本"
                            value={inputText}
                            onChange={e => setInputText(e.target.value)}
                        />
                        <textarea className="translated-text" placeholder="翻译结果" value={translatedText} readOnly />
                    </div>
                    <button className="translate-button" onClick={handleTranslateClick}>
                        翻译
                    </button>
                </main>
                <div className="main-list">
                    <div>
                        <div className="test">解锁DeepL全部功能 – 免费试用DeepL Pro</div>
                        <button className="login-button" onClick={handleLogin}>
                            免费试用30天Pro
                        </button>
                    </div>
                    <div style={{display: 'flex'}}>
                        <div style={{paddingRight: 80}}>
                            <ul className="styled-list">
                                <li>你正在使用DeepL免费版</li>
                                <li>翻译多达1,500个字符</li>
                                <li>翻译3份不可编辑文档/月</li>
                                <li>10个术语表条目</li>
                            </ul>
                        </div>
                        <div>
                            <ul className="styled-list">
                                <li>你正在使用DeepL免费版</li>
                                <li>翻译多达1,500个字符</li>
                                <li>翻译3份不可编辑文档/月</li>
                                <li>10个术语表条目</li>
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
                    <div>3213</div>
                    <div>
                        <div>资源</div>
                        <div>隐私政策</div>
                        <div>条款&条件</div>
                    </div>
                    <div>
                        <div>公司</div>
                        <div>新闻</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TranslationPage;
