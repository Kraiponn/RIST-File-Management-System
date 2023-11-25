import { ChangeEvent, KeyboardEvent, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useDocumentAPI, useAppTheme } from "@/features/store"

import { BsFillArrowLeftCircleFill as ExitIcon } from 'react-icons/bs'
import { GiHamburgerMenu as HamburgaerIcon } from 'react-icons/gi'
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs'
import { BiSearchAlt2 as SearchIcon } from 'react-icons/bi'
import { AiFillHome as HomeIcon } from 'react-icons/ai'
import thFlag from '@/assets/images/th-flag.png'
import enFlag from '@/assets/images/en-flag.png'


/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function Navbar() {
	const [search, setSearch] = useState<string>('')
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const { t } = useTranslation()
	const { setPageNo } = useDocumentAPI()
	const { 
		openDashboardMenu,
		setDashboardMenu,
		changedLocale,
		changedTheme,
		isDarkMode, 
		locale 
	} = useAppTheme()

	const handleChangeDashboardMenu = () => {
		setDashboardMenu(openDashboardMenu ? "close" : "open")	
	}

	function handleSearchChange(event: ChangeEvent<HTMLInputElement>): void {
		setSearch(event.target.value)
	}

	function handleSearchKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
		if(event.code === 'Enter') {
			setPageNo(1)
			navigate(`/dashboard/documents?query=${search}`)
		}
	}

	return (
		<nav className={`flex ${openDashboardMenu ? "hidden md:flex" : ""} justify-end md:justify-between w-full items-center  dark:bg-gray-800 py-2 px-5 shadow-md`}>
			<div className="button-menu--group">
				{openDashboardMenu 
					? (<button 
							onClick={handleChangeDashboardMenu}
							className={`hidden md:block hover:scale-110`}>
							<ExitIcon style={{ fontSize: `1.5rem`, color: `${isDarkMode ? "#f4f4f5" : "#111827"}` }} />
						</button>)
					: (<button 
							onClick={handleChangeDashboardMenu}
							className={`block hover:scale-110`}>
							<HamburgaerIcon style={{ fontSize: `1.5rem`, color: `${isDarkMode ? "#f4f4f5" : "#000000"}` }} />
						</button>)
				}
			</div>

			<div className="items-center justify-center hidden gap-5 pr-5 md:flex">
				{pathname === '/dashboard/documents' && (
					<div className="flex items-center gap-2 px-1 py-1 text-gray-800 border-0 rounded-lg bg-zinc-50 dark:bg-gray-900 dark:text-zinc-50 ring-2 dark:ring-0 ring-gray-300">
						<SearchIcon style={{ fontSize: '22px' }} />
						<input 
							type="text" 
							value={search}
							onChange={handleSearchChange}
							onKeyDown={handleSearchKeyDown}
							placeholder={t('Dashboard.navbar.textSearchPlaceholder')}
							className="block w-full border-0 outline-none dark:bg-transparent" />
					</div>
				)}

				<button 
					onClick={() => changedLocale()}
					className='flex items-center gap-1 font-bold dark:text-zinc-50 hover:scale-110'>
					<img src={locale === 'en' ? enFlag : thFlag} alt='thai flag' className='w-[28px]' />
					{locale.toUpperCase()}
				</button>

				<button 
					onClick={() => changedTheme()}
					className='hover:scale-110'>
					{
						isDarkMode ? (<BsFillMoonStarsFill style={{ color: 'yellow', fontSize: '22px' }}  />)
											: (<BsFillSunFill style={{ color: 'red', fontSize: '28px' }}  />)
					}
				</button>

				<Link to="/" className="dark:text-zinc-50 hover:scale-110">
					<HomeIcon style={{ fontSize: '28px' }} />
				</Link>
			</div>
		</nav>
	)
}
