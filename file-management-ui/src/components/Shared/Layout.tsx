import { ReactNode, useEffect } from "react"
import { useAppTheme } from "@/features/store/useAppTheme";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "@mui/material";
import { useMuiTheme } from "@/features/mui-theme";
import Navbar from "@/components/Shared/Navbar";
import Footer from "@/components/Shared/Footer";

interface IProps {
	title: string,
	children: ReactNode
}

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function Layout({ title, children } : IProps) {
	const { changedTheme, changedLocale, toggleMobileMenu, isDarkMode, locale, openMobileMenu } = useAppTheme()
	const muiTheme = useMuiTheme(isDarkMode ? 'dark' : 'light')
	const { i18n } = useTranslation()

	const changedAppTheme = () => {
		changedTheme()
	}

	const changedAppLocale = () => {
		changedLocale()
	}

	const handleMobileMenu = () => {
		toggleMobileMenu()
	}

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
				<div className="relative w-full min-h-screen bg-zinc-50 dark:bg-gray-900">
					<Navbar 
						locale={locale}
						isDarkMode={isDarkMode}
						isOpenMobileMenu={openMobileMenu}
						handleChangeAppTheme={changedAppTheme}
						handleChangeAppLocale={changedAppLocale}
						handleMobileMenu={handleMobileMenu}
					/>
					<main className="mx-auto w-[95%]">
						{children}
					</main>				
				</div>
				<Footer />
			</>
		</ThemeProvider>
	)
}
