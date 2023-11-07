import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { FaEdit as EditDoc } from 'react-icons/fa'
import { RiDeleteBin5Line as RemoveDoc } from 'react-icons/ri'
import { IDocumentDataResponse } from '@/interfaces';

type PageProps = {
	documents: IDocumentDataResponse
}

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 *******************************************************************************************/
export default function Table({ documents }: PageProps) {
	const { t } = useTranslation()

	return (
		<div className="relative pt-5 overflow-x-auto shadow-md px-7 mb-7 sm:rounded-lg">
			<table className="w-full mb-5 text-sm text-left text-gray-700 dark:text-gray-400">
				<thead className="text-xs text-gray-700 bg-gray-300/50 dark:bg-gray-700 dark:text-gray-400 md:text-sm rounded-2xl">
					<tr className=''>
						<th scope="col" className="px-6 py-3">{t("Home.table.doc-id")}</th>
						<th scope="col" className="px-6 py-3">{t("Home.table.doc-name")}</th>
						<th scope="col" className="px-6 py-3">{t("Home.table.file-size")}</th>
						<th scope="col" className="px-6 py-3">{t("Home.table.doc-type")}</th>
						<th scope="col" className="px-6 py-3">{t("Home.table.actived-date")}</th>
						<th scope="col" className="px-6 py-3 text-center">#</th>
					</tr>
				</thead>
				
				<tbody>
					{documents.results.map(doc => (
						<tr 
							key={doc.documentId}
							className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
							<th scope="row" className="px-6 py-4 font-PromptSemiBold decoration-1 whitespace-nowrap dark:text-white">
								<Link 
									to={`${import.meta.env.VITE_BASE_URL}/documents/DownloadFile/${doc.documentId}`}
									target='_blank'>
									{doc.documentId}
								</Link>
							</th>
							<td className="px-6 py-4">{doc.name}</td>
							<td className="px-6 py-4">{doc.sizeInBytes}</td>
							<td className="px-6 py-4">{doc.documentCategory?.name}</td>
							<td className="px-6 py-4">{doc.activedDate}</td>
							<td className="px-6 py-4">
								<div className="flex items-center justify-center gap-3">
									<button className="btn">
										<EditDoc style={{ color: '#14b8a6', fontSize: '1.5rem' }}  />
									</button>
									<button className="btn">
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
