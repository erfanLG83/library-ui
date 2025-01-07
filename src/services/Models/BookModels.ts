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
    interpreters: string;
    image: string | null;
    bookInBranches: BookInBranchModel[];
}

export interface SearchBookModel {
    id: string;
    title: string;
    author: AuthorModel;
    category: CategoryModel;
    image: string | null;
    bookInBranches: BookInBranchModel[];
}

export interface BookInBranchModel {
    branch: LibraryBranch;
    quantity: number;
}

export enum LibraryBranch{
    Branch1,
    Branch2
}

export interface CreateBookRequest {
    title: string;
    authorId: string;
    categoryId: string;
    publisherId: string;
    description: string;
    publicationDate: string;
    language: BookLanguage;
    bookInBranches: BookInBranchModel[];
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
    bookInBranches: BookInBranchModel[];
    interpreters: string | null;
}

export enum BookLanguage {
    Persian,
    English,
    Other
}