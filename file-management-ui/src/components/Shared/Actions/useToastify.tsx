import { toast } from 'react-toastify';

 export const useToastify = () => {
	function callNotify(type: 'success' | 'error' | 'info', message: string, autoClose?: number | false | undefined) {
		switch (type) {
			case 'info':
				toast.info(message, {
					autoClose: autoClose,
					position: "top-right",
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
				break;
		
			case 'error':
				toast.error(message, {
					autoClose: autoClose,
					position: "top-right",
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
			break;
			default:
				toast.success(message, {
					autoClose: autoClose,
					position: "top-right",
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "colored",
				});
		}
	}

	return {
		callNotify
	}
}