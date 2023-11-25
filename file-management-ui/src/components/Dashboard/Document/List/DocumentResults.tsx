import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDocumentAPI } from '@/features/store/useDocumentAPI';

import Table from '@/components/Shared/Tables/Document/DocumentTable';
import PaginateFilter from '@/components/Shared/Tables/Document/PaginateFilter';
import QueryFilterForm from '@/components/Dashboard/Common/QueryFilterForm'
import QueryLoader from "@/components/Shared/Loaders/QueryLoader";


/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function DocumentResults() {
	const { t } = useTranslation();
	const [ searchParams ] = useSearchParams();
	const { documents, loading } = useDocumentAPI();

	const query = searchParams.get("query")

	return (
		<>	
			<div className="relative">			
				{/*******************			Loading state when fetch data			********************/}
				<QueryLoader isLoading={loading} />
				
				{/*******************			Query Results - Label			********************/}
				{documents && documents.total > 0 &&
					<p className="w-full py-2 text-xs text-left md:text-lg lg:text-3xl font-PromptBold">
						{t('Dashboard.documentPage.search.success', { total: documents?.total, keyword: query ? query : '' })}
					</p>
				}

				<QueryFilterForm />
				
				{/*****************		  	       Query Results - Table 		        ******************/}
				<Table />

				{/*****************			      Pagination 		    ******************/}
				<PaginateFilter />
			</div>
		</>
	)
}
