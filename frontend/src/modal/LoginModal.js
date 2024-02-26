import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { useAuth } from '../Auth/AuthContext';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function LoginModal({ open, handleClose }) {
    const { login } = useAuth();
    const [loginInfo, setLoginInfo] = useState({
        userID: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(loginInfo)
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed. Please check your userID and password.');
                return;
            }

            const data = await response.json();
            login(data);
            console.log('Login successful', data);
            handleClose();
        } catch (error) {
            setError('Login failed. Please check your userID and password.');
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="login-modal-title"
            aria-describedby="login-modal-description"
        >
            <Box sx={modalStyle} component="form" onSubmit={handleSubmit}>
                <Typography id="login-modal-title" variant="h6" component="h2">Login</Typography>
                <TextField margin="normal" required fullWidth id="userID" label="User ID" name="userID" autoComplete="userID" autoFocus onChange={handleChange} value={loginInfo.userID} />
                <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" onChange={handleChange} value={loginInfo.password} />
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Login</Button>
                {error && <Typography color="error">{error}</Typography>}
            </Box>
        </Modal>
    );
}

export default LoginModal;
