import axios, { AxiosError } from 'axios';
import { ApiResult, BadRequestResponse } from './Models/ApiResult';
import BaseApiService from './base.service';
import { SendOtpCodeResponse, UserInfo, verifyOtpCodeRequest as VerifyOtpCodeRequest } from './Models/UserModels';

class AuthService {
    public static async adminLogin(username: string, password: string) : Promise<ApiResult<string>> {
        try {
            const response = await axios.post(`${BaseApiService.API_URL}/api/v1/admin/auth/login`, {
                phoneNumber : username,
                password
            });

            localStorage.setItem('accessToken', response.data.accessToken);

            return { 
                success : true, 
                data : response.data.accessToken,
                errors : []
            };
        } catch (error) {
            console.log(error);
            const axiosError = error as AxiosError<BadRequestResponse>;
            return {
                success : false,
                data : null,
                errors : axiosError.response?.data?.errors ?? []
            };
        }
    }

    public static async sendOtpCode(phoneNumber: string) : Promise<ApiResult<SendOtpCodeResponse>> {
        try {
            const response = await axios.post(`${BaseApiService.API_URL}/api/v1/auth/sendOtpCode`, {
                phoneNumber
            });

            return { 
                success : true, 
                data : response.data,
                errors : []
            };
        } catch (error) {
            console.log(error);
            const axiosError = error as AxiosError<BadRequestResponse>;
            return {
                success : false,
                data : null,
                errors : axiosError.response?.data?.errors ?? []
            };
        }
    }

    public static async verifyOtpCode(data: VerifyOtpCodeRequest) : Promise<ApiResult<string>> {
        try {
            const response = await axios.post(`${BaseApiService.API_URL}/api/v1/auth/verifyPhoneNumber`, data);

            localStorage.setItem('accessToken', response.data.accessToken);

            return { 
                success : true, 
                data : response.data,
                errors : []
            };
        } catch (error) {
            console.log(error);
            const axiosError = error as AxiosError<BadRequestResponse>;
            return {
                success : false,
                data : null,
                errors : axiosError.response?.data?.errors ?? []
            };
        }
    }
    
    public static async getUserInfo() : Promise<ApiResult<UserInfo>> {
        try {
            const response = await axios.get(`${BaseApiService.API_URL}/api/v1/Auth/userInfo`,{
                headers:{
                    Authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });

            localStorage.setItem('userInfo', JSON.stringify(response.data));

            return { 
                success : true, 
                data : response.data,
                errors : []
            };
        } catch (error) {
            console.log(error);
            const axiosError = error as AxiosError<BadRequestResponse>;
            return {
                success : false,
                data : null,
                errors : axiosError.response?.data?.errors ?? []
            };
        }
    }
    
    public static getUserInfoCache() : UserInfo {
        const userInfoStr = localStorage.getItem('userInfo');
        return JSON.parse(userInfoStr!) as UserInfo;
    }

    public static logout() : void {
        localStorage.removeItem('accessToken');
    }
}

export default AuthService;