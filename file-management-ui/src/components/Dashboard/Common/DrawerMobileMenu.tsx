import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppTheme, useCategoryAPI, useDocumentAPI } from "@/features/store";
import { useTranslation } from "react-i18next";

import { BsFillArrowLeftCircleFill as ExitIcon } from 'react-icons/bs'
import { CgFileDocument as DocumentIcon } from 'react-icons/cg'
import { BiCategory as CategoryIcon } from 'react-icons/bi'
import { AiTwotoneSetting as SettingsIcon, AiFillHome as HomeIcon } from 'react-icons/ai'
import { IoIosArrowDown as DownArrowIcon, IoIosArrowUp as UpArrowIcon } from 'react-icons/io'

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function DrawerMobileMenu() {
	const { 
		openDashboardMenu,
		setDashboardMenu,
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
		<div className={`${openDashboardMenu ? "flex md:hidden animate-sidebar-menu" : "hidden"} flex-col fixed left-[0%] top-[0%] z-[2000] w-[40%] h-full bg-zinc-200 dark:bg-gray-900 dark:text-zinc-50 shadow-xl`}>
			{/************  	   HEADER  	   ************/}	
			<div className="relative w-full h-[150px] bg-red-600 flex items-center justify-center text-zinc-100">
				<h1 className="text-[2rem] sm:text-[3rem] font-PromptBold">
					{`RIST`}
				</h1>
				<button 
					onClick={() => setDashboardMenu('close')}
					className="absolute right-0 hover:scale-110">
					<ExitIcon style={{ fontSize: '2rem' }} />
				</button>
			</div>
			
			<div className="overflow-y-auto menu-container">
				{/************  	DASHBOARD(HOME) MENU  	************/}	
				<div className={`w-full px-1 py-2 mt-3`}>
					<div className={`flex items-center justify-between ${pathname === "/dashboard" ? "bg-gray-900/30 dark:bg-gray-800 p-2 mx-1 rounded-md" : ""}`}>
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
						<li className={`${pathname === "/dashboard/documents" ? "bg-gray-900/30 p-2 rounded-md" : ""} hover:text-yellow-300`}>
							{/* <Link to="/dashboard/documents" className="w-full">
								{t('Dashboard.drawerMenu.documentCategory.all')}
							</Link> */}
							<button 
								onClick={handleSetDocumentPageNo}
								className="w-full text-left">
								{t('Dashboard.drawerMenu.documentCategory.all')}	
							</button>
						</li>
						<li className={`${pathname === "/dashboard/documents/add" ? "bg-gray-900/30 p-2 rounded-md" : ""} my-2 hover:text-yellow-300`}>
							{/* <Link to="/dashboard/documents/add" className="">
								{t('Dashboard.drawerMenu.documentCategory.add')}
							</Link> */}
							<button 
								onClick={() => navigate('/dashboard/documents/add')}
								className="w-full text-left">
								{t('Dashboard.drawerMenu.documentCategory.add')}
							</button>
						</li>
						{/* <li className={`${pathname === "/dashboard/documents/edit" ? "bg-gray-900/30 p-2 rounded-md" : ""} hover:text-yellow-300`}>
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
						<li className={`${pathname === "/dashboard/categories" ? "bg-gray-900/30 p-2 rounded-md" : ""} hover:text-yellow-300`}>
							{/* <Link to="/dashboard/categories" className="">
								{t('Dashboard.drawerMenu.documentCategory.all')}
							</Link> */}
							<button 
								onClick={handleSetCategoryPageNo}
								className="w-full text-left">
								{t('Dashboard.drawerMenu.documentCategory.all')}
							</button>
						</li>
						<li className={`${pathname === "/dashboard/categories/add" ? "bg-gray-900/30 p-2 rounded-md" : ""} my-2 hover:text-yellow-300`}>
							{/* <Link to="/dashboard/categories/add" className="">
								{t('Dashboard.drawerMenu.documentCategory.add')}
							</Link> */}
							<button 
								onClick={() => navigate('/dashboard/categories/add')}
								className="w-full text-left">
								{t('Dashboard.drawerMenu.documentCategory.add')}
							</button>
						</li>
						{/* <li className={`${pathname === "/dashboard/categories/edit" ? "bg-gray-900/30 p-2 rounded-md" : ""} hover:text-yellow-300`}>
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
						<li className={`${pathname === "/dashboard/settings/languages" ? "bg-gray-900/30 p-1" : ""} hover:text-yellow-300`}>
							<Link to="/dashboard/settings" className="">
								{t('Dashboard.drawerMenu.setting.language')}
							</Link>
						</li>
						<li className={`${pathname === "/dashboard/settings/theme" ? "bg-gray-900/30 p-1" : ""} my-2 hover:text-yellow-300`}>
							<Link to="/dashboard/settings/add" className="">
								{t('Dashboard.drawerMenu.setting.theme')}
							</Link>
						</li>
						<li className={`${pathname === "/dashboard/settings/notifications" ? "bg-gray-900/30 p-1" : ""} hover:text-yellow-300`}>
							<Link to="/dashboard/settings/edit" className="">
								{t('Dashboard.drawerMenu.setting.notify')}
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}
