import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AiFillHome as HomeIcon } from 'react-icons/ai';
import { BsSlashLg as BackSlashIcon } from 'react-icons/bs';

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function BreadCrumbs() {
	const { t } = useTranslation();

	return (
		<div className="flex items-center justify-start">
			<Link 
				to="/dashboard" 
				className="flex items-center justify-center gap-2 dark:text-zinc-50 hover:text-slate-800 text-slate-700">
				<HomeIcon style={{ fontSize: '20px' }} />
				<h3 className="font-PromptRegular">
					{t('Dashboard.documentPage.breadCrumbs.home')}
				</h3>
			</Link>

			<BackSlashIcon style={{ fontSize: '22px' }} />

			<Link 
				to="/dashboard/categories" 
				className="flex items-center justify-center gap-2 dark:text-zinc-50 hover:text-slate-800 text-slate-700">
				<h3 className="font-PromptBold">
					{t('Dashboard.categoryPage.breadCrumbs.categoryList')}
				</h3>
			</Link>
		</div>
	)
}
