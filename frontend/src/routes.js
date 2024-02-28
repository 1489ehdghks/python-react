import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './page/MainPage';
import PostPage from './page/PostPage';
import TopMenu from './Menu/TopMenu';
import Chatbot from './Form/ChatForm';
import GameHistory from './page/GameHistoryPage';
import './routes.scss'
import { useAuth } from './Auth/AuthContext';

const AppRoutes = () => {
    const { currentUser } = useAuth();


    return (
        <div>
            <TopMenu />

            <Routes>
                <Route path="/" element={currentUser ? <Navigate to="/post" /> : <MainPage />} />
                <Route path="/post" element={<PostPage />} />
                <Route path="/game" element={<Chatbot />} />
                <Route path="/gameHistory" element={<GameHistory />} />
            </Routes>
            {/* <footer className="footer">
                <p>© 2024-02-23</p>
            </footer> */}
        </div>
    );
};

export default AppRoutes;
