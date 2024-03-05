import React from 'react';
import {Button, Card, Col, Row, Typography} from 'antd';
import './index.less';

const {Title, Paragraph} = Typography;

const MembershipPage: React.FC = () => {
    return (
        <div className="membership-page">
            <Typography className="page-header">
                <Title level={1}>成为会员</Title>
                <Paragraph>选择最适合您的会员等级，享受更多专属服务。</Paragraph>
            </Typography>
            <div style={{height: 1200, background: '#fff', padding: 24}}>
                <Row gutter={[16, 16]} className="membership-options">
                    <Col xs={24} sm={12} md={8}>
                        <Card title="一级会员" bordered={false} style={{height: 300}}>
                            <Paragraph>一级会员的介绍和特权说明。</Paragraph>
                            <Button type="primary" block>
                                开通一级会员
                            </Button>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Card title="二级会员" bordered={false} style={{height: 300}}>
                            <Paragraph>二级会员的介绍和特权说明。</Paragraph>
                            <Button type="primary" block>
                                开通二级会员
                            </Button>
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Card title="三级会员" bordered={false} style={{height: 300}}>
                            <Paragraph>三级会员的介绍和特权说明。</Paragraph>
                            <Button type="primary" block>
                                开通三级会员
                            </Button>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default MembershipPage;
