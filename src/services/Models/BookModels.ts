import { AuthorModel } from "./AuthorModels";
import { CategoryModel } from "./CategoryModels";

export interface BookModel {
    id: string;
    title: string;
    author: AuthorModel;
    category: CategoryModel;
    publicationDate: string;
    createdAt: string;
    description: string;
    language: BookLanguage;
    quantity: number;
    interpreters: string;
}

export interface CreateBookRequest {
    title: string;
    authorId: string;
    categoryId: string;
    publisherId: string;
    description: string;
    publicationDate: string;
    language: BookLanguage;
    quantity: number;
    interpreters: string | null;
}

export interface UpdateBookRequest {
    id: string;
    title: string;
    authorId: string;
    categoryId: string;
    publisherId: string;
    description: string;
    publicationDate: string;
    language: BookLanguage;
    quantity: number;
    interpreters: string | null;
}

export enum BookLanguage {
    Persian,
    English,
    Other
}