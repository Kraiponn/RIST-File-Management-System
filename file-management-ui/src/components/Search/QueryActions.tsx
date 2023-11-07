import { useAppTheme } from '@/features/store';
import { ChangeEvent, KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next'
import { BsSearch, BsFilterLeft } from 'react-icons/bs'

type Props = {
	searchValue: string,
	onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void,
	onSubmitSearch: (event: KeyboardEvent<HTMLInputElement>) => void,
	onToggleFilterForm: () => void,
}


/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 *******************************************************************************************/
export default function QueryActions({ searchValue, onSearchChange, onSubmitSearch, onToggleFilterForm }: Props) {
	const { t } = useTranslation();
	const { isDarkMode } = useAppTheme()

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) =>  {
		onSearchChange(event)
	}

	const handleSubmitSearch = (event: KeyboardEvent<HTMLInputElement>) =>  {
		onSubmitSearch(event)
	}

	return (
		<div className="flex flex-col items-start justify-start gap-4 mb-5 md:flex-row md:justify-between">		
			<div className="relative order-1 w-full md:order-2 md:w-auto">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
					<BsSearch style={{ fontSize: '20px', color: isDarkMode ? 'gray' : 'black' }} />
				</div>
				<input 
					type="text" 
					id="query-navbar" 
					value={searchValue}
					onChange={handleSearchChange}
					onKeyDown={handleSubmitSearch}
					className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
					placeholder={t("Search.input-search")} />
			</div>
			
			<div className="order-2 md:order-1">
				<button onClick={() => onToggleFilterForm()} className="text-yellow bg-yellow">
					<BsFilterLeft style={{ fontSize: '37px', color: `${isDarkMode ? "#ffffff" : "#111827"}` }} />
				</button>
			</div>
		</div>
	)
}
