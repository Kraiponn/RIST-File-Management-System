import { ChangeEvent, KeyboardEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCategoryAPI } from '@/features/store'

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function SearchBox() {
	const { t } = useTranslation()
	const [query, setQuery] = useState<string>('')
	const navigate = useNavigate()
	const { setPageNo }  = useCategoryAPI()

	function handleQueryChange(event: ChangeEvent<HTMLInputElement>): void {
		setQuery(event.target.value)
	}

	function handleQueryKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
		if(event.code === 'Enter') {
			setPageNo(1)
			navigate(`/dashboard/categories?query=${query}`)
		}
	}

	return (
		<div className="w-full mb-3 text-right">
			<input 
				type="text" 
				placeholder={t('Dashboard.categoryPage.searchBox')}
				value={query}
				onChange={handleQueryChange}
				onKeyDown={handleQueryKeyDown}
				className="p-1 px-2 border-2 rounded-md font-Prompt shdow-2xl dark:bg-gray-900 dark:border-none dark:outline-none dark:focus:ring-2 dark:focus:ring-yellow-400" />
		</div>
	)
}
