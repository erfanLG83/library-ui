import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import AuthService from '../../../services/auth.service';

const AdminLoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const response = await AuthService.adminLogin(username, password);
        if (!response.success) {
            setError(response.errors[0].message);
            return;
        }
        
        await AuthService.getUserInfo();
        window.location.href = '/admin/home';
    };

    return (
        <Box
            sx={{
                backgroundColor: '#7ebcfa',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Container component="main" maxWidth="xs" dir="rtl">
                <Box
                    sx={{
                        padding: 4,
                        backgroundColor: 'white',
                        borderRadius: 2,
                        boxShadow: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>
                        ورود
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogin();
                        }}
                        sx={{
                            mt: 2,
                            width: '100%',
                        }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="نام کاربری"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            inputProps={{
                                style: { textAlign: 'right' },
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="رمز عبور"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            inputProps={{
                                style: { textAlign: 'right' },
                            }}
                        />
                        {error && (
                            <Typography
                                color="error"
                                variant="body2"
                                sx={{ mt: 1, textAlign: 'right' }}
                            >
                                {error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2,
                                backgroundColor: '#1565c0',
                                color: 'white',
                                '&:hover': {
                                    backgroundColor: '#0d47a1',
                                },
                            }}
                        >
                            ورود
                        </Button>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default AdminLoginPage;
