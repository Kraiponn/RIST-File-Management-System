import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware';

interface IUserInterface {
	isDarkMode: boolean,
	locale: 'en' | 'th',
	openMobileMenu: boolean,
	isShowModal: boolean,
	changedTheme: () => void,
	changedLocale: () => void,
	toggleMobileMenu: () => void,
	openModal: () => void,
	closeModal: () => void
}

export const useAppTheme = create<IUserInterface>()(
	devtools(
		persist(
			(set) => ({
				isDarkMode: false,
				locale: 'en',
				openMobileMenu: false,
				isShowModal: false,
				openModal: () => set(() => ({ isShowModal: true })),
				closeModal: () => set(() => ({ isShowModal: false })),
				toggleMobileMenu: () => set((state) => ({ openMobileMenu: !state.openMobileMenu  })),
				changedTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
				changedLocale: () => set((state) => {
					if(state.locale === 'en')
						return ({ locale: 'th' })
					else 
						return ({ locale: 'en' })
				}),
			}),
			{ name: 'UIStore' }
		)
	)
);