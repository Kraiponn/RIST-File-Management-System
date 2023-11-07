import Layout from "@/components/Shared/Layout";
import WarningLogo from '@/assets/images/warning-icon.svg'
import { useTranslation } from "react-i18next";

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function PageNotFound() {
	const { t } = useTranslation()
	
	return (
		<Layout title={t("NotFound.title")}>
			<div className="absolute top-[50%] translate-y-[-50%]  md:top-[30%] md:translate-y-[-30%] flex flex-col items-center justify-center w-full gap-4 md:gap-9 bg-zinc-50 dark:bg-gray-900">
				<img 
					src={WarningLogo}
					alt="warning"
					className="w-[5rem] md:w-[9rem]"
				/>
				<h1 className="text-xl text-gray-800/50 md:text-5xl font-PromptBold dark:text-zinc-50/70">
					{t('NotFound.title')}
				</h1>
			</div>
		</Layout>
	)
}
