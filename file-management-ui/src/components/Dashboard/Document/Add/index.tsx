import { useEffect } from "react";
import { useTranslation } from 'react-i18next'
import { useNavigate } from "react-router-dom";
import { useToastify } from "@/components/Shared/Actions/useToastify";
import { useDocumentAPI, useAppTheme, useCategoryAPI } from '@/features/store';

import ActionResponse from '@/components/Dashboard/Common/ActionResponse'
import BreadCrumbs from '@/components/Dashboard/Document/Add/BreadCrumbs'
import DocumentForm from '@/components/Dashboard/Document/Form'

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function AddDocument() {
	const { t }  = useTranslation()
	const navigate = useNavigate()
	const { callNotify } = useToastify()
	const { locale } = useAppTheme()
	const { isSuccess, clearError } = useDocumentAPI()
	const { getCategories } = useCategoryAPI()

	useEffect(() => {
		if(isSuccess) {
			const successMsg = `🦄 ${t("Dashboard.progress.success", { keyword: locale === 'en' ? "Added file" : "เพิ่มข้อมูล" })}`
			callNotify("success", successMsg, 2000)

			clearError()
			navigate('/dashboard/documents')
		}
	}, [callNotify, clearError, isSuccess, locale, navigate, t])

	useEffect(() => {
		getCategories(locale, 1, 1000, '');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	
	return (
		<>
			{/*****************	*		   All action components for api response		    ******************/}
			<ActionResponse />

			{/************************			   CONTENT              *************************/}
			<div className="w-full p-5">
				<BreadCrumbs />		
				
				<h1 className='w-full text-sm text-center text-gray-800 my-7 sm:text-xl md:text-3xl font-PromptBold dark:text-zinc-50'>
					{t(`Dashboard.documentPage.addEdit.topic`, { label: locale === 'en' ? 'Add' : 'เพิ่ม' })}
				</h1>	

				<DocumentForm processType="add" />
			</div>
		</>
	)
}