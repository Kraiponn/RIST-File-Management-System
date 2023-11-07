import { ChangeEvent } from 'react';
import { Pagination } from '@mui/material';

type PageProps = {
	pageNo: number,
	pageSize: number,
	totalPage: number,
	onPageChange: (event: ChangeEvent<unknown>, page: number)=> void,
}

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 *******************************************************************************************/
export default function Content({ pageNo, totalPage, onPageChange }: PageProps) {
	function handlePageChange(event: ChangeEvent<unknown>, page: number): void {
		onPageChange(event, page);
	}

	return (
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
	)
}