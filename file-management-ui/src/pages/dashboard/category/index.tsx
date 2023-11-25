import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import DashboardLayout from '@/components/Dashboard/Common/Layout'

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function CategoryDashboard() {
	const { t } = useTranslation()

	return (
		<>
			<DashboardLayout title={t('Dashboard.categoryPage.title')}>
				<Outlet />
			</DashboardLayout>
		</>
	)
}
