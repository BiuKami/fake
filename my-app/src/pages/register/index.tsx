import React, {useState} from 'react';
import {Form, Input, Button, Typography} from 'antd';
import {MailOutlined, LockOutlined} from '@ant-design/icons';
import './index.less';

const {Title, Link} = Typography;

const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [currentStep, setCurrentStep] = useState(1);

    const onFirstStepFinish = (values: any) => {
        setEmail(values.email);
        setCurrentStep(2); // Proceed to next step
    };

    const onFinalStepFinish = (values: any) => {
        console.log('Received values of form: ', {email, ...values});
        // Here you can handle the final registration logic
    };

    const goToFirstStep = () => {
        setCurrentStep(1); // Go back to first step
    };

    return (
        <div className="register-page-container">
            {currentStep === 1 && (
                <>
                    <Title level={2}>Register</Title>
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
                    <Title level={2}>Register</Title>
                    <Title level={4}>Welcome, {email}</Title>
                    <Form name="register_step_two" className="register-step-two" onFinish={onFinalStepFinish}>
                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                            hasFeedback
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Set a password" />
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
