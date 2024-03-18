import React, {useState, useEffect} from 'react';
import {Form, Input, Button, Typography, message} from 'antd';
import {MailOutlined, LockOutlined} from '@ant-design/icons';
import {useNavigate, useLocation} from 'react-router-dom';
import {sendEmailCode, registByEmail, loginByEmail, resetPassword} from '@/api';

import './index.less';

const {Title, Link} = Typography;

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const forgotPassword = queryParams.get('forgot-password');

    const [email, setEmail] = useState('');
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);
    let countdownInterval: ReturnType<typeof setInterval>;

    useEffect(() => {
        return () => {
            if (countdownInterval) clearInterval(countdownInterval);
        };
    }, []);

    const onFirstStepFinish = (values: any) => {
        setEmail(values.email);
        setCurrentStep(2); // Proceed to next step
    };

    const sendVerificationCode = async () => {
        setLoading(true);

        const res = await sendEmailCode(email);
        if (res.code === 0) {
            setTimeout(() => {
                setLoading(false);
                message.success(`A verification code has been sent to ${email}`);
                // Start a 60-second countdown
                setTimer(60);
                countdownInterval = setInterval(() => {
                    setTimer(prevTimer => {
                        if (prevTimer <= 1) {
                            clearInterval(countdownInterval);
                            return 0;
                        }
                        return prevTimer - 1;
                    });
                }, 1000);
            }, 1500);
        } else {
            message.success(res?.msg);
            setLoading(false);
        }
    };

    const onFinalStepFinish = async (values: any) => {
        console.log('Received values of form: ', {email, ...values});
        //  verify the code and handle the registration
        const res = forgotPassword
            ? await resetPassword({email, ...values, invitation_code: ''})
            : await registByEmail({email, ...values, invitation_code: ''});
        if (res.code !== 0) {
            message.error(res?.msg);
            return;
        }
        if (res.code === 0) {
            loginByEmail({email, ...values})
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
        }
    };

    const goToFirstStep = () => {
        setCurrentStep(1); // Go back to first step
    };

    return (
        <div className="register-page-container">
            {currentStep === 1 && (
                <>
                    <Title level={2}>{forgotPassword ? 'forgot-Password' : 'Register'}</Title>
                    <Form
                        name="register_step_one"
                        className="register-step-one"
                        onFinish={onFirstStepFinish}
                        initialValues={{email: email}}
                    >
                        <Form.Item
                            name="email"
                            rules={[
                                {required: true, message: 'Please input your email!'},
                                {type: 'email', message: 'Please enter a valid email!'}
                            ]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Next Step
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Link href="/login">Already have an account? Log in</Link>
                        </Form.Item>
                    </Form>
                </>
            )}

            {currentStep === 2 && (
                <>
                    <Title level={2}>{forgotPassword ? 'forgot-Password' : 'Register'}</Title>
                    <Title level={4}>Welcome, {email}</Title>
                    <Form name="register_step_two" className="register-step-two" onFinish={onFinalStepFinish}>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                            hasFeedback
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Set a password" />
                        </Form.Item>
                        <Form.Item
                            name="email_valid_code"
                            rules={[{required: true, message: 'Please input the verification code!'}]}
                        >
                            <Input
                                prefix={<MailOutlined />}
                                placeholder="Verification Code"
                                suffix={
                                    <Button
                                        onClick={sendVerificationCode}
                                        loading={loading}
                                        disabled={loading || timer > 0}
                                    >
                                        {timer > 0 ? `Resend (${timer}s)` : 'Send Code'}
                                    </Button>
                                }
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Create Account
                            </Button>
                            <Button className="back-button" onClick={goToFirstStep}>
                                Back
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )}
        </div>
    );
};

export default RegisterPage;
