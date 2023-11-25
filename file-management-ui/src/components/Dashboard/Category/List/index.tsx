import { useEffect } from "react";
import { useTranslation } from "react-i18next"
import { useSearchParams } from "react-router-dom";
import { useAppTheme, useCategoryAPI } from '@/features/store';
import { useToastify } from "@/components/Shared/Actions/useToastify";

import CategoryResults from '@/components/Dashboard/Category/List/CategoryResults'
import DataNotFound from '@/components/Dashboard/Common/DataNotFound'
import ActionResponseWithOutLoader from '@/components/Dashboard/Category/ActionResponseWithOutLoader'
import BreadCrumbs from '@/components/Dashboard/Category/List/BreadCrumbs'

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function CategoryList() {
	const [searchParams] = useSearchParams()
	const { t } = useTranslation()
	const { callNotify } = useToastify()
	const { locale } = useAppTheme()
	const { 
		getCategories, 
		categories, 
		pageNo, 
		pageSize,
		isSuccess
	} = useCategoryAPI()
    
	useEffect(() => {
		const categoryName = searchParams.get("query")
		const pNo = searchParams.get('pageNo')
		const pSize = searchParams.get('pageSize')

		if(pNo && pSize) {
			getCategories(locale, parseInt(pNo), parseInt(pSize), categoryName ? categoryName : '')
		} else {
			getCategories(locale, pageNo, pageSize, categoryName ? categoryName : '')
		}

		if(isSuccess) {
			const successMsg = `🦄 ${t("Dashboard.progress.success", { keyword: locale === 'en' ? "Remove file" : "ลบเอกสาร" })}`
			callNotify("success", successMsg, 2000)
		}
		
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchParams, getCategories, isSuccess]);

	return (
		<>
			{/*****************	*		   All action components for api response		    ******************/}
			<ActionResponseWithOutLoader /> 

			{/************************			   CONTENT              *************************/}
			<div className="w-full p-5">
				<BreadCrumbs />		
				{categories?.results && categories.total > 0 
					? (<CategoryResults />) 
					: (<DataNotFound />)
				}		
			</div>
		</>
	)
}
