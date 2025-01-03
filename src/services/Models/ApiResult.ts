export type ApiResult<T = void> =
{
    success: boolean;
    errors: ApiError[];
    data?: T | null;
}

export type ApiError = {
    code: string;
    message: string;
}

export type BadRequestResponse = {
    errors: ApiError[];
}

export enum BooksListOrderBy { 
    title,
    createdDate
}

export type PaginationModel<T> = {
    items: T[];
    pageIndex: number;
    pageSize: number;
    totalCount: number;
}