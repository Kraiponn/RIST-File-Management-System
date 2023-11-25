import { ReactNode,  useEffect } from "react"
import { useAppTheme } from "@/features/store/useAppTheme";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@mui/material";
import { useMuiTheme } from "@/features/mui-theme";

import DrawerMobileMenu from "@/components/Dashboard/Common/DrawerMobileMenu";
import DrawerDesktopMenu from "@/components/Dashboard/Common/DrawerDesktopMenu";
import Navbar from "@/components/Dashboard/Common/Navbar";

interface IProps {
	title: string,
	children: ReactNode
}

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function Layout({ title, children } : IProps) {
	const { i18n } = useTranslation()
	const { 
		openDashboardMenu,
		isDarkMode, 
		locale 
	} = useAppTheme()
	const muiTheme = useMuiTheme(isDarkMode ? 'dark' : 'light')

	useEffect(() => {
		document.title = title;
	}, [title]);

	useEffect(() => {
		if(isDarkMode)
			document.documentElement.classList.add('dark')
		else 
			document.documentElement.classList.remove('dark')

		if(locale === 'en')
			i18n.changeLanguage('en')
		else
			i18n.changeLanguage('th')
	}, [isDarkMode, locale, i18n]);

	return (
		<ThemeProvider theme={muiTheme}>
			<>
				{/************   Drawer Menu - Desktop   ************/}
				<DrawerMobileMenu />
				
				<div className="relative flex min-h-screen bg-zinc-50 dark:bg-gray-800 dark:text-zinc-50 min-w-[350px] max-w-full">		
					{/************  	Drawer Menu - Desktop   	************/}	
					<DrawerDesktopMenu />
					
					{/************  			  Main Content     			************/}	
					<main className={`${openDashboardMenu ? "w-full md:w-[85%] md:animate-tb-content" : "w-full animate-reverse-tb-content"}`}>
						<Navbar />
						{children}
					</main>			
				</div>
			</>
		</ThemeProvider>
	)
}
