import { create } from "zustand";
import { AxiosError } from 'axios';
import { httpClient, getErrorResponse } from '@/features/services';
import { 
	IDocument, 
	IDocumentDataResponse, 
	IDocumentResponse, 
	ISingleDocumentResponse,
	ILocale
} from "@/interfaces";
import { devtools, persist } from "zustand/middleware";
import * as dayjs from 'dayjs'

interface IAPIRequest {
	loading: boolean,
	isSuccess: boolean,
	isError: string,
	isModalActive: boolean,
	pageNo: number,
	pageSize: number,
	totalPage: number,
	query: string,
	resultWithStatus: IDocumentResponse | null,
	documents: IDocumentDataResponse | null,
	document: IDocument | null,
	documentId: string,
	setQuery: (keyword: string) => void,
	setModalActive: (state: boolean, documentId: string) => void,
	clearError: () => void,
	setAlert: (message: string) => void,
	setPageNo: (pageNo: number) => void,
	setPageSize: (pageSize: number) => void,
	getDocuments: (locale: ILocale, pageNo: number, pageSize: number, documentId: string) => void,
	getDocumentById: (locale: ILocale, documentId: string) => void,
	getDocumentsWithFilter: (locale: ILocale, documentName: string, from: string, to: string, pageNo: number, pageSize: number, query: string) => void,
	deletedDocument: (locale: ILocale, documentId: string) => void,
	addDocument: (locale: ILocale, form: FormData) => void,
	editDocument: (locale: ILocale, form: FormData, documentId: string) => void,
}

