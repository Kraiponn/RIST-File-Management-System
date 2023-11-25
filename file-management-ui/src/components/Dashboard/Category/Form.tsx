import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler  } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAppTheme, useCategoryAPI } from '@/features/store';
import { ICategoryForm } from '@/interfaces';
import * as yup from "yup"
import { useEffect } from 'react';

interface IProps {
	processType: 'add' | 'edit'
}

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
  })
  .required()

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function CategoryForm({ processType }: IProps) {
	const { t } = useTranslation()
	const { categoryId } = useParams()
	const { locale } = useAppTheme()
	const { AddCategory, EditCategory, category } = useCategoryAPI()
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<ICategoryForm>({
		resolver: yupResolver(schema),
	})
	
	const onSubmit: SubmitHandler<ICategoryForm> = (data) => {
		if(processType === 'add') 
			AddCategory(locale, data)
		else 
			EditCategory(locale, data, categoryId ? categoryId : '')
	}

	useEffect(() => {
		if(processType === 'edit') {
			setValue("name", category ? category.name : '')
			setValue('description', category ? category.description : '')
		}
	}, [category, processType, setValue])

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col items-center justify-start gap-3 bg-white dark:bg-gray-900 w-full py-12 rounded-md shadow-xl px-7 md:w-[50%] mx-auto">						
				<div className="w-full pb-2">
					<input 
						{...register("name")}
						type="text" 
						placeholder={t('Dashboard.categoryPage.addEdit.categoryNameBox')}
						className="w-full px-3 py-1 border rounded-md shadow-sm border-slate-500/50 dark:border-0 dark:bg-gray-800" />
					{errors.name && (
						<p className="text-xs text-red-500 md:text-sm">
							{t('Dashboard.categoryPage.addEdit.invalidInput')}
						</p>
					)}
				</div>

				<div className="w-full pb-2">
					<textarea 
						{...register("description")}
						rows={3}
						placeholder={t('Dashboard.categoryPage.addEdit.categoryDescriptionBox')}
						className="w-full px-3 py-1 border rounded-md shadow-sm border-slate-500/50 dark:border-0 dark:bg-gray-800" />
					{errors.description && (
						<p className="text-xs text-red-500 md:text-sm">
							{t('Dashboard.categoryPage.addEdit.invalidInput')}
						</p>
					)}
				</div>

				<div className="w-full text-center md:text-right mt-7">
					<button 
						type='submit'
						className="py-2 text-xs bg-blue-600 dark:bg-rose-600 border-0 rounded-md px-7 md:px-12 md:text-base text-zinc-50 hover:bg-blue-700 dark:hover:bg-rose-700 hover:translate-y-[-3px] font-PromptMedium">
						{t('Dashboard.categoryPage.addEdit.submitButton')}
					</button>
				</div>
				
			</div>
		</form>
	)
}
