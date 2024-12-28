import axios, { AxiosError } from 'axios';
import { ApiResult, BadRequestResponse } from './Models/ApiResult';
import BaseApiService from './base.service';

class AuthService {
    public static async login(username: string, password: string) : Promise<ApiResult<string | null>> {
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

    public static logout() : void {
        localStorage.removeItem('accessToken');
    }
}

export default AuthService;