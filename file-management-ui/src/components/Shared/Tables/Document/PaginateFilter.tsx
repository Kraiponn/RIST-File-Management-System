import { ChangeEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDocumentAPI } from '@/features/store';
import { Pagination } from '@mui/material';


/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 *******************************************************************************************/
export default function PainationWithFilter() {
	const { t } = useTranslation();
	const navigate = useNavigate()
	const [ searchParams ] =useSearchParams()
	const { 
		setPageNo,
		setPageSize,
		pageNo,
		pageSize,
		totalPage,
		documents
	} = useDocumentAPI();
	const query = searchParams.get('query')
	const documentName = searchParams.get("documentName")
	const fromDate = searchParams.get("fromDate")
	const toDate = searchParams.get("toDate")
	
	function handlePageChange(_ : ChangeEvent<unknown>, page: number): void {
		setPageNo(page)
		
		if(documentName && fromDate && toDate) {
			navigate(`?pageNo=${page}&pageSize=${pageSize}&query=${query ? query : ""}&documentName=${documentName}&fromDate=${fromDate}&toDate=${toDate}`)
		} else if(fromDate && toDate) {
			navigate(`?pageNo=${page}&pageSize=${pageSize}&query=${query ? query : ""}&fromDate=${fromDate}&toDate=${toDate}`)
		} else {
			navigate(`?pageNo=${page}&pageSize=${pageSize}&query=${query ? query : ""}`)
		}
	}

	function handleDisplayDocumentsPerPageChange(event: ChangeEvent<HTMLSelectElement>): void {
		const pSize = (Number)(event.target.value)
		setPageSize(pSize)

		if(documentName && fromDate && toDate) {
			navigate(`?pageNo=${pageNo}&pageSize=${pSize}&query=${query ? query : ""}&documentName=${documentName}&fromDate=${fromDate}&toDate=${toDate}`)
		} else if(fromDate && toDate) {
			navigate(`?pageNo=${pageNo}&pageSize=${pSize}&query=${query ? query : ""}&fromDate=${fromDate}&toDate=${toDate}`)
		} else {
			navigate(`?pageNo=${pageNo}&pageSize=${pSize}&query=${query ? query : ""}`)
		}
	}

	if(!documents?.results || documents.total === undefined) {
		return null
	}

	return (
		<div className="flex flex-col items-center justify-start gap-5 md:flex-row md:justify-between">
			{/*****************			      Paginate 		    ******************/}
			<Pagination
				page={pageNo}
				count={totalPage}
				onChange={handlePageChange}
				variant='outlined'
				shape='rounded'
				size='medium'
				color='standard'
				className='order-2'
			/>
			
			{/*****************			      Paginate Filter 		    ******************/}
			<div className="flex items-center justify-start order-1 gap-2">
				<h3 className="text-gray-900 dark:text-zinc-50">
					{t('Home.pagination.filter-perpage-title1')}
				</h3>
				
				<select 
					id="display-documents-per-page" 
					defaultValue={pageSize}
					onChange={handleDisplayDocumentsPerPageChange}
					className="block text-sm text-center text-gray-900 border border-gray-300 rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option value={2}>2</option>
					<option value={5}>5</option>
					<option value={10}>10</option>
					<option value={15}>15</option>
					<option value={25}>25</option>
					<option value={50}>50</option>
				</select>
				
				<h3 className="flex items-center justify-center text-gray-900 dark:text-zinc-50">
					{t('Home.pagination.filter-perpage-title2')}
				</h3>
			</div>
		</div>
	)
}