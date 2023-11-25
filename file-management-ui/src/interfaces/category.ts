export interface ICategoryForm {
	name: string,
	description: string
}

export interface ICategory {
	documentCategoryId: string,
	name: string,
	description: string
}

export interface ICategoryDataResponse {
	total: number,
	pageNo: number,
	pageSize: number,
	apiBaseUrl: string,
	results: ICategory[]
}

export interface ICategoryResponse {
	isSuccess: boolean,
	statusCode: number,
	errorMessage: Array<string>,
	data: ICategoryDataResponse
}

export interface ISingleCategoryResponse {
	isSuccess: boolean,
	statusCode: number,
	errorMessage: Array<string>,
	data: ICategory
}