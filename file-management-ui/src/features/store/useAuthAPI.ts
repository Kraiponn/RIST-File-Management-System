import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface IAuth {
	accessToken: string,
	refreshToken: string,
	loading: false,
	errorMsg: string,
	register: () => void,
	login: () => void,
	logout: () => void,
}

export const useAuthAPI = create<IAuth>()(
	devtools(
		persist(
			() => ({
				accessToken: '',
				refreshToken: '',
				loading: false,
				errorMsg: '',
				register: () => {},
				login: () => {},
				logout: () => {}
			}),
			{ name: 'AuthStore' }
		)
	)
)