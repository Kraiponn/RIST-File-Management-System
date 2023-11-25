import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useToastify } from "@/components/Shared/Actions/useToastify";
import { useAppTheme, useDocumentAPI } from '@/features/store'

import Layout from "@/components/Shared/Layout"
import NotFound from "@/components/Shared/NotFound"
import DocumentsResult from '@/components/Search/DocumentsResult'
import ActionResponseWithOutLoader from '@/components/Shared/Actions/ActionResponseWithOutLoader';

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 *******************************************************************************************/
export default function Content() {
	const [searchParams] = useSearchParams();
	const { t } = useTranslation();
	const { locale } = useAppTheme()
	const { callNotify } = useToastify()
	const { 
		getDocuments, 
		getDocumentsWithFilter,
		documents, 
		pageNo, 
		pageSize,
		isSuccess
	} = useDocumentAPI();
    
	useEffect(() => {
		const documentId = searchParams.get("query")
		const documentName = searchParams.get("documentName")
		const fromDate = searchParams.get("fromDate")
		const toDate = searchParams.get("toDate")

		const pNo = searchParams.get('pageNo')
		const pSize = searchParams.get('pageSize')

		if(isSuccess) {
			const successMsg = `🦄 ${t("Dashboard.progress.success", { keyword: locale === 'en' ? "Remove file" : "ลบเอกสาร" })}`
			callNotify("success", successMsg, 2000)
		}

		if(pNo && pSize) {
			if(documentName && fromDate && toDate) {
				getDocumentsWithFilter(locale, documentName, fromDate, toDate, parseInt(pNo), parseInt(pSize), documentId ? documentId : '');
			} else if(fromDate && toDate) {
				getDocumentsWithFilter(locale, '', fromDate, toDate, parseInt(pNo), parseInt(pSize), documentId ? documentId : '');
			} else {
				getDocuments(locale, parseInt(pNo), parseInt(pSize), documentId ? documentId : '')
			}
		} else {
			if(documentName && fromDate && toDate) {
				getDocumentsWithFilter(locale, documentName, fromDate, toDate, pageNo, pageSize, documentId ? documentId : '');
			} else if(fromDate && toDate) {
				getDocumentsWithFilter(locale, '', fromDate, toDate, pageNo, pageSize, documentId ? documentId : '');
			} else {
				getDocuments(locale, pageNo, pageSize, documentId ? documentId : '')
			}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [getDocumentsWithFilter, searchParams, getDocuments, isSuccess, t]);

	return (
		<Layout title={t("Search.title")}>
			{/*****************	 Action components for show the status from API services   ******************/}
			<ActionResponseWithOutLoader />
			
			{documents?.results && documents.total > 0 
				? <DocumentsResult />
				: <NotFound title={t('Search.data-not-found')} />
			}		
		</Layout>
	)
}
