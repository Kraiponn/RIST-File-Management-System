import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCategoryAPI } from '@/features/store';
import { FaEdit as EditDoc } from 'react-icons/fa'
import { RiDeleteBin5Line as RemoveDoc } from 'react-icons/ri'


/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 *******************************************************************************************/
export default function CategoryTable() {
	const { t } = useTranslation()
	const navigate = useNavigate();
	const { setModalActive, categories } = useCategoryAPI();

	function handleEditCategory(categoryId: string) {
		navigate(`/dashboard/categories/edit/${categoryId}`)
	}

	function handleDeleteCategory(categoryId: string) {
		setModalActive(true, categoryId ? categoryId : '')
	}

	if(!categories?.results || categories.total === undefined) {
		return null
	}

	return (
		<div className="relative pt-5 overflow-x-auto shadow-md px-7 mb-7 sm:rounded-lg dark:bg-gray-900">
			<table className="w-full mb-5 text-sm text-left text-gray-700 dark:text-gray-400">
				<thead className="text-xs bg-gray-800 text-zinc-50 dark:bg-gray-700 dark:text-gray-400 md:text-sm rounded-2xl">
					<tr className=''>
						<th scope="col" className="px-6 py-3">{t("Table.category.categoryId")}</th>
						<th scope="col" className="px-6 py-3">{t("Table.category.categoryName")}</th>
						<th scope="col" className="px-6 py-3">{t("Table.category.description")}</th>
						<th scope="col" className="px-6 py-3 text-center">#</th>
					</tr>
				</thead>
				
				<tbody>
					{categories.results.map(cat => (
						<tr 
							key={cat.documentCategoryId}
							className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
							<th scope="row" className="px-6 py-4 font-PromptSemiBold decoration-1 whitespace-nowrap dark:text-white">
								{cat.documentCategoryId}
							</th>
							<td className="px-6 py-4">{cat.name}</td>
							<td className="px-6 py-4">{cat.description}</td>
							<td className="px-6 py-4">
								<div className="flex items-center justify-center gap-3">
									<button 
										onClick={() => handleEditCategory(cat.documentCategoryId)}
										className="btn hover:scale-110">
										<EditDoc style={{ color: '#14b8a6', fontSize: '1.5rem' }}  />
									</button>
									<button 
										onClick={() => handleDeleteCategory(cat.documentCategoryId)}
										className="btn hover:scale-110">
										<RemoveDoc style={{ color: '#f43f5e', fontSize: '1.5rem' }}  />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
