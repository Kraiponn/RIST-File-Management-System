import { useTranslation } from 'react-i18next'
import { useDocumentAPI } from '@/features/store';
import QueryLoader from '@/components/Shared/Loaders/QueryLoader'
import Table from "@/components/Shared/Tables/Document/DocumentTable"
import PaginateFilter from '@/components/Shared/Tables/Document/PaginateFilter'

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 *******************************************************************************************/
export default function DocumentsResult() {
	const { t } = useTranslation();
	const { loading } = useDocumentAPI();
	
	return (
		<>				
			{/*******************			Loading state when fetch data			********************/}
			<QueryLoader isLoading={loading} />
				
			{/*****************			   Page Topic		    ******************/}
			<h1 className='my-5 text-sm text-center dark:text-zinc-300 md:text-xl lg:text-3xl font-PromptBold'>
				{t("Home.topic")}
			</h1>
	
			{/*****************		  	       Results 		        ******************/}
			<Table />

			{/*****************			      Pagination 		    ******************/}
			<PaginateFilter />
		</>
	)
}