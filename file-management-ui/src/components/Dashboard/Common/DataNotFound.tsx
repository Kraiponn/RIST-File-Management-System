import { useSearchParams, useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { IoCaretBackOutline as BackIcon } from "react-icons/io5";

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function DataNotFound() {
	const { t } = useTranslation()
	const [ searchParams ] = useSearchParams()
	const { pathname } = useLocation()
	const navigate = useNavigate()

	const query = searchParams.get('query')

	function handleNavigateToPage(): void {
		if(pathname === '/dashboard/documents') {
			// navigate(-1);  // Back to a previous page
			navigate('/dashboard/documents/add')
		} else {
			navigate('/dashboard/categories/add')
		}
	}

	return (
		<div className="flex flex-col items-start justify-center px-5 mt-12 text-gray-800 dark:text-zinc-50 w-[90%]">
			<h1 className="text-sm font-PromptBold md:text-2xl xl:text-3xl">
				{t('Dashboard.search.notfound.title', { keyword:  query ? query : ''})}
			</h1>
			
			<p className="my-5 text-xs font-PromptSemiBold md:text-xl xl:text-2xl">
				{t('Dashboard.search.notfound.subTitle')}
			</p>

			<u className="text-xs no-underline md:text-sm xl:text-lg">
				<li>
					{t('Dashboard.search.notfound.description1')}
				</li>
				<li>
					{t('Dashboard.search.notfound.description2')}
				</li>
				<li>
					{t('Dashboard.search.notfound.description3')}
				</li>
			</u>

			<div className="w-full mt-12">
				<button 
					onClick={handleNavigateToPage}
					className="flex justify-start items-center font-PromptSemiBold text-[32px] hover:scale-110">
					<BackIcon />
					<p className=" text-[16px] md:text-[24px]">{t('Dashboard.search.notfound.backButton')}</p>
				</button>
			</div>
		</div>
	)
}
