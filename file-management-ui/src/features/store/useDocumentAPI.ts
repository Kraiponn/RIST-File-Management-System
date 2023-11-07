import { create } from "zustand";
import { AxiosError } from 'axios';
import { httpClient, getErrorResponse } from '@/features/services';
import { IDocumentDataResponse, IDocumentResponse } from "@/interfaces";
import { devtools, persist } from "zustand/middleware";
import * as dayjs from 'dayjs'

interface IAPIRequest {
	firstLoad: string,
	loading: boolean,
	isError: string,
	pageNo: number,
	pageSize: number,
	totalPage: number,
	query: string,
	resultWithStatus: IDocumentResponse | null,
	documents: IDocumentDataResponse | null,
	clearError: () => void,
	setPageNo: (pageNo: number) => void,
	setPageSize: (pageSize: number) => void,
	getDocuments: (pageNo: number, pageSize: number, documentId: string) => void,
	getDocumentsWithFilter: (pageNo: number, pageSize: number, documentId: string | null, documentName: string | null, from: string | null, to: string | null) => void,
	downloadDocument: (documentId: string) => void,
}

export const useDocumentAPI = create<IAPIRequest>()(
	devtools(
		persist(
			(set) => ({
				firstLoad: '',
				loading: false,
				isError: '',
				resultWithStatus: null,
				documents: null,
				pageNo: 1,
				pageSize: 10,
				totalPage: 0,
				query: '',
				clearError: () => set(() => ({ isError: '' })),
				setPageNo: (pageNo: number) => {
					set(() => ({ pageNo }))
				},
				setPageSize: (pageSize: number) => {
					set(() => ({ pageSize }))
				},
				downloadDocument: async (documentId: string) => {
					//api/v1/documents/downlaodfile/{documentId}
					set(() => ({ loading: true, isError: '' }))
					const baseUrl = import.meta.env.VITE_BASE_URL;
					const queryUrl = `${baseUrl}/documents/downlaodfile/${documentId}`
					console.log(queryUrl)

					try {		
						const results = await httpClient.get(queryUrl);
						console.log(results)

						// const resp = results.data as IDocumentResponse;

						// if(!resp.data && resp.isSuccess !== true ) {
						// 	set(() => ({ resultWithStatus: undefined, documents: undefined }));
						// 	return;
						// }

						// const _pageSize = resp.data.pageSize;
						// const total = resp.data.total;
						// const totalPage = Math.ceil(total / _pageSize);

						// set(() => ({ 
						// 		resultWithStatus: resp, 
						// 		documents: resp.data, 
						// 		totalPage, 
						// 		pageNo: resp.data.pageNo, 
						// 		pageSize: resp.data.pageSize
						// }));
					} catch (error) {
						const err = error as AxiosError;
						set(() => ({ isError: getErrorResponse(err)}));
					} finally {
						set(() => ({loading: false}));
					}
				},
				getDocuments: async (pageNo: number, pageSize: number, documentId: string) => {
					set(() => ({ loading: true, isError: '' }))
					const baseUrl = import.meta.env.VITE_BASE_URL;
					const queryUrl = `${baseUrl}/documents?pageNo=${pageNo}&pageSize=${pageSize}&documentId=${documentId}&sortBy=activedDate&isAscending=false`

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
								pageNo: resp.data.pageNo, 
								pageSize: resp.data.pageSize
						}));
					} catch (error) {
						const err = error as AxiosError;
						set(() => ({ isError: getErrorResponse(err)}));
					} finally {
						set(() => ({loading: false}));
					}
				},
				getDocumentsWithFilter: async (pageNo: number, pageSize: number, documentId: string | null, documentName: string | null, from: string | null, to: string | null) => {
					set(() => ({ loading: true, isError: '' }))
					const baseUrl = import.meta.env.VITE_BASE_URL
					const docName = documentName
					const startDate = !from ? '' : dayjs(from as string).format("YYYY-MM-DD")
					const endDate = !to ? '' :  dayjs(to as string).format("YYYY-MM-DD")

					const queryUrl = `${baseUrl}/documents?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=activedDate&isAscending=false&documentId=${documentId}&name=${docName}&startActivedDate=${startDate}&endActivedDate=${endDate}`

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
								pageNo: resp.data.pageNo, 
								pageSize: resp.data.pageSize
						}));
					} catch (error) {
						const err = error as AxiosError;
						set(() => ({ isError: getErrorResponse(err)}));
					} finally {
						set(() => ({loading: false}));
					}
				},
			}), 
			{ name: 'DocumentStore' }
		)
	)
)
