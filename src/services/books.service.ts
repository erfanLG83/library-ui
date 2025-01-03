import axios, { AxiosError } from 'axios';
import { ApiResult, BadRequestResponse } from './Models/ApiResult';
import BaseApiService from './base.service';
import { GetBooksResponse } from './Models/BookModels';

class BooksService {
    public static async getLatestBooks() : Promise<ApiResult<GetBooksResponse | null>> {
        try {
            const response = await axios.get<GetBooksResponse>(`${BaseApiService.API_URL}/api/v1/admin/books?orderBy=1&isDescending=true&pageIndex=1&pageSize=15`,{
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

export default BooksService;