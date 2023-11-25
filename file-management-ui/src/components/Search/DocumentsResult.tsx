import { useTranslation } from 'react-i18next'
import { useAppTheme, useDocumentAPI } from '@/features/store'

import Table from "@/components/Shared/Tables/Document/DocumentTable"
import PaginateFilter from '@/components/Shared/Tables/Document/PaginateFilter'
import QueryFilterForm from '@/components/Search/QueryFilterForm'
import QueryActions from '@/components/Search/QueryActions'
import QueryLoader from "@/components/Shared/Loaders/QueryLoader";


/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 *******************************************************************************************/
export default function DocumentsResult() {
	const { t } = useTranslation();
	const { isActiveQueryFilter } = useAppTheme()
	const { loading } = useDocumentAPI();
    
	return (
		<>				
			{/*******************			Loading state when fetch data			********************/}
			<QueryLoader isLoading={loading} />
				
			{/*****************			   Page Topic		    ******************/}
			<h1 className='my-3 text-sm text-center dark:text-zinc-300 md:text-xl lg:text-3xl font-PromptBold'>
				{t("Search.topic")}
			</h1>

			{/*****************			   Filter Button & Search Box  		    ******************/}
			<QueryActions />
	
			{/*****************			   Results Group 		    ******************/}
			<div className="flex flex-col items-start justify-center w-full gap-3 lg:flex-row">
				<div className={`${isActiveQueryFilter ? "w-full lg:w-[20%] flex animate-sidebar-menu" : "hidden"} bg-zinc-50 dark:bg-gray-700 rounded-md shadow-md p-5`}>
					<QueryFilterForm />
				</div>
				
				<div className={`content ${isActiveQueryFilter ? "w-full md:w-[85%] md:animate-tb-content" : "w-full"}`}>
					{/*****************		  	       Results 		        ******************/}
					<Table  />

					{/*****************			      Pagination 		    ******************/}
					<PaginateFilter />
				</div>
			</div>
		</>
	)
}
