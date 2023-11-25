export interface IDocumentForm {
	name: string,
	description: string,
	documentCategoryId: string,
}

export interface IDocumentCategory {
	documentCategoryId: string,
	name: string,
	description: string
}

export interface IDocument {
	documentId: string,
	name: string,
	description: string,
	path?: string,
	extension?: string
	sizeInBytes: number,
	activedDate: string,
	documentCategoryId:string,
	documentCategory?: IDocumentCategory,
	apiBaseUrl?: string
}

/*************************************************
 * 	Document Category Response Part
 */
export interface IDocumentCategoryDataResponse {
	total: number,
	pageNo: number,
	pageSize: number,
	apiBaseUrl?: string,
	results: IDocumentCategory[]
}

export interface IDocumentCategoryResponse {
	isSuccess: boolean,
	statusCode: number,
	errorMessage: Array<string>,
	data: IDocumentCategoryDataResponse
}

/*************************************************
 * 	Documents Response Part
 */
export interface IDocumentDataResponse {
	total: number,
	pageNo: number,
	pageSize: number,
	apiBaseUrl?: string,
	results: IDocument[]
}

export interface ISingleDocumentResponse {
	isSuccess: boolean,
	statusCode: number,
	errorMessage: Array<string>,
	data: IDocument
}

export interface IDocumentResponse {
	isSuccess: boolean,
	statusCode: number,
	errorMessage: Array<string>,
	data: IDocumentDataResponse
}