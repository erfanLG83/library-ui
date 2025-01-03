import axios, { AxiosError } from 'axios';
import { ApiResult, BadRequestResponse, BooksListOrderBy, PaginationModel } from './Models/ApiResult';
import BaseApiService from './base.service';
import { BookModel, CreateBookRequest, UpdateBookRequest } from './Models/BookModels';

class BooksService {
    public static async getAll(pageIndex : number, pageSize: number,isDescending: boolean,orderBy: BooksListOrderBy) : Promise<ApiResult<PaginationModel<BookModel>>> {
        try {
            const response = await axios.get<PaginationModel<BookModel>>(
                `${BaseApiService.API_URL}/api/v1/admin/books?orderBy=${orderBy}&isDescending=${isDescending}&pageIndex=${pageIndex}&pageSize=${pageSize}`,{
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
    
    public static async create(data: CreateBookRequest) : Promise<ApiResult> {
        try {
            await axios.post(
                `${BaseApiService.API_URL}/api/v1/admin/books`,data,{
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
    
    public static async update(data: UpdateBookRequest) : Promise<ApiResult> {
        try {
            await axios.put(
                `${BaseApiService.API_URL}/api/v1/admin/books`,data,{
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
                `${BaseApiService.API_URL}/api/v1/admin/books`,{
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

export default BooksService;