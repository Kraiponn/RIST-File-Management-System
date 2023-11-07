import { Link } from "react-router-dom";
import Logo from '@/assets/images/logo.svg'
import { useTranslation } from "react-i18next";

export default function Footer() {	
	const { t } = useTranslation()

	return (
		<footer className="shadow bg-zinc-50 dark:bg-gray-900">
			<div className="w-full max-w-screen-xl p-4 mx-auto md:py-8">
				<div className="sm:flex sm:items-center sm:justify-between">
					<Link to="/" className="flex items-center mb-4 sm:mb-0">
						<img 
							src={Logo}
							className="h-8 mr-3" 
							alt="RIST Logo" />
						<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
							RIST
						</span>
					</Link>

					<ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
						<li>
							<Link to="#" className="mr-4 hover:underline md:mr-6 ">{t("Footer.about")}</Link>
						</li>
						<li>
							<Link to="#" className="mr-4 hover:underline md:mr-6">{t("Footer.privacy-policy")}</Link>
						</li>
						<li>
							<Link to="#" className="mr-4 hover:underline md:mr-6 ">{t("Footer.licensing")}</Link>
						</li>
						<li>
							<Link to="#" className="hover:underline">{t("Footer.contact")}</Link>
						</li>
					</ul>
				</div>
				<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
				<span 
					className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
						© 2023 <Link to="/" className="hover:underline">RIST</Link>. All Rights Reserved.
				</span>
			</div>
		</footer>
	)
}
