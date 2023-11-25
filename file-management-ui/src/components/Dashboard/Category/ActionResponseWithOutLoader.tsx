import { useTranslation } from "react-i18next";
import { useAppTheme, useCategoryAPI } from '@/features/store';
import Modal from "@/components/Dashboard/Common/Modal";

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function ActionResponseWithOutLoader() {
	const { t } = useTranslation();
	const { locale } = useAppTheme()
	const { 
		isError,
		isModalActive,
		clearError,
		categoryId,
		setModalActive,
		deletedCategory
	} = useCategoryAPI();

	function handleCloseModal(type: 'ok' | 'cancel') {
		if(type === 'ok' && isError) {
			clearError()
		} else if(type === 'ok') {
			deletedCategory(locale, categoryId)
		} else {
			setModalActive(false, categoryId)
		}
	}

	return (
		<>
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
