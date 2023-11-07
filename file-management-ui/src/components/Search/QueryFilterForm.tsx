import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"

// import TextField from '@/components/Shared/Inputs/TextField'
import DatePicker from 'react-datepicker'
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import * as dayjs from "dayjs"


interface ISearchForm {
	docId: string,
	docName: string,
}

interface IDateFilter {
	fromDate?: Date,
	toDate?: Date
}

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 *******************************************************************************************/
export default function QueryFilterForm() {
	const [dateFilter, setDateFilter] = useState<IDateFilter>({fromDate: new Date(), toDate: new Date()})
	const navigate = useNavigate();
	const { t } = useTranslation()

	const { register, handleSubmit, formState: { errors} } = useForm<ISearchForm>()

	const handleOnSubmit: SubmitHandler<ISearchForm> = ({ docId, docName }) => {
		const { fromDate, toDate } = dateFilter
		
		const fDate = !fromDate ? '' : dayjs(fromDate).format("YYYY-MM-DD");
		const tDate = !toDate ? '' :  dayjs(toDate).format("YYYY-MM-DD");

		navigate(`/search?documentId=${docId}&documentName=${docName}&fromDate=${fDate}&toDate=${tDate}`)
	}

	const handleFromDateChange = (date: Date) => {
		setDateFilter({ ...dateFilter, fromDate: date })
	}
	
	const handleToDateChange = (date: Date) => {
		setDateFilter({ ...dateFilter, toDate: date })
	}

	return (
		<div className="w-full text-xs md:text-sm">
			<h1 className="w-full mb-5 text-lg text-center text-gray-800 dark:text-zinc-50 font-PromptSemiBold">
				{t("Search.filter-search.title")}
			</h1>
			
			<form onSubmit={handleSubmit(handleOnSubmit)}>
				<div className="w-full">
					<input 
						{...register('docId')}
						type='text' 
						placeholder={t("Search.filter-search.document-id")}
						className={`w-full px-2 py-[0.2rem] border-2 rounded-sm focus:ring-2 focus:ring-offset-0  ${errors.docId ? "ring-red-500 focus:ring-rose-500" : "focus:ring-blue-700"}  focus:outline-none bg-white dark:bg-gray-800 dark:border-0 dark:focus:ring-rose-500 dark:text-zinc-50`}
					/>	
					<p className="text-xs text-red-500 font-PromptRegular md:text-sm">{errors.docId && errors.docId.message}</p>
				</div>

				<div className="w-full my-5">
					<input 
						{...register('docName')}
						type='text' 
						placeholder={t("Search.filter-search.document-name")}
						className={`w-full px-2 py-[0.2rem] border-2 rounded-sm focus:ring-2 focus:ring-offset-0  ${errors.docName ? "ring-red-500 focus:ring-rose-500" : "focus:ring-blue-700"}  focus:outline-none bg-white dark:bg-gray-800 dark:border-0 dark:focus:ring-rose-500 dark:text-zinc-50`}
					/>	
					<p className="text-xs text-red-500 font-PromptRegular md:text-sm">{errors.docName && errors.docName.message}</p>
				</div>

				<div className="flex items-center gap-2 text-gray-800 dark:text-zinc-50">
					<p className="w-10">{t("Search.filter-search.label-from-date")}</p>
					<div className="w-full my-3 customDatePickerWidth">
						<DatePicker 
							showIcon
							selected={dateFilter?.fromDate} 
							onChange={handleFromDateChange}
							dateFormat='yyyy-MM-dd'
							// dateFormat="MMMM d, yyyy h:mmaa"
							className='w-full bg-white border rounded-sm dark:bg-gray-800 dark:border-none'
						/>
					</div>
				</div>
				
				<div className="flex items-center gap-2 text-gray-800 dark:text-zinc-50">
					<p className="w-10">{t("Search.filter-search.label-to-date")}</p>
					<div className="w-full customDatePickerWidth">
						<DatePicker 
							showIcon
							selected={dateFilter?.toDate} 
							onChange={handleToDateChange}
							dateFormat='yyyy-MM-dd'
							className='w-full bg-white border rounded-sm dark:bg-gray-800 dark:border-none'
						/>
					</div>
				</div>

				<div className="flex items-center justify-center mt-9">
					<button 
						className="w-full px-5 py-2 text-xs bg-teal-600 rounded-sm hover:bg-teal-700 text-zinc-50 dark:bg-rose-600 dark:hover:bg-rose-700"
						type="submit">
						{t("Search.filter-search.search-button")}
					</button>
				</div>
			</form>
		</div>
	)
}
