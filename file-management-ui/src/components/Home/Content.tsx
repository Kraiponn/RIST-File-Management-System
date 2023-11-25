import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { useAppTheme, useDocumentAPI } from '@/features/store'
import { useToastify } from "@/components/Shared/Actions/useToastify";

import Layout from "@/components/Shared/Layout"
import NotFound from '@/components/Shared/NotFound';
import ActionResponseWithOutLoader from '@/components/Shared/Actions/ActionResponseWithOutLoader';
import DocumentsResult from '@/components/Home/DocumentsResult'

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 *******************************************************************************************/
export default function Content() {
	const { t } = useTranslation();
	const [ searchParams ] = useSearchParams()
	const { locale } = useAppTheme()
	const { callNotify } = useToastify()
	const { 
		getDocuments,
		documents,
		pageNo,
		pageSize,
		isSuccess
	} = useDocumentAPI();

	useEffect(() => {
		const pNo = searchParams.get('pageNo')
		const pSize = searchParams.get('pageSize')

		if(isSuccess) {
			const successMsg = `🦄 ${t("Dashboard.progress.success", { keyword: locale === 'en' ? "Remove file" : "ลบเอกสาร" })}`
			callNotify("success", successMsg, 2000)
		}

		if(pNo && pSize) {
			getDocuments(locale, parseInt(pNo), parseInt(pSize), '')
		} else {
			getDocuments(locale, pageNo, pageSize, '')
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getDocuments, searchParams, isSuccess, t])

	return (
		<Layout title={t("Home.title")}>
			{/*****************			   Show Loading		    ******************/}
			<ActionResponseWithOutLoader />
			
			{documents?.results && documents.total > 0 
				? (<DocumentsResult />)
				:   (<NotFound title={t('Home.data-not-found')} />)			
			}		
		</Layout>
	)
}