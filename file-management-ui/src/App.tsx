import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/home'
import Search from '@/pages/search'
import PageNotFound from '@/pages/notFound'

import DashboardHomePage from '@/pages/dashboard'

import PrivateRoute from '@/features/secured/privateRoute'
// import DocumentDashboard from '@/pages/dashboard/document'
import DocumentListPage from '@/pages/dashboard/document/document-list'
import AddDocumentPage from '@/pages/dashboard/document/add-document'
import EditDocumentPage from '@/pages/dashboard/document/edit-document'

// import DashboardCategory from '@/pages/dashboard/category'
import CategoryListPage from '@/pages/dashboard/category/category-list'
import AddCategoryPage from '@/pages/dashboard/category/add-category'
import EditCategoryPage from '@/pages/dashboard/category/edit-category'

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function App() {
	return (
		<>
			<Routes>
				<Route path='/search' element={<Search />} />
				<Route path='/dashboard' element={<DashboardHomePage />} />
				<Route path='dashboard/documents' element={<PrivateRoute />}>
					<Route index element={<DocumentListPage />} />
					<Route path='add' element={<AddDocumentPage/>} />
					<Route path='edit' element={<EditDocumentPage/>} />
					<Route path='edit/:documentId' element={<EditDocumentPage/>} />
				</Route>
				<Route path='dashboard/categories' element={<PrivateRoute />}>
					<Route index element={<CategoryListPage />} />
					<Route path='add' element={<AddCategoryPage/>} />
					<Route path='edit' element={<EditCategoryPage/>} />
					<Route path='edit/:categoryId' element={<EditCategoryPage/>} />
				</Route>
				<Route path="*" element={<PageNotFound />} />
				<Route path='/' element={<Home />} />
			</Routes>
		</>
	)
}