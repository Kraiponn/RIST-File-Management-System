import { ChangeEvent } from 'react';
import Pagination from '@/components/Shared/Tables/Pagination'

type PageProps = {
	title1: string,
	title2: string,
	pageNo: number,
	pageSize: number,
	totalPage: number,
	onPageChange: (_ : ChangeEvent<unknown>, page: number) => void,
	onDisplayDocumentsPerPageChange: (event: ChangeEvent<HTMLSelectElement>) => void,
}

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 *******************************************************************************************/
export default function Content({ 
	title1,
	title2,
	pageNo, 
	pageSize, 
	totalPage, 
	onPageChange, 
	onDisplayDocumentsPerPageChange 
} : PageProps) {
	function handlePageChange(_ : ChangeEvent<unknown>, page: number): void {
		onPageChange(_, page);
	}

	function handleDisplayDocumentsPerPageChange(event: ChangeEvent<HTMLSelectElement>): void {
		onDisplayDocumentsPerPageChange(event);
	}

	return (
		<div className="flex flex-col items-center justify-start gap-5 md:flex-row md:justify-between">
			<Pagination 
				pageNo={pageNo}
				pageSize={pageSize}
				totalPage={totalPage}
				onPageChange={handlePageChange}
			/>
			<div className="flex items-center justify-start order-1 gap-2">
				<h3 className="text-gray-900 dark:text-zinc-50">
					{title1}
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
					{title2}
				</h3>
			</div>
		</div>
	)
}