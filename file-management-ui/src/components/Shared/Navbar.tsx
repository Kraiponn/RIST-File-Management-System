import { ChangeEvent, KeyboardEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCategoryAPI, useDocumentAPI } from '@/features/store'

import Logo from '@/assets/images/pc-document.svg'
import thFlag from '@/assets/images/th-flag.png'
import enFlag from '@/assets/images/en-flag.png'
import { BsFillMoonStarsFill, BsFillSunFill, BsSearch } from 'react-icons/bs'
import { MdManageAccounts } from 'react-icons/md'
import { GiHamburgerMenu } from 'react-icons/gi'

interface IProps {
	locale: 'en' | 'th',
	isDarkMode: boolean,
	isOpenMobileMenu: boolean,
	handleChangeAppTheme: () => void,
	handleChangeAppLocale: () => void,
	handleMobileMenu: () => void,
}

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function Navbar({ 
	locale, 
	isDarkMode, 
	isOpenMobileMenu,
	handleChangeAppTheme, 
	handleChangeAppLocale, 
	handleMobileMenu
}: IProps) {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const { query, setQuery, setPageNo: setDocumentPageNo } = useDocumentAPI()
	const { setPageNo: setCategoryPageNo } = useCategoryAPI()

	const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value)
	}

	function handleNavigatePage() {
		setDocumentPageNo(1)
		setCategoryPageNo(1)
		navigate('/dashboard/documents')
	}

	function handleSubmitQuery(event: KeyboardEvent<HTMLInputElement>): void {
		if(event.code === 'Enter') {
			setDocumentPageNo(1)
			navigate(`/search?query=${query}`)
		}
	}

	return (
		<>
			<nav className="bg-white border-gray-200 shadow-sm dark:shadow-2xl dark:bg-gray-900">
				<div className='relative flex items-center justify-between p-2'>
					<Link to="/" className='flex justify-start gap-2'>
						<img src={Logo} alt='File Manager Logo' className='w-[35px]' />
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
							{t("Navbar.default.title")}
						</span>
					</Link>

					{/************   Mobile Screen   ************/}
					<button 
						onClick={() => handleMobileMenu()}
						className='flex md:hidden'>
						<GiHamburgerMenu style={{ color: isDarkMode ? 'white' : 'black', fontSize: '32px' }}  />
					</button>
					
					{!isOpenMobileMenu
						? null
						: <div className='shadow-md md:hidden absolute bg-zinc-100 dark:bg-gray-950 top-[100%] left-0 right-0 z-[900]'>
							<ul className='flex flex-col items-start gap-5 py-5 jusify-center'>
								<li className='w-full px-5 hover:cursor-pointer hover:bg-zinc-300 dark:hover:bg-gray-800'>
									<button 
										onClick={() => handleChangeAppLocale()}
										className='flex items-center gap-2 font-bold dark:text-zinc-50'>
										<img src={locale === 'en' ? enFlag : thFlag} alt='thai flag' className='w-[35px]' />
										{t("Navbar.mobile.language")}
									</button>
								</li>

								<li className='w-full px-5 hover:cursor-pointer hover:bg-zinc-300 dark:hover:bg-gray-800'>
									<button 
										onClick={() => handleChangeAppTheme()}
										className='flex items-center gap-2 font-bold dark:text-zinc-50'>
										{
											isDarkMode ? (<BsFillMoonStarsFill style={{ color: 'yellow', fontSize: '28px' }}  />)
																: (<BsFillSunFill style={{ color: 'red', fontSize: '30px' }}  />)
										}
										{t("Navbar.mobile.theme")}
									</button>
								</li>

								<li className='w-full px-5 hover:cursor-pointer hover:bg-zinc-300 dark:hover:bg-gray-800'>
									<button 
										onClick={handleNavigatePage}
										className="hover:scale-110">
										<MdManageAccounts style={{ color: isDarkMode ? 'white' : 'black', fontSize: '28px' }}  />
									</button>
								</li>

								<li className='w-full px-5'>
									<div className="relative">
										<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
											<BsSearch style={{ fontSize: '20px', color: isDarkMode ? 'gray' : 'black' }} />
										</div>
										<input 
											type="text" 
											id="query-mnavbar" 
											value={query}
											onChange={handleQueryChange}
											onKeyDown={handleSubmitQuery}
											className="block w-full p-1 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
											placeholder={t("Navbar.mobile.search-box")} />
									</div>
								</li>
							</ul>
						</div>
					}

					{/************   Desktop Screen   ************/}
					<div className="items-center justify-end hidden gap-2 md:gap-6 md:flex">
						<div className="relative mr-5">
							<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
								<BsSearch style={{ fontSize: '18px', color: isDarkMode ? 'gray' : 'black' }} />
							</div>
							<input 
								type="text" 
								id="query-navbar" 
								value={query}
								onChange={handleQueryChange}
								onKeyDown={handleSubmitQuery}
								className="block w-full p-1 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
								placeholder="Search..." />
						</div>

						<button 
							onClick={() => handleChangeAppLocale()}
							className='flex items-center gap-2 font-bold dark:text-zinc-50 hover:scale-110'>
							<img src={locale === 'en' ? enFlag : thFlag} alt='thai flag' className='w-[25px]' />
							{locale.toUpperCase()}
						</button>

						<button 
							onClick={() => handleChangeAppTheme()}
							className='hover:scale-110'>
							{
								isDarkMode ? (<BsFillMoonStarsFill style={{ color: 'yellow', fontSize: '24px' }}  />)
													: (<BsFillSunFill style={{ color: 'red', fontSize: '24px' }}  />)
							}
						</button>

						<button 
							onClick={handleNavigatePage}
							className="hover:scale-110">
							<MdManageAccounts style={{ color: isDarkMode ? 'white' : 'black', fontSize: '28px' }}  />
						</button>
					</div>

				</div>
			</nav>
		</>
	)
}
