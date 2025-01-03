import axios, { AxiosError } from 'axios';
import { ApiResult, BadRequestResponse, PaginationModel } from './Models/ApiResult';
import BaseApiService from './base.service';
import { CategoryModel } from './Models/CategoryModels';

class CategoriesService {
    public static async getCategories(pageIndex: number,pageSize: number) : Promise<ApiResult<PaginationModel<CategoryModel>>> {
        try {
            const response = await axios.get<PaginationModel<CategoryModel>>(
                `${BaseApiService.API_URL}/api/v1/admin/categories?pageIndex=${pageIndex}&pageSize=${pageSize}`,{
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
    
    public static async create(title : string) : Promise<ApiResult> {
        try {
            await axios.post(
                `${BaseApiService.API_URL}/api/v1/admin/categories`,{
                    title
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
    
    public static async update(id : string, title : string) : Promise<ApiResult> {
        try {
            await axios.put(
                `${BaseApiService.API_URL}/api/v1/admin/categories`,{
                    title,
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
    
    public static async delete(id : string) : Promise<ApiResult> {
        try {
            await axios.delete(
                `${BaseApiService.API_URL}/api/v1/admin/categories`,{
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

export default CategoriesService;