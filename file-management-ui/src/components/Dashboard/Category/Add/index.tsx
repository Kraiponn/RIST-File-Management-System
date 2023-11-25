import { useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom';
import { useToastify } from "@/components/Shared/Actions/useToastify";
import { useAppTheme, useCategoryAPI } from '@/features/store';

import ActionResponse from '@/components/Dashboard/Category/ActionResponse'
import BreadCrumbs from '@/components/Dashboard/Category/Add/BreadCrumbs'
import Form from '@/components/Dashboard/Category/Form'


/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function AddCategory() {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { callNotify } = useToastify()
	const { locale } = useAppTheme()
	const { isSuccess, clearCatgegory } = useCategoryAPI()

	useEffect(() => {
		if(isSuccess) {
			const successMsg = `🦄 ${t("Dashboard.progress.success", { keyword: locale === 'en' ? "Added file" : "เพิ่มข้อมูล" })}`
			callNotify("success", successMsg, 2000)

			clearCatgegory()
			navigate('/dashboard/categories')
		}
	}, [callNotify, clearCatgegory, isSuccess, locale, navigate, t])
	
	return (
		<>
			{/*****************	*		   All action components for api response		    ******************/}
			<ActionResponse />

			{/************************			   CONTENT              *************************/}
			<div className="w-full p-5">
				<BreadCrumbs />		
				
				<h1 className='w-full text-sm text-center text-gray-800 my-7 sm:text-xl md:text-3xl font-PromptBold dark:text-zinc-50'>
					{t('Dashboard.categoryPage.addEdit.topic', { label: locale === 'en' ? "Add" : "เพิ่ม" })}
				</h1>	

				<Form processType='add' />
			</div>
		</>
	)
}
