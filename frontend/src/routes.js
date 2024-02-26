import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import MainPage from './page/MainPage';
import PostPage from './page/PostPage';
import TopMenu from './Menu/TopMenu';
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
            </Routes>
            <footer className="footer">
                <p>© 2024-02-23</p>
            </footer>
        </div>
    );
};

export default AppRoutes;
