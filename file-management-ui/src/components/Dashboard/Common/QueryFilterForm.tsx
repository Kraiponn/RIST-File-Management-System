import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"

import DatePicker from 'react-datepicker'
import { useTranslation } from "react-i18next"
import { useNavigate, useSearchParams } from "react-router-dom"
import * as dayjs from "dayjs"
import { IoFilter } from "react-icons/io5";
import { useAppTheme, useDocumentAPI } from "@/features/store"


interface ISearchForm {
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
	const [ searchParams ] = useSearchParams()
	const { t } = useTranslation()
	const { setPageNo } = useDocumentAPI()
	const { isActiveQueryFilter, setQueryFilter } = useAppTheme()

	const { register, handleSubmit, formState: { errors} } = useForm<ISearchForm>()

	const handleOnSubmit: SubmitHandler<ISearchForm> = ({ docName }) => {
		const { fromDate, toDate } = dateFilter
		
		const fDate = !fromDate ? '' : dayjs(fromDate).format("YYYY-MM-DD");
		const tDate = !toDate ? '' :  dayjs(toDate).format("YYYY-MM-DD");
		const docId = searchParams.get('query')

		setPageNo(1)
		navigate(`/dashboard/documents?query=${docId ? docId : ""}&documentName=${docName}&fromDate=${fDate}&toDate=${tDate}`)
	}

	const handleFromDateChange = (date: Date) => {
		setDateFilter({ ...dateFilter, fromDate: date })
	}
	
	const handleToDateChange = (date: Date) => {
		setDateFilter({ ...dateFilter, toDate: date })
	}

	return ( 
		<>
			<div className={`justify-center items-center ${isActiveQueryFilter ? "animate-from-top flex" : "hidden"}`}>
				<div className="w-full md:w-[50%] text-xs md:text-sm py-5 shadow-lg rounded-md px-5 mb-9 dark:bg-gray-900">
					<form onSubmit={handleSubmit(handleOnSubmit)}>
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
								className="px-7 py-2 text-xs bg-teal-600 rounded-sm hover:bg-teal-700 text-zinc-50 dark:bg-rose-600 dark:hover:bg-rose-700"
								type="submit">
								{t("Search.filter-search.search-button")}
							</button>
						</div>
					</form>
				</div>
			</div>

			<button 
				onClick={() => setQueryFilter(isActiveQueryFilter ? 'close' : 'open')}
				className="flex items-center gap-2 p-1 mb-1 text-xl border-2 md:text-lg hover:bg-zinc-200 dark:hover:bg-gray-900/50 dark:hover:ring-2 dark:hover:ring-rose-500 dark:hover:ring-offset-2">
				<IoFilter />	
				<p className="font-PromptRegular">
					{'Filter'}
				</p>	
			</button>
		</>
	)
}
