import {useNavigate} from 'react-router-dom';

import Language from '@/pages/language/language';
import './index.less'; // 引入CSS样式文件

// 定义接口来描述用户数据的结构

const TranslationPage = () => {
    const navigate = useNavigate();
    return (
        <>
            <div>FutureMind Inc</div>
            <div>8 THE GREEN STE A DOVER, DE 19901</div>
            <div>BlackHoleedge Limted</div>
            <div>OFFICE 0324 - 44 EVESHAM AVENUE</div>
            <div>GRIMSBY</div>
            <div>ENGLAND DN34 5RT</div>
            <div>Email: support@aideeptranslate.com</div>
            <div className="footer">
                <div>
                    <Language />
                </div>
                <div>
                    <div onClick={() => navigate('/')}>Online translation</div>
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
