import { AuthorModel } from "./AuthorModels";
import { CategoryModel } from "./CategoryModels";

export interface BookModel {
    id: string;
    title: string;
    author: AuthorModel;
    category: CategoryModel;
    publishedDate: string;
    createdAt: string;
    description: string;
    publicationDate: string;
    language: BookLanguage;
    quantity: number;
    interpreters: string;
}

export interface GetBooksResponse {
    items : BookModel[];
}

export interface CreateBookRequest {
    title: string;
    authorId: string;
    categoryId: string;
    publisherId: string;
    publishedDate: string;
    description: string;
    publicationDate: string;
    language: BookLanguage;
    quantity: number;
    interpreters: string;
}

export interface UpdateBookRequest {
    id: string;
    title: string;
    authorId: string;
    categoryId: string;
    publisherId: string;
    publishedDate: string;
    description: string;
    publicationDate: string;
    language: BookLanguage;
    quantity: number;
    interpreters: string;
}

export enum BookLanguage {
    Persian,
    English,
    Other
}