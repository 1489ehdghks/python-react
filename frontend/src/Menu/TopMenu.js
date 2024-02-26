import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HomeOutlined, ArrowRightOutlined, CoffeeOutlined } from '@ant-design/icons';
import { useAuth } from '../Auth/AuthContext';
import './TopMenu.scss'

const TopMenu = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        const isConfirmed = window.confirm('로그아웃 하시겠습니까?');
        if (isConfirmed) {
            await logout();
            navigate('/');
        }
    };

    return (
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
                                <Link to="/game" className="icon-link">
                                    <CoffeeOutlined className="icon" />
                                </Link>
                            </li>
                            <li className="logout-icon">
                                <Link onClick={handleLogout} className="icon-link">
                                    <ArrowRightOutlined className="icon" />
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};
export default TopMenu; 
