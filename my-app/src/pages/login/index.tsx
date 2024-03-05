import {Button, Form, Input} from 'antd';
import React, {useState} from 'react';
import {loginByEmail} from '@/api';
import {useNavigate} from 'react-router-dom';

import './index.less';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = (values: any) => {
        console.log('Success:', values);
        setLoading(true);
        loginByEmail(values)
            .then(response => {
                setLoading(false);
                if (response.code === 0) {
                    localStorage.setItem('user', JSON.stringify(response?.result));
                    // 跳转到主页面
                    navigate('/');
                }
            })
            .catch(() => {
                setLoading(false);
            });
        // 这里添加登录逻辑
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="login-wrapper">
            <div className="login-header">
                <img src="your-icon-path.png" alt="icon" className="login-icon" />
                {/* <h1>登录</h1> */}
            </div>
            <div className="login-content">
                <Form
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <p className="login-text">登录你的账户</p>
                    <Form.Item name="email" rules={[{required: true, message: '请输入您的邮箱!'}]}>
                        <Input placeholder="邮箱" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{required: true, message: '请输入您的密码!'}]}>
                        <Input.Password placeholder="密码" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                            登录
                        </Button>
                    </Form.Item>

                    <p className="login-register-text">
                        还没有账户？<a href="/register">注册</a>
                    </p>
                    <p className="login-forgot-password">
                        <a href="/forgot-password">忘记密码?</a>
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
