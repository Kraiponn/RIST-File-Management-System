import { create } from "zustand";
import { AxiosError } from 'axios';
import { httpClient, getErrorResponse } from '@/features/services';
import { 
	ICategory, 
	ICategoryDataResponse, 
	ICategoryForm, 
	ICategoryResponse, 
	ISingleCategoryResponse,
	ILocale
} from "@/interfaces";
import { devtools, persist } from "zustand/middleware";

interface IAPIRequest {
	loading: boolean,
	isFetch: boolean,
	isSuccess: boolean,
	isError: string,
	isModalActive: boolean,
	pageNo: number,
	pageSize: number,
	totalPage: number,
	query: string,
	resultWithStatus: ICategoryResponse | null,
	categories: ICategoryDataResponse | null,
	category: ICategory | null,
	categoryId: string,
	clearCatgegory: () => void,
	setQuery: (keyword: string) => void,
	setModalActive: (isOpen: boolean, categoryId: string) => void,
	clearError: () => void,
	setPageNo: (pageNo: number) => void,
	setPageSize: (pageSize: number) => void,
	getCategories: (locale: ILocale, pageNo: number, pageSize: number, name: string) => void,
	getCategoryById:  (locale: ILocale, categoryId: string) => void,
	deletedCategory: (locale: ILocale, categoryId: string) => void,
	AddCategory: (locale: ILocale, form: ICategoryForm) => void
	EditCategory:  (locale: ILocale, form: ICategoryForm, categoryId: string) => void
}

export const useCategoryAPI = create<IAPIRequest>()(
	devtools(
		persist(
			(set) => ({
				loading: false,
				isSuccess: false,
				isError: '',
				isModalActive: false,
				isFetch: false,
				resultWithStatus: null,
				categories: null,
				category: null,
				categoryId: '',
				pageNo: 1,
				pageSize: 5,
				totalPage: 0,
				query: '',
				clearCatgegory: () => {
					set(({ isError: '', isSuccess: false, categoryId: '' }))
				},
				setQuery: (keyword: string) => set(() => ({ query: keyword })),
				clearError: () => set(() => ({ isError: '', isSuccess: false })),
				setModalActive: (isOpen: boolean, categoryId: string) => {
					set(() => ({ isModalActive: isOpen, categoryId, isSuccess: false }))
				},
				setPageNo: (pageNo: number) => {
					set(() => ({ pageNo }))
				},
				setPageSize: (pageSize: number) => {
					set(() => ({ pageSize }))
				},
				getCategories: async (locale: ILocale, pageNo: number, pageSize: number, name: string) => {
					// Set loading state
					set(() => ({ loading: true, isError: '', query: '' }))
						
					const baseUrl = import.meta.env.VITE_BASE_URL
					const queryUrl = `${baseUrl}/document-categories?filterOn=name&filterQuery=${name}&pageNo=${pageNo}&pageSize=${pageSize}&sortBy=name&isAscending=false`

					try {		
						const results = await httpClient.get(queryUrl)
						// console.log(results)

						const resp = results.data as ICategoryResponse

						if(!resp.data && resp.isSuccess !== true ) {
							set(() => ({ resultWithStatus: undefined, categories: undefined }))
							return;
						}

						const _pageSize = resp.data.pageSize
						const total = resp.data.total
						const totalPage = Math.ceil(total / _pageSize)

						set(() => ({ 
								resultWithStatus: resp, 
								categories: resp.data, 
								totalPage
						}))
					} catch (error) {
						const err = error as AxiosError;
						set(() => ({ isError: getErrorResponse(err, locale)}))
					} finally {
						set(() => ({ loading: false, isFetch: false, isSuccess: false }))
					}
				},
				getCategoryById: async (locale: ILocale, categoryId: string) => {
					// Set loading state
					set(() => ({ loading: true, isError: '' }))
						
					const baseUrl = import.meta.env.VITE_BASE_URL
					const queryUrl = `${baseUrl}/document-categories/${categoryId}`

					try {		
						const results = await httpClient.get(queryUrl)
						// console.log(results)

						const resp = (results.data) as ISingleCategoryResponse

						if(!resp.data && resp.isSuccess !== true ) {
							set(() => ({ category: null }))
							return;
						}

						set({ category: resp.data })
					} catch (error) {
						const err = error as AxiosError;
						set(() => ({ isError: getErrorResponse(err, locale)}))
					} finally {
						set(() => ({ loading: false, isFetch: false, isSuccess: false }))
					}
				},
				deletedCategory: async (locale: ILocale, categoryId: string) => {
					//DELETE - /api/v1/document-categories/{documentCategoryId}
					const baseUrl = import.meta.env.VITE_BASE_URL;
					const queryUrl = `${baseUrl}/document-categories/${categoryId}`

					set(() => ({ loading: true, isError: '', isModalActive: false, isFetch: true, isSuccess: false }))

					try {		
						await httpClient.delete(queryUrl);
						set({ isSuccess: true });
					} catch (error) {
						const err = error as AxiosError;
						set(() => ({ isError: getErrorResponse(err, locale)}));
					} finally {
						set(() => ({ loading: false, categoryId: '' }));
					}
				},
				AddCategory: async (locale: ILocale, form: ICategoryForm) => {
					//POST - /api/v1/document-categories
					const baseUrl = import.meta.env.VITE_BASE_URL
					const queryUrl = `${baseUrl}/document-categories`

					set(() => ({ loading: true, isError: '', isModalActive: false, isSuccess: false }))

					try {		
						await httpClient.post(queryUrl, form);
						set({ isSuccess: true });
					} catch (error) {
						const err = error as AxiosError;
						set(() => ({ isError: getErrorResponse(err, locale)}));
					} finally {
						set(() => ({ loading: false, categoryId: '' }));
					}
				},
				EditCategory: async (locale: ILocale, form: ICategoryForm, categoryId: string) => {
					//PUT - /api/v1/document-categories/{categoryId}
					const baseUrl = import.meta.env.VITE_BASE_URL
					const queryUrl = `${baseUrl}/document-categories/${categoryId}`

					set(() => ({ loading: true, isError: '', isModalActive: false, isSuccess: false }))

					try {		
						await httpClient.put(queryUrl, form);
						set({ isSuccess: true });
					} catch (error) {
						const err = error as AxiosError;
						set(() => ({ isError: getErrorResponse(err, locale)}));
					} finally {
						set(() => ({ loading: false, categoryId: '' }));
					}
				}
			}), 
			{ name: 'CategoryStore' }
		)
	)
)
