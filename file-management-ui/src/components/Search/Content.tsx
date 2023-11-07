import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useDocumentAPI } from '@/features/store'
import Layout from "@/components/Shared/Layout"
import Table from "@/components/Shared/Tables/DTable"
import PaginateFilter from '@/components/Home/PaginateFilter'
import Loading from "@/components/Shared/Loaders/Loading";
import Modal from '@/components/Shared/Modal';
import NotFound from "@/components/Shared/NotFound"
import QueryFilterForm from '@/components/Search/QueryFilterForm'
import QueryActions from '@/components/Search/QueryActions'


/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 *******************************************************************************************/
export default function Content() {
	const [isFilter, setIsFilter] = useState(false)
	const [search, setSearch] = useState('');
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { 
		setPageNo, 
		setPageSize, 
		getDocuments, 
		getDocumentsWithFilter,
		clearError,
		loading, isError, 
		documents, 
		pageNo, 
		pageSize, 
		totalPage 
	} = useDocumentAPI();
    
	useEffect(() => {
		const documentId = searchParams.get("documentId")
		const documentName = searchParams.get("documentName")
		const fromDate = searchParams.get("fromDate")
		const toDate = searchParams.get("toDate")
		
		if(documentId || documentName || fromDate || toDate) {
			getDocumentsWithFilter(
				pageNo, 
				pageSize, 
				documentId, 
				documentName, 
				fromDate, 
				toDate
			);
		} else {
			const documentId = searchParams.get("query")
			getDocuments(pageNo, pageSize, documentId ? documentId : '');
		}
	}, [getDocuments, getDocumentsWithFilter, pageNo, pageSize, searchParams]);


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
			navigate(`/search?query=${search}`);
		}
	}

	const handleToggleFilterForm = () => {
		setIsFilter(!isFilter)
	}

	return (
		<Layout title={t("Search.title")}>
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
				<NotFound title={t('Search.data-not-found')} />
			) : null}
			
			{documents?.results && documents.total > 0 && (
				<>				
					{/*****************			   Page Topic		    ******************/}
					<h1 className='my-10 text-sm text-center dark:text-zinc-300 md:text-xl lg:text-3xl font-PromptBold'>
						{t("Search.topic")}
					</h1>

					{/*****************			   Filter Button & Search Box  		    ******************/}
					<QueryActions 
						searchValue={search}
						onSearchChange={handleSearchChange}
						onToggleFilterForm={handleToggleFilterForm}
						onSubmitSearch={handleSubmitSearch}
					/>
			
					{/*****************			   Results Group 		    ******************/}
					<div className="flex flex-col items-start justify-center w-full gap-3 lg:flex-row">
						<div className={`${isFilter ? "w-full lg:w-[20%] flex animate-search-filter" : "hidden"} bg-zinc-50 dark:bg-gray-700 rounded-md shadow-md p-5`}>
							<QueryFilterForm />
						</div>
						
						<div className={`content ${isFilter ? "w-full md:animate-tb-content" : "w-full"}`}>
							{/*****************		  	       Results 		        ******************/}
							<Table documents={documents} />

							{/*****************			      Pagination 		    ******************/}
							<PaginateFilter 
								title1={t('Search.pagination.filter-perpage-title1')}
								title2={t('Search.pagination.filter-perpage-title2')}
								pageNo={pageNo}
								pageSize={pageSize}
								totalPage={totalPage}
								onPageChange={handlePageChange}
								onDisplayDocumentsPerPageChange={handleDisplayDocumentsPerPageChange}
							/>
						</div>
					</div>
				</>
			)}		
		</Layout>
	)
}
