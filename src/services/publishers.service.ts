import axios, { AxiosError } from 'axios';
import { ApiResult, BadRequestResponse, PaginationModel } from './Models/ApiResult';
import BaseApiService from './base.service';
import { PublisherModel } from './Models/PublisherModels';

class PublishersService {
    public static async adminGetAll(pageIndex: number,pageSize: number) : Promise<ApiResult<PaginationModel<PublisherModel>>> {
        try {
            const response = await axios.get<PaginationModel<PublisherModel>>(
                `${BaseApiService.API_URL}/api/v1/admin/publishers?pageIndex=${pageIndex}&pageSize=${pageSize}`,{
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
    
    public static async getAll(pageIndex: number,pageSize: number) : Promise<ApiResult<PaginationModel<PublisherModel>>> {
        try {
            const response = await axios.get<PaginationModel<PublisherModel>>(
                `${BaseApiService.API_URL}/api/v1/publishers?pageIndex=${pageIndex}&pageSize=${pageSize}`,{
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
}

export default PublishersService;