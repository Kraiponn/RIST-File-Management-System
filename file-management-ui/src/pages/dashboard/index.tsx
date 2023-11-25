import Layout from '@/components/Dashboard/Common/Layout'
import Logo from '@/assets/images/header-img.svg'

import { TypeAnimation } from 'react-type-animation';
import { useTranslation } from 'react-i18next';

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function Dashboard() {
	const { t } = useTranslation();
	
	return (
		<Layout title={t('Dashboard.dashboardPage.title')}>
			<div className="flex flex-col items-center justify-center w-full min-h-screen text-slate-800 dark:text-zinc-50">
				<h1 className="text-lg md:text-3xl lg:text-5xl xl:text-7xl font-PromptBold">
					{t('Dashboard.dashboardPage.topic')}
				</h1>

				<TypeAnimation
					sequence={[
						t('Dashboard.dashboardPage.description'),
						1000,
						'',
						1000
					]}
					wrapper="p"
					speed={50}
					style={{ fontSize: `1.5rem`, display: 'inline-block', fontWeight: 'bold' }}
					repeat={Infinity}
				/>
				
				<img 
					src={Logo} 
					alt="logo" 
					className='w-[100px] md:w-[200px] lg:w-[250px] animate-header block mt-12'
				/>
			</div>
		</Layout>
	)
}
