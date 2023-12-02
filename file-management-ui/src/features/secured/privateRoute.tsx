import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthAPI } from '../store/useAuthAPI'
import { useTranslation } from 'react-i18next';
import DashboardLayout from '@/components/Dashboard/Common/Layout'

export default function PrivateRoute() {
	const { t } = useTranslation();
	const { pathname } = useLocation()
	const { accessToken } = useAuthAPI()

	return (
		!accessToken 
			?  <DashboardLayout 
				title={t(`Dashboard.${pathname === "/dashboard/documents" ? "documentPage" : "categoryPage"}.title`)}>
					<Outlet />
				</DashboardLayout>
			: <Navigate to='/login' />
	)
}
