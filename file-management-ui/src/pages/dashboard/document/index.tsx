import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next'
import DashboardLayout from '@/components/Dashboard/Common/Layout'

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function DocumentDashboard() {
	const { t } = useTranslation();

	return (
		<DashboardLayout title={t(`Dashboard.documentPage.title`)}>
			<Outlet />
		</DashboardLayout>
	)
}
