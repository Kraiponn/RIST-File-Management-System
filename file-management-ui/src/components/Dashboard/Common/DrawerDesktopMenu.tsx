import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppTheme, useCategoryAPI, useDocumentAPI } from "@/features/store";
import { useTranslation } from "react-i18next";
import { CgFileDocument as DocumentIcon } from 'react-icons/cg'
import { BiCategory as CategoryIcon } from 'react-icons/bi'
import { AiTwotoneSetting as SettingsIcon, AiFillHome as HomeIcon } from 'react-icons/ai'
import { IoIosArrowDown as DownArrowIcon, IoIosArrowUp as UpArrowIcon } from 'react-icons/io'


/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function Layout() {
	const { 
		openDashboardMenu,
		setToggleDashboardDrawerMenu,
		isActiveDocumentMenu,
		isActiveCategoryMenu,
		isActiveSettingsMenu
	} = useAppTheme()
	const { setPageNo: setCategoryPageNo } = useCategoryAPI()
	const { setPageNo: setDocumentPageNo } = useDocumentAPI()
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const { t } = useTranslation()

	function handleSetDocumentPageNo() {
		navigate('/dashboard/documents')
		setDocumentPageNo(1)
	}

	function handleSetCategoryPageNo() {
		navigate('/dashboard/categories')
		setCategoryPageNo(1)
	}

	return (
		<aside 
			className={`${openDashboardMenu ? "hidden md:flex animate-sidebar-menu" : "hidden animate-reverse-sidebar-menu"} w-[20%] lg:w-[15%] text-zinc-50 justify-start items-start flex-col shadow-lg bg-gray-900 min-h-screen h-full text-lg`}>
			<div className="flex flex-col items-center w-full gap-3 px-3 bg-red-600 py-11 text-zinc-100 header">
				<h1 className="text-[2rem] lg:text-[2.5rem] xl:text-[3rem] font-PromptBold">{`ROHM`}</h1>
				<p className="text-xs font-PromptSemiBold">{`SEMICONDUCTOR`}</p>
			</div>

			<div className="w-full overflow-y-auto menu-container">
				{/************  	Dashboard/Home Menu  	************/}	
				<div className={`w-full px-3 py-2 mt-3`}>
					<div className={`flex items-center justify-between  ${pathname === "/dashboard" ? "bg-gray-800 p-2 rounded-md" : ""}`}>
						<Link to="/dashboard" className="flex items-center gap-1 hover:scale-110 hover:text-yellow-300">
							<HomeIcon />
							<p>{t('Dashboard.drawerMenu.dashboard')}</p>	
						</Link>
					</div>
				</div>
				
				{/************  	DOCUMENT MENU  	************/}	
				<div className="w-full px-3 py-2">
					<div className="flex items-center justify-between">
						<h3 className="flex items-center gap-1">
							<DocumentIcon />
							<p>{t('Dashboard.drawerMenu.documentCategory.document')}</p>	
						</h3>
						<button
							onClick={() => setToggleDashboardDrawerMenu('documents')} 
							className="text-[24px]">
							{isActiveDocumentMenu ? (<UpArrowIcon />) : (<DownArrowIcon />)}
						</button>
					</div>
					<ul className={`text-sm pl-7 pt-2 ${isActiveDocumentMenu ? "block" : "hidden"}`}>
						<li className={`${pathname === "/dashboard/documents" ? "bg-gray-800 p-2 rounded-md" : ""} hover:text-yellow-300`}>
							<button 
								onClick={handleSetDocumentPageNo}
								className="w-full text-left">
								{t('Dashboard.drawerMenu.documentCategory.all')}	
							</button>
						</li>
						<li className={`${pathname === "/dashboard/documents/add" ? "bg-gray-800 p-2 rounded-md" : ""} my-2 hover:text-yellow-300`}>
							{/* <Link to="/dashboard/documents/add" className="">
								{t('Dashboard.drawerMenu.documentCategory.add')}
							</Link> */}
							<button 
								onClick={() => navigate('/dashboard/documents/add')}
								className="w-full text-left">
								{t('Dashboard.drawerMenu.documentCategory.add')}
							</button>
						</li>
						{/* <li className={`${pathname === "/dashboard/documents/edit" ? "bg-gray-800 p-2 rounded-md" : ""} hover:text-yellow-300`}>
							<Link to="/dashboard/documents/edit" className="">
								{t('Dashboard.drawerMenu.documentCategory.edit')}
							</Link>
						</li> */}
					</ul>
				</div>

				{/************  	CATEGORY MENU  	************/}	
				<div className="w-full px-3 py-2">
					<div className="flex items-center justify-between">
						<h3 className="flex items-center gap-1">
							<CategoryIcon />
							<p>{t('Dashboard.drawerMenu.documentCategory.category')}</p>	
						</h3>
						<button
							onClick={() => setToggleDashboardDrawerMenu('categories')} 
							className="text-[24px]">
							{isActiveCategoryMenu ? (<UpArrowIcon />) : (<DownArrowIcon />)}
						</button>
					</div>
					<ul className={`text-sm pl-7 pt-2 ${isActiveCategoryMenu ? "block" : "hidden"}`}>
						<li className={`${pathname === "/dashboard/categories" ? "bg-gray-800 p-2 rounded-md" : ""} hover:text-yellow-300`}>
							<button 
								onClick={handleSetCategoryPageNo}
								className="w-full text-left">
								{t('Dashboard.drawerMenu.documentCategory.all')}
							</button>
						</li>
						<li className={`${pathname === "/dashboard/categories/add" ? "bg-gray-800 p-2 rounded-md" : ""} my-2 hover:text-yellow-300`}>
							{/* <Link to="/dashboard/categories/add" className="">
								{t('Dashboard.drawerMenu.documentCategory.add')}
							</Link> */}
							<button 
								onClick={() => navigate('/dashboard/categories/add')}
								className="w-full text-left">
								{t('Dashboard.drawerMenu.documentCategory.add')}
							</button>
						</li>
						{/* <li className={`${pathname === "/dashboard/categories/edit" ? "bg-gray-800 p-2 rounded-md" : ""} hover:text-yellow-300`}>
							<Link to="/dashboard/categories/edit" className="">
								{t('Dashboard.drawerMenu.documentCategory.edit')}
							</Link>
						</li> */}
					</ul>
				</div>

				<div className="w-full h-[0.01rem] bg-white/30 my-5"></div>
				
				{/************  	SETTINGS MENU  	************/}	
				<div className="w-full px-3 pb-5">
					<div className="flex items-center justify-between">
						<h3 className="flex items-center gap-1">
							<SettingsIcon />
							<p>{t('Dashboard.drawerMenu.setting.title')}</p>	
						</h3>
						<button
							onClick={() => setToggleDashboardDrawerMenu('settings')} 
							className="text-[24px]">
							{isActiveSettingsMenu ? (<UpArrowIcon />) : (<DownArrowIcon />)}
						</button>
					</div>
					
					<ul className={`text-sm pl-7 pt-2 ${isActiveSettingsMenu ? "block" : "hidden"}`}>
						<li className={`${pathname === "/dashboard/settings/languages" ? "bg-gray-800 p-1" : ""} hover:text-yellow-300`}>
							<Link to="/dashboard/settings" className="">
								{t('Dashboard.drawerMenu.setting.language')}
							</Link>
						</li>
						<li className={`${pathname === "/dashboard/settings/theme" ? "bg-gray-800 p-1" : ""} my-2 hover:text-yellow-300`}>
							<Link to="/dashboard/settings/add" className="">
								{t('Dashboard.drawerMenu.setting.theme')}
							</Link>
						</li>
						<li className={`${pathname === "/dashboard/settings/notifications" ? "bg-gray-800 p-1" : ""} hover:text-yellow-300`}>
							<Link to="/dashboard/settings/edit" className="">
								{t('Dashboard.drawerMenu.setting.notify')}
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</aside>
	)
}
