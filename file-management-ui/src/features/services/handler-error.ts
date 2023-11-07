import { AxiosError } from 'axios';

function getResponseMessage(error: AxiosError) {
	const response = error.response;
	let message = '';

	if(response?.status === 400)
		message = 'Something went wrong. Please try again. - (400)';
	else if(response?.status === 403)
		message = 'Unauthorized. try a different query. - (403)';
	else if(response?.status === 404)
		message = 'Notthing found. try a different query. - (404)';
	else if(response?.status === 500)
		message = 'Something went wrong from server. - (500)';
	else
		message = 'Something went wrong. Please try again.';

	return message;
}

export const getErrorResponse = (error: AxiosError) => {
	let errMessage = '';

	if (error.response) {
		// The request was made and the server responded with a status code
		// that falls out of the range of 2xx
		// console.log(error.response.data);
		// console.log(error.response.status);
		// console.log(error.response.headers);

		errMessage = getResponseMessage(error);
    } else if (error.request) {
		// The request was made but no response was received
		// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
		// http.ClientRequest in node.js
		// console.log(error.request);

		errMessage = `Response error at request api`
    } else {
		// Something happened in setting up the request that triggered an Error
		// console.log('Error', error.message);
		errMessage = `Response error at ${error.message}`
    }

	return errMessage || '';
}

