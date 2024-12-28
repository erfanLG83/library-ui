export default class BaseApiService {
    public static API_URL = "https://localhost:5001";

    public static getAccessToken(){
        return localStorage.getItem('accessToken');
    }
}
