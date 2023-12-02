import axios from 'axios'

export const httpClient = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,   // Add your domain here
	timeout: 9999,
	headers: {
		"Content-type": "application/json",
	},
});