import axios, { AxiosError } from 'axios';
import { ApiResult, BadRequestResponse, PaginationModel } from './Models/ApiResult';
import BaseApiService from './base.service';
import { AuthorModel } from './Models/AuthorModels';

class AuthorsService {
    public static async adminGetAll(pageIndex: number,pageSize: number) : Promise<ApiResult<PaginationModel<AuthorModel>>> {
        try {
            const response = await axios.get<PaginationModel<AuthorModel>>(
                `${BaseApiService.API_URL}/api/v1/admin/authors?pageIndex=${pageIndex}&pageSize=${pageSize}`,{
                headers : {
                    Authorization : `bearer ${BaseApiService.getAccessToken()}`
                }
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
    
    public static async getAll(pageIndex: number,pageSize: number) : Promise<ApiResult<PaginationModel<AuthorModel>>> {
        try {
            const response = await axios.get<PaginationModel<AuthorModel>>(
                `${BaseApiService.API_URL}/api/v1/authors?pageIndex=${pageIndex}&pageSize=${pageSize}`,{
                headers : {
                    Authorization : `bearer ${BaseApiService.getAccessToken()}`
                }
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
    
    public static async adminCreate(firstName : string,lastName : string) : Promise<ApiResult> {
        try {
            await axios.post(
                `${BaseApiService.API_URL}/api/v1/admin/authors`,{
                    firstName,
                    lastName
                },{
                headers : {
                    Authorization : `bearer ${BaseApiService.getAccessToken()}`
                }
            });

            return { 
                success : true,
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
    
    public static async adminUpdate(id : string, firstName : string,lastName : string) : Promise<ApiResult> {
        try {
            await axios.put(
                `${BaseApiService.API_URL}/api/v1/admin/authors`,{
                    firstName,
                    lastName,
                    id
                },{
                headers : {
                    Authorization : `bearer ${BaseApiService.getAccessToken()}`
                }
            });

            return { 
                success : true,
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
    
    public static async adminDelete(id : string) : Promise<ApiResult> {
        try {
            await axios.delete(
                `${BaseApiService.API_URL}/api/v1/admin/authors`,{
                data : {
                    id
                },
                headers : {
                    Authorization : `bearer ${BaseApiService.getAccessToken()}`
                }
            });

            return { 
                success : true,
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
}

export default AuthorsService;