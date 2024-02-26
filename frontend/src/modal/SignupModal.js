import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';

const style = {
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

function SignupModal({ open, handleClose }) {
    const [formData, setFormData] = useState({
        userID: '',
        userPassword: '',
        username: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                const result = await response.json();
                console.log(result.message);
                // 폼 제출 성공 후 추가 작업 (예: 모달 닫기, 알림 표시 등)
                handleClose();
            } else {
                // 서버 에러 처리
                console.error('Server error:', response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="signup-modal-title"
            aria-describedby="signup-modal-description"
        >
            <Box sx={style} component="form" onSubmit={handleSubmit}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Nickname"
                    name="username"
                    autoComplete="username"
                    onChange={handleChange}
                    value={formData.username}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="userID"
                    label="ID"
                    name="userID"
                    autoComplete="userID"
                    autoFocus
                    onChange={handleChange}
                    value={formData.userID}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="userPassword"
                    label="Password"
                    type="password"
                    id="userPassword"
                    autoComplete="current-password"
                    onChange={handleChange}
                    value={formData.userPassword}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    회원가입
                </Button>
            </Box>
        </Modal>
    );
}

export default SignupModal;
