import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import "react-datepicker/dist/react-datepicker.css";
import 'dayjs/locale/en'
import './index.css'
import "./i18n.ts"
import Loading from '@/components/Shared/Loaders/Loading.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
	<BrowserRouter>
		<Suspense fallback={
			<Loading 
				isLoading={true}
				color="#fcd34d"
				size={80}
				speed={0.789}
				loaderType='Hash'
			/>
		}>
			<App />
		</Suspense>
	</BrowserRouter>
  </React.StrictMode>,
)
