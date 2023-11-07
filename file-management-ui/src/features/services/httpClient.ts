import axios from 'axios'

export const httpClient = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	// baseURL: 'http://localhost:5292/api/v1',
	timeout: 9999,
});