import categoryService from '../services/CategoryService';

export const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES';
export const GET_ALL_CATEGORIES_SUCCESS = 'GET_ALL_CATEGORIES_SUCCESS';
export const GET_ALL_CATEGORIES_FAILED = 'GET_ALL_CATEGORIES_FAILED';

export function getAllCategories() {
    const categories = categoryService.getAllCategories();
    return {
        type: GET_ALL_CATEGORIES,
        payload: categories
    };
}

export function getAllCategoriesSuccess(categories) {
    return {
        type: GET_ALL_CATEGORIES_SUCCESS,
        payload: categories
    };
}

export function getAllCategoriesFailed(error) {
    return {
        type: GET_ALL_CATEGORIES_FAILED,
        payload: error
    };
}