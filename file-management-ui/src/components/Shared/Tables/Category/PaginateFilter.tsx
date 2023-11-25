import { ChangeEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCategoryAPI } from '@/features/store';
import { Pagination } from '@mui/material';


/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 *******************************************************************************************/
export default function PainationWithFilter() {
	const { t } = useTranslation();
	const navigate = useNavigate()
	const [ searchParams ] = useSearchParams()
	const { 
		setPageNo,
		setPageSize,
		pageNo,
		pageSize,
		totalPage,
		categories
	} = useCategoryAPI();
	const query = searchParams.get('query')
	
	function handlePageChange(_ : ChangeEvent<unknown>, page: number): void {
		setPageNo(page)
		
		navigate(`/dashboard/categories?pageNo=${page}&pageSize=${pageSize}&query=${query ? query : ""}`)
	}

	function handleDisplayDataPerPageChange(event: ChangeEvent<HTMLSelectElement>): void {
		const pSize = (Number)(event.target.value)
		setPageSize(pSize)
		
		navigate(`/dashboard/categories?pageNo=${pageNo}&pageSize=${pSize}&query=${query ? query : ""}`)
	}

	if(!categories?.results || categories.total === undefined) {
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
					{t('Table.pagination.filter-perpage-title1')}
				</h3>
				
				<select 
					id="display-categories-per-page" 
					defaultValue={pageSize}
					onChange={handleDisplayDataPerPageChange}
					className="block text-sm text-center text-gray-900 border border-gray-300 rounded-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
					<option value={2}>2</option>
					<option value={5}>5</option>
					<option value={10}>10</option>
					<option value={15}>15</option>
					<option value={25}>25</option>
					<option value={50}>50</option>
				</select>
				
				<h3 className="flex items-center justify-center text-gray-900 dark:text-zinc-50">
					{t('Table.pagination.filter-perpage-title2')}
				</h3>
			</div>
		</div>
	)
}