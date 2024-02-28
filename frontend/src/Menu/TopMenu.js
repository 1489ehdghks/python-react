import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeOutlined, RollbackOutlined, CommentOutlined, TableOutlined } from '@ant-design/icons';
import { useAuth } from '../Auth/AuthContext';
import Chatbot from '../Form/ChatForm';
import './TopMenu.scss'

const TopMenu = ({ toggleChatbot }) => {
    const { currentUser, logout } = useAuth();
    const [showChatbot, setShowChatbot] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        const isConfirmed = window.confirm('로그아웃 하시겠습니까?');
        if (isConfirmed) {
            await logout();
            navigate('/');
        }
    };

    const handleChatbotToggle = () => {
        setShowChatbot(!showChatbot);
    };

    return (
        <div>
            <header className="top-menu">
                <nav>
                    <ul className="menu-list">
                        <li>
                            <Link to="/" className="icon-link">
                                <HomeOutlined className="icon" />
                            </Link>
                        </li>
                        {currentUser && (
                            <>
                                <li>
                                    <Link onClick={handleChatbotToggle} className="icon-link">
                                        <CommentOutlined className="icon" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/gameHistory" className="icon-link">
                                        <TableOutlined className="icon" />
                                    </Link>
                                </li>
                                <li className="logout-icon">
                                    <Link onClick={handleLogout} className="icon-link">
                                        <RollbackOutlined className="icon" />
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
            {showChatbot && <Chatbot showChatbot={showChatbot} setShowChatbot={setShowChatbot} />}
        </div>
    );
};
export default TopMenu; 