export const useDocumentAPI = create<IAPIRequest>()(
	devtools(
		persist(
			(set) => ({
				loading: false,
				isSuccess: false,
				isError: '',
				isModalActive: false,
				resultWithStatus: null,
				documents: null,
				document: null,
				documentId: '',
				pageNo: 1,
				pageSize: 5,
				totalPage: 0,
				query: '',
				setQuery: (keyword: string) => set(() => ({ query: keyword })),
				clearError: () => set(() => ({ isError: '', isSuccess: false })),
				setModalActive: (state: boolean, documentId: string) => {
					set(() => ({ isModalActive: state, documentId, isSuccess: false }))
				},
				setAlert: (message: string) => {
					set({ isError: message })
				},
				setPageNo: (pageNo: number) => {
					set(() => ({ pageNo }))
				},
				setPageSize: (pageSize: number) => {
					set(() => ({ pageSize }))
				},
				getDocuments: async (locale: ILocale, pageNo: number, pageSize: number, documentId: string) => {
					// Set loading state
					set(() => ({ loading: true, isError: '', isSuccess: false, query: '' }))
						
					const baseUrl = import.meta.env.VITE_BASE_URL
					const queryUrl = `${baseUrl}/documents?pageNo=${pageNo}&pageSize=${pageSize}&documentId=${documentId}&sortBy=activedDate&isAscending=false`
						
					try {		
						const results = await httpClient.get(queryUrl)
						// console.log(results)

						const resp = results.data as IDocumentResponse

						if(!resp.data && resp.isSuccess !== true ) {
							set(() => ({ resultWithStatus: undefined, documents: undefined }))
							return;
						}

						const _pageSize = resp.data.pageSize
						const total = resp.data.total
						const totalPage = Math.ceil(total / _pageSize)

						set(() => ({ 
								resultWithStatus: resp, 
								documents: resp.data, 
								totalPage,
						}))
					} catch (error) {
						const err = error as AxiosError;
						set(() => ({ isError: getErrorResponse(err, locale)}))
					} finally {
						set(() => ({ loading: false }))
					}
				},
				getDocumentById: async (locale: ILocale, documentId: string) => {
					// Set loading state
					set(() => ({ loading: true, isError: '', isSuccess: false }))
						
					const baseUrl = import.meta.env.VITE_BASE_URL
					const queryUrl = `${baseUrl}/documents/${documentId}`
						
					try {		
						const results = await httpClient.get(queryUrl)
						// console.log(results)

						const resp = results.data as ISingleDocumentResponse

						if(!resp.data && resp.isSuccess !== true ) {
							set(() => ({ document: undefined }))
							return;
						}

						set(({ document: resp.data }))
					} catch (error) {
						const err = error as AxiosError;
						set(() => ({ isError: getErrorResponse(err, locale)}))
					} finally {
						set(() => ({ loading: false }))
					}
				},
				getDocumentsWithFilter: async (locale: ILocale, documentName: string, from: string, to: string, pageNo: number, pageSize: number, query: string) => {
					set(() => ({ loading: true, isError: '' }));

					const baseUrl = import.meta.env.VITE_BASE_URL
					const startDate = from ? dayjs(from).format("YYYY-MM-DD") : ''
					const endDate = to ? dayjs(to).format("YYYY-MM-DD") : ''

					const queryUrl = `${baseUrl}/documents?documentId=${query}&name=${documentName}&startActivedDate=${startDate}&endActivedDate=${endDate}&sortBy=activedDate&isAscending=false&pageNo=${pageNo}&pageSize=${pageSize}`
					// console.log(queryUrl)

					try {		
						const results = await httpClient.get(queryUrl);
						// console.log(results)

						const resp = results.data as IDocumentResponse;

						if(!resp.data && resp.isSuccess !== true ) {
							set(() => ({ resultWithStatus: undefined, documents: undefined }));
							return;
						}

						const _pageSize = resp.data.pageSize;
						const total = resp.data.total;
						const totalPage = Math.ceil(total / _pageSize);

						set(() => ({ 
							resultWithStatus: resp, 
							documents: resp.data, 
							totalPage, 
							// pageNo: resp.data.pageNo, 
							// pageSize: resp.data.pageSize
						}));
					} catch (error) {
						const err = error as AxiosError;
						set(() => ({ isError: getErrorResponse(err, locale)}));
					} finally {
						set(() => ({ loading: false, isSuccess: false }));
					}
				},
				deletedDocument: async (locale: ILocale, documentId: string) => {
					//api/v1/documents/{documentId}
					const baseUrl = import.meta.env.VITE_BASE_URL;
					const queryUrl = `${baseUrl}/documents/${documentId}`

					set(() => ({ loading: true, isError: '', isModalActive: false, isSuccess: false }))

					try {		
						await httpClient.delete(queryUrl)
						set({ isSuccess: true })
					} catch (error) {
						const err = error as AxiosError
						set(() => ({ isError: getErrorResponse(err, locale)}))
					} finally {
						set(() => ({ loading: false, documentId: '' }))
					}
				},
				addDocument: async (locale: ILocale, form: FormData) => {
					//POST - /api/v1/documents
					const baseUrl = import.meta.env.VITE_BASE_URL
					const queryUrl = `${baseUrl}/documents`

					set(() => ({ loading: true, isError: '', isModalActive: false, isSuccess: false }))

					try {		
						await httpClient.post(queryUrl, form, {
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						});

						set({ isSuccess: true });
					} catch (error) {
						const err = error as AxiosError;
						set(() => ({ isError: getErrorResponse(err, locale)}));
					} finally {
						set(() => ({ loading: false, categoryId: '' }));
					}
				},
				editDocument: async (locale: ILocale, form: FormData, documentId: string) => {
					//PUT - /api/v1/documents/{documentId}
					const baseUrl = import.meta.env.VITE_BASE_URL
					const queryUrl = `${baseUrl}/documents/${documentId}`

					set(() => ({ loading: true, isError: '', isModalActive: false, isSuccess: false }))

					try {		
						await httpClient.put(queryUrl, form, {
							headers: {
								'Content-Type': 'multipart/form-data'
							}
						});

						set({ isSuccess: true });
					} catch (error) {
						const err = error as AxiosError;
						set(() => ({ isError: getErrorResponse(err, locale)}));
					} finally {
						set(() => ({ loading: false, categoryId: '' }));
					}
				},
			}), 
			{ name: 'DocumentStore' }
		)
	)
)
