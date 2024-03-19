import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';
import {Button, Card, Col, Row, Typography, message} from 'antd';
import {subscribeOfStripe, getTokenPackages, getVipLevels, createOrderOfStripe} from '@/api';

import './index.less';
interface Package {
    stripe_pid: string; // 或适当类型
}
const {Title, Paragraph} = Typography;

const MembershipPage: React.FC = () => {
    const [messageApi] = message.useMessage();
    const [packages, setPackages] = useState([]);
    const [pros, setPros] = useState([]);
    const [packageSelected, setPackageSelected] = useState<Package | undefined>();
    const locaton = useLocation();
    const stateParams = locaton.state;
    console.log(stateParams, 'stateParams--');

    // //普通购买
    const handlePaymentOfStript = async () => {
        if (packageSelected === null)
            return messageApi.open({
                type: 'error',
                content: 'Please select an item'
            });
        const packageId = packageSelected?.stripe_pid;
        const res = await createOrderOfStripe(stateParams.userData.user_id, packageId, '');
        if (res?.code === 0) {
            const url = res.result?.gateway_url;

            // window.open(`https://app.infinitestarsllc.com/transfer?url=${url}`, "_blank");
            // navigate("/transfer", { state: params });
            window.open(url);
        } else if (res?.code === 1) {
            messageApi.open({
                type: 'error',
                content: 'Payment error'
            });
        }
    };
    // //订阅
    const handleSubSubscribe = async (level: any) => {
        //已订阅
        // if (is_subscribe !== 0) {
        //     toastShow(I18n('You are already a member, please unsubscribe first'));
        //     return;
        // }
        if (!level)
            return messageApi.open({
                type: 'error',
                content: 'Empty error'
            });
        const res = await subscribeOfStripe(stateParams.userData.user_id, level.level, '');
        if (res?.code === 0) {
            const url = res.result?.gateway_url;
            window.open(url);
        } else if (res?.code === 1) {
            return messageApi.open({
                type: 'error',
                content: 'Empty error'
            });
            // setPending(false);
        }
        console.log(res);
    };
    //获取普通package和pro数据列
    const handleGetListAndClientId = async () => {
        const res = await axios.all([getTokenPackages(), getVipLevels()]);
        const [packages, pros] = res;
        console.log(res);
        //先拿id
        setPackages(packages.result);
        setPros(pros.result);
    };

    useEffect(() => {
        handleGetListAndClientId();
    }, []);
    return (
        <div className="membership-page">
            <Typography className="page-header">
                <Title level={1}>成为会员</Title>
                <Paragraph>选择最适合您的会员等级，享受更多专属服务。</Paragraph>
            </Typography>
            <div style={{height: 1200, background: '#fff', padding: 24}}>
                <Row gutter={[16, 16]} className="membership-options">
                    <Col xs={24} sm={12} md={8}>
                        <Card title="Recharge Token" bordered={false} style={{height: 400}}>
                            <Button onClick={() => setPackageSelected(packages[0])}>token 750</Button>
                            <Button onClick={() => setPackageSelected(packages[1])}>token 8000</Button>
                            <Button type="primary" block onClick={handlePaymentOfStript}>
                                Recharge token
                            </Button>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Card title="Activate Pro" bordered={false} style={{height: 400}}>
                            <Paragraph>200000 translated words</Paragraph>
                            <Paragraph>2wAi translation</Paragraph>
                            <Paragraph>100 times Ai assistant</Paragraph>
                            <Button type="primary" block onClick={() => handleSubSubscribe(pros[0])}>
                                Activate Pro
                            </Button>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Card title=" Activate Pro+" bordered={false} style={{height: 400}}>
                            <Paragraph>Unlimited translation</Paragraph>
                            <Paragraph>AI Assistant Unlimited Use</Paragraph>
                            <Button type="primary" block onClick={() => handleSubSubscribe(pros[2])}>
                                Activate Pro+
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default MembershipPage;
