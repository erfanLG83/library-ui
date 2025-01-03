import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { MuiOtpInput } from 'mui-one-time-password-input'
import AuthService from '../../../services/auth.service';
import { SendOtpCodeResponse } from '../../../services/Models/UserModels';

const CustomerLoginPage: React.FC = () => {
    const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
    const [otpCode, setOtpCode] = useState<string | null>(null);
    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [sendOtpCodeResponse, setSendOtpCodeResponse] = useState<SendOtpCodeResponse | null>(null);
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const response = await AuthService.verifyOtpCode({
            firstName: firstName,
            lastName: lastName,
            otpCode: otpCode!,
            phoneNumber: phoneNumber!
        });

        if (!response.success) {
            setError(response.errors[0].message);
            return;
        }
        
        await AuthService.getUserInfo();
        window.location.href = '/customer/home';
    };

    const sendOtpCode = () =>{
        AuthService.sendOtpCode(phoneNumber!).then((response) => {
            if(response.success === false){
                alert('خطا ! \n' + response.errors[0].message);
                return;
            }

            setSendOtpCodeResponse(response.data!);
        });
    }

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
                        ورود/ثبت نام
                    </Typography>
                    <Box
                        sx={{
                            mt: 2,
                            width: '100%',
                        }}
                    >
                        <TextField
                            disabled={sendOtpCodeResponse !== null}
                            margin="normal"
                            required
                            fullWidth
                            id="phoneNumber"
                            label="شماره همراه"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        
                        {!sendOtpCodeResponse && (
                            <>
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
                                    onClick={sendOtpCode}
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
                                    ارسال کد تایید
                                </Button>
                            </>
                        )}
                        
                        {sendOtpCodeResponse?.isNewUser && (
                            <>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="نام"
                                    name="firstName"
                                    autoComplete="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="نام خانوادگی"
                                    name="lastName"
                                    autoComplete="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </>
                        )}

                        {sendOtpCodeResponse && (
                            <>
                                <Typography marginTop={2} color={'red'}> کد تایید پیامک شده را وارد نمایید</Typography>

                                <MuiOtpInput dir='ltr' marginTop={2} length={5} value={otpCode ?? undefined} onChange={setOtpCode} />
                                
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
                                    onClick={handleLogin}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 3,
                                        backgroundColor: '#1565c0',
                                        color: 'white',
                                        '&:hover': {
                                            backgroundColor: '#0d47a1',
                                        },
                                    }}
                                >
                                    {sendOtpCodeResponse.isNewUser ? 'ثبت نام' : 'ورود'}
                                </Button>
                                
                                <Button
                                    onClick={()=>{
                                        setSendOtpCodeResponse(null);
                                        setError('');
                                    }}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{
                                        mt: 1,
                                        mb: 2,
                                        backgroundColor: '#000000',
                                        color: 'white'
                                    }}
                                >
                                    ویرایش شماره همراه
                                </Button>
                            </>
                        )}

                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default CustomerLoginPage;
