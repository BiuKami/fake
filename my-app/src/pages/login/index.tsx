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
    const handleForgotPasswordClick = () => {
        navigate(`/register?forgot-password=true`);
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
                    <p className="login-text">Log in to your account</p>
                    <Form.Item name="email" rules={[{required: true, message: 'Please enter your email address!'}]}>
                        <Input placeholder="email" />
                    </Form.Item>

                    <Form.Item name="password" rules={[{required: true, message: 'Please enter your password!'}]}>
                        <Input.Password placeholder="password" />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                            Login
                        </Button>
                    </Form.Item>

                    <p className="login-register-text">
                        Don't have an account yet?<a href="/register">register</a>
                    </p>
                    <p className="login-forgot-password">
                        <Button type="link" onClick={handleForgotPasswordClick}>
                            forgot password?
                        </Button>
                    </p>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
