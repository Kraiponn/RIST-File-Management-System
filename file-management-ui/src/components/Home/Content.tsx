import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAppTheme } from '@/features/store/ui'
import { BsSearch } from 'react-icons/bs'

import { useDocumentAPI } from '@/features/store'
import Layout from "@/components/Shared/Layout"
import Table from "@/components/Shared/Tables/DTable"
import PaginateFilter from '@/components/Home/PaginateFilter'
import Loading from "@/components/Shared/Loaders/Loading";
import Modal from '@/components/Shared/Modal';
import NotFound from '@/components/Shared/NotFound';

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 *******************************************************************************************/
export default function Content() {
	const [search, setSearch] = useState('')
	const { isDarkMode } = useAppTheme();
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { 
		setPageNo, 
		setPageSize, 
		getDocuments, 
		clearError,
		loading, isError, 
		documents, 
		pageNo, 
		pageSize, 
		totalPage 
	} = useDocumentAPI();
    
	useEffect(() => {
		getDocuments(pageNo, pageSize, '');
	}, [getDocuments, pageNo, pageSize]);

	function handlePageChange(_ : ChangeEvent<unknown>, page: number): void {
		setPageNo(page);
	}

	function handleDisplayDocumentsPerPageChange(event: ChangeEvent<HTMLSelectElement>): void {
		const pageSize = (Number)(event.target.value)
		setPageSize(pageSize);
	}

	const handleCloseModal = () => {
		clearError();
	}

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) =>  {
		setSearch(event.target.value);
	}

	const handleSubmitSearch = (event: KeyboardEvent<HTMLInputElement>) =>  {
		if(event.code === 'Enter') {
			// navigate(`/search?query=${search}`, { state: { query: search } });
			navigate(`/search?query=${search}`);
		}
	}

	return (
		<Layout title={t("Home.title")}>
			{/*****************			   Show Loading		    ******************/}
			{loading && (
				<Loading 
					isLoading={true}
					color="#fcd34d"
					size={80}
					speed={0.789}
					loaderType='Pacman'
				/>
			)}

			{/*****************			   Show Error Response		    ******************/}
			{(isError) && (
				<Modal 
					iconType='Error'
					isShow={true}
					title='!Oops'
					description={isError}
					buttonLabel={`Close`}
					onCloseModal={handleCloseModal}
				/>
			)}

			{!documents?.results || documents.total === 0  ? (
				<NotFound title={t('Home.data-not-found')} />
			) : null}
			
			{documents?.results && documents.total > 0 && (
				<>				
					{/*****************			   Page Topic		    ******************/}
					<h1 className='my-10 text-sm text-center dark:text-zinc-300 md:text-xl lg:text-3xl font-PromptBold'>
						{t("Home.topic")}
					</h1>

					{/*****************			   Query Data 		    ******************/}
					<div className="flex flex-col items-center justify-center gap-4 mb-5 md:flex-row md:justify-end">		
						<div className="relative order-1 md:order-2">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<BsSearch style={{ fontSize: '20px', color: isDarkMode ? 'gray' : 'black' }} />
							</div>
							<input 
								type="text" 
								id="query-navbar" 
								value={search}
								onChange={handleSearchChange}
								onKeyDown={handleSubmitSearch}
								className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
								placeholder={t("Home.input-search")} />
						</div>
					</div>
			
					{/*****************		  	       Results 		        ******************/}
					<Table documents={documents} />

					{/*****************			      Pagination 		    ******************/}
					<PaginateFilter 
						title1={t('Home.pagination.filter-perpage-title1')}
						title2={t('Home.pagination.filter-perpage-title2')}
						pageNo={pageNo}
						pageSize={pageSize}
						totalPage={totalPage}
						onPageChange={handlePageChange}
						onDisplayDocumentsPerPageChange={handleDisplayDocumentsPerPageChange}
					/>
				</>
			)}		
		</Layout>
	)
}


{/* <DatePicker 
	showIcon
	selected={date} 
	onChange={handleStartDateChange}
	// selected={date} 
	// onChange={handleStartDateChange}
	dateFormat='yyyy-MM-dd'
	// dateFormat="MMMM d, yyyy h:mmaa"
	className='text-center border border-solid rounded-lg shadow-lg w-36'
/> */}