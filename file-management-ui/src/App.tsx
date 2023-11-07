import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/home'
import Search from '@/pages/Search.tsx'
import PageNotFound from '@/pages/notFound'

function App() {

	return (
	<>
		<Routes>
			<Route path="*" element={<PageNotFound />} />
			<Route path='/' element={<Home />} />
			<Route path='/search' element={<Search />} />
		</Routes>
	</>
	)
}

export default App
