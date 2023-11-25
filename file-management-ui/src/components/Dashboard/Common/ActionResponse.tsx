import { useTranslation } from "react-i18next";
import { useAppTheme, useDocumentAPI } from '@/features/store';

import Loading from "@/components/Shared/Loaders/Common";
import Modal from "@/components/Dashboard/Common/Modal";

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function ActionResponse() {
	const { t } = useTranslation();
	const { locale } = useAppTheme()
	const { 
		isError,
		isModalActive,
		loading,
		clearError,
		documentId,
		setModalActive,
		deletedDocument
	} = useDocumentAPI();

	function handleCloseModal(type: 'ok' | 'cancel') {
		if(type === 'ok' && isError) {
			clearError()
		} else if(type === 'ok') {
			deletedDocument(locale, documentId)
		} else {
			setModalActive(false, documentId)
		}
	}

	return (
		<>
			{/*****************			   Show Loading		    ******************/}
			{loading && (
				<Loading
					isLoading={true}
					color="#fcd34d"
					size={80}
					speed={0.789}
					loaderType='Pacman'
				/>
			)}

			{/*****************			   Show Error  Modal		    ******************/}
			{isError && (
				<Modal 
					title={t('Dashboard.modal.errorTitle')}
					description={isError}
					iconType="Error"
					isShow={!!isError}
					okButtonLabel={t('Dashboard.modal.okButtonLabel')}
					// cancelButtonLabel={t('Dashboard.modal.cancelButtonLabel')}
					onCloseModal={handleCloseModal}
				/>
			)}

			{/*****************			   Confirm to Remove  Modal		    ******************/}
			<Modal 
				title={t('Dashboard.modal.infoTitle')}
				description={t('Dashboard.modal.infoDescription')}
				iconType="Info"
				isShow={isModalActive}
				okButtonLabel={t('Dashboard.modal.okButtonLabel')}
				cancelButtonLabel={t('Dashboard.modal.cancelButtonLabel')}
				onCloseModal={handleCloseModal}
			/>
		</>
	)
}
