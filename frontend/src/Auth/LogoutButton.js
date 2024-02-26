// 예: 로그아웃 버튼 컴포넌트
import React from 'react';
import { useAuth } from './AuthContext';

function LogoutButton() {
    const { logout } = useAuth();

    return (
        <button onClick={() => logout()}>Logout</button>
    );
}

export default LogoutButton;