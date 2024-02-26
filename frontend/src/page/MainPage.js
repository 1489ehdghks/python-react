import React, { useState } from 'react';
import SignupModal from '../modal/SignupModal';
import LoginModal from '../modal/LoginModal';
import { Typography } from 'antd';
import './MainPage.scss';

function MainPage() {
    const [signupOpen, setSignupOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);

    const handleSignupOpen = () => setSignupOpen(true);
    const handleSignupClose = () => setSignupOpen(false);

    const handleLoginOpen = () => setLoginOpen(true);
    const handleLoginClose = () => setLoginOpen(false);
    return (
        <div className="homepage">
            <div className="content">
                <Typography.Title level={2} style={{ fontSize: '3.5em' }}>Welcome to OurStory!</Typography.Title>

                <Typography.Paragraph className="home-description" style={{ fontSize: '1.3em' }}>
                    Choose your pleasure and start your journey.
                </Typography.Paragraph>
                <div className="buttons">
                    <button onClick={handleLoginOpen}>로그인</button>
                    <button onClick={handleSignupOpen}>회원가입</button>
                </div>
                <SignupModal open={signupOpen} handleClose={handleSignupClose} />
                <LoginModal open={loginOpen} handleClose={handleLoginClose} />
            </div>
        </div>
    );
}

export default MainPage;