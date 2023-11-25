import { useTranslation } from "react-i18next";
import { useCategoryAPI } from '@/features/store';

import Loading from "@/components/Shared/Loaders/Common";
import Modal from "@/components/Dashboard/Common/Modal";

/*******************************************************************************************
 * 														 	  MAIN FUNCTION																		*
 ******************************************************************************************/
export default function ActionResponse() {
	const { t } = useTranslation();
	const { 
		isError,
		isModalActive,
		loading,
		clearError,
		categoryId,
		setModalActive,
		deletedCategory
	} = useCategoryAPI();

	const  handleClosedModal = (type: 'ok' | 'cancel') => {
		if(type === 'ok' && isError) {
			clearError()
		} else if(type === 'ok') {
			deletedCategory(categoryId)
		} else {
			setModalActive(false, categoryId)
		}	
	}

	return (
		<>
			{/*****************			   Show Loading		    ******************/}
			{loading && (
				<Loading
					isLoading={loading}
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
					onCloseModal={handleClosedModal}
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
				onCloseModal={handleClosedModal}
			/>
		</>
	)
}
