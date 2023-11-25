import { ChangeEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom';
import { useForm, SubmitHandler  } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useAppTheme, useCategoryAPI, useDocumentAPI } from '@/features/store';
import { IDocumentForm } from '@/interfaces';
import * as yup from "yup"

interface IProps {
	processType: 'add' | 'edit'
}

const schema = yup
	.object({
		name: yup.string().required(),
		description: yup.string().required(),
		documentCategoryId: yup.string().required(),
	})
	.required()

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function DocumentForm({ processType }: IProps) {
	const [ selectFile, setSelectFile ] = useState<File>();
	const { t } = useTranslation()
	const { documentId } = useParams()
	const { locale } = useAppTheme()
	const { categories } = useCategoryAPI()
	const { document, setAlert, addDocument, editDocument } = useDocumentAPI()
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IDocumentForm>({
		resolver: yupResolver(schema),
	})

	const handleUploadFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { files } = event.target
		if(!files) return
		
		setSelectFile(files[0])
	}
	
	const onSubmit: SubmitHandler<IDocumentForm> = ({ name, description, documentCategoryId }) => {
		const formData = new FormData()
		
		if(documentCategoryId === '0') {
			setAlert(locale === 'en' ? 'Please choose a category' : 'โปรดเลือกหมวดหมู่เอกสารก่อนครับ')
			return
		} else if(!selectFile && processType === 'add') {
			setAlert(locale === 'en' ? 'Please pick your file to upload' : 'โปรดเลือกไฟล์ที่คุณจะอัปโหลดด้วยครับ')
			return
		} else if(selectFile) {
			formData.append('File', selectFile)
		}
		
		formData.append('Name', name);
		formData.append('Description', description)
		formData.append('DocumentCategoryId', documentCategoryId)
		
		if(processType === 'add') {
			addDocument(locale, formData)
		}
		else {
			if(!documentId) {
				setAlert(locale === 'en' ? 'Invalid document Id. Please try again.' : 'ไม่พบรหัสเอกสารหรือเอกสารไม่ถูกต้อง หรือลองอีกครั้ง')
				return
			}
			
			editDocument(locale, formData, documentId)
		}
	}

	useEffect(() => {
		if(processType === 'edit') {
			setValue("name", document ? document.name : '')
			setValue('description', document ? document.description : '')
			setValue('documentCategoryId', document ? document.documentCategoryId : "")
		} 
	}, [document, processType, setValue])

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col items-center justify-start gap-3 bg-white dark:bg-gray-900 w-full py-12 rounded-md shadow-xl px-7 md:w-[50%] mx-auto">						
				<div className="w-full pb-2">
					{categories && categories.total > 0 && (
						<select 
							{...register("documentCategoryId")}
							className="w-full px-3 py-1 border rounded-md shadow-sm border-slate-500/50 dark:border-0 dark:bg-gray-800">
							<option value="0">{t('Dashboard.documentPage.addEdit.categorySelectBox')}</option>
							{categories.results.map(cat => (
								<option 
									key={cat.documentCategoryId} 
									value={cat.documentCategoryId}>
									{cat.name}
								</option>)
							)}
						</select>
					)}
					{errors.documentCategoryId && (
						<p className="text-xs text-red-500 md:text-sm">
							{t('Dashboard.categoryPage.addEdit.invalidInput')}
						</p>
					)}
				</div>
				
				<div className="w-full pb-2">
					<input 
						{...register("name")}
						type="text" 
						placeholder={t('Dashboard.documentPage.addEdit.documentNameBox')}
						className="w-full px-3 py-1 border rounded-md shadow-sm border-slate-500/50 dark:border-0 dark:bg-gray-800" />
					{errors.name && (
						<p className="text-xs text-red-500 md:text-sm">
							{t('Dashboard.documentPage.addEdit.invalidInput')}
						</p>
					)}
				</div>

				<div className="w-full pb-2">
					<textarea 
						{...register("description")}
						rows={3}
						placeholder={t('Dashboard.documentPage.addEdit.documentDescriptionBox')}
						className="w-full px-3 py-1 border rounded-md shadow-sm border-slate-500/50 dark:border-0 dark:bg-gray-800" />
					{errors.description && (
						<p className="text-xs text-red-500 md:text-sm">
							{t('Dashboard.documentPage.addEdit.invalidInput')}
						</p>
					)}
				</div>

				<div className="w-full pb-2">
					<input 
						type="file" 
						onChange={handleUploadFileChange}
						placeholder={`Pick the file for upload`}
						className="w-full px-3 py-1 text-xs border rounded-md shadow-sm border-slate-500/50 dark:border-0 dark:bg-gray-800 md:text-base" />
				</div>

				<div className="w-full text-center md:text-right mt-7">
					<button 
						type='submit'
						className="py-2 text-xs bg-blue-600 dark:bg-rose-600 border-0 rounded-md px-7 md:px-12 md:text-base text-zinc-50 hover:bg-blue-700 dark:hover:bg-rose-700 hover:translate-y-[-3px] font-PromptMedium">
						{t('Dashboard.documentPage.addEdit.submitButton')}
					</button>
				</div>
				
			</div>
		</form>
	)
}
