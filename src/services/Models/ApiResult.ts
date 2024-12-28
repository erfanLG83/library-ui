export type ApiResult<T = void> =
{
    success: boolean;
    errors: ApiError[];
    data?: T;
}

export type ApiError = {
    code: string;
    message: string;
}

export type BadRequestResponse = {
    errors: ApiError[];
}