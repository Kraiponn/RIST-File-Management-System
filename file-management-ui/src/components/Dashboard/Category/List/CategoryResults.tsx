import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCategoryAPI } from "@/features/store";

import Table from '@/components/Shared/Tables/Category/CategoryTable';
import PaginateFilter from '@/components/Shared/Tables/Category/PaginateFilter';
import QueryLoader from "@/components/Shared/Loaders/QueryLoader";
import SearchBox from "@/components/Dashboard/Category/SearchBox";


/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function CategoryResults() {
	const { t } = useTranslation();
	const [ searchParams ] = useSearchParams();
	const { categories, loading } = useCategoryAPI();

	const query = searchParams.get("query")

	return (
		<>	
			<div className="relative">			
				{/*******************			Loading state when fetch data			********************/}
				<QueryLoader isLoading={loading} />
				
				{/*******************			Query Results - Label			********************/}
				{categories && categories.total > 0 &&
					<p className="w-full py-2 text-xs text-left md:text-lg lg:text-3xl font-PromptBold">
						{t('Dashboard.documentPage.search.success', { total: categories?.total, keyword: query ? query : '' })}
					</p>
				}

				{/*****************		  	       Input Box to Search Category		        ******************/}
				<SearchBox />
				
				{/*****************		  	       Query Results - Table 		        ******************/}
				<Table />

				{/*****************			      Pagination 		    ******************/}
				<PaginateFilter />
			</div>
		</>
	)
}
