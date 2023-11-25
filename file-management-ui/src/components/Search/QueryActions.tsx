import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import { useAppTheme, useDocumentAPI } from '@/features/store';
import { BsFilterLeft } from 'react-icons/bs'

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 *******************************************************************************************/
export default function QueryActions() {
	const [searchParams] = useSearchParams()
	const { isDarkMode } = useAppTheme()
	const { t } = useTranslation();
	const { isActiveQueryFilter, setQueryFilter } = useAppTheme()
	const { documents } = useDocumentAPI()

	const query = searchParams.get('query');

	const handleToggleFilterForm = () => {
		setQueryFilter(isActiveQueryFilter === true ? 'close' : 'open')
	}

	return (
		<div className="flex flex-col items-start justify-start gap-4 mb-3 md:flex-row md:justify-between">		
			<p className="w-full py-2 text-xs text-left md:text-lg lg:text-xl font-PromptBold dark:text-zinc-50">
				{documents && documents.total > 0 && 
					t('Dashboard.documentPage.search.success', { 
						total: documents?.total, keyword: query || query !== '*' ? query : 'all documents' 
					})
				}
			</p>
			
			<div className="order-2 md:order-1">
				<button onClick={handleToggleFilterForm} className="text-yellow bg-yellow">
					<BsFilterLeft style={{ fontSize: '37px', color: `${isDarkMode ? "#ffffff" : "#111827"}` }} />
				</button>
			</div>
		</div>
	)
}
