import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware';

interface IUserInterface {
	isDarkMode: boolean,
	locale: 'en' | 'th',
	openMobileMenu: boolean,
	openDashboardMenu: boolean,
	isActiveQueryFilter: boolean,
	isActiveDocumentMenu: boolean,
	isActiveCategoryMenu: boolean,
	isActiveSettingsMenu: boolean,
	isShowModal: boolean,
	changedTheme: () => void,
	changedLocale: () => void,
	toggleMobileMenu: () => void,
	setQueryFilter: (type: 'open' | 'close') => void,
	setDashboardMenu: (type: 'open' | 'close') => void,
	setToggleDashboardDrawerMenu: (type: 'documents' | 'categories' | 'settings') => void,
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
				openDashboardMenu: false,
				isActiveQueryFilter: false,
				isActiveDocumentMenu: true,
				isActiveCategoryMenu: true,
				isActiveSettingsMenu: true,
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
				setDashboardMenu: (type: 'open' | 'close') => {
					if(type === 'open') set(() => ({ openDashboardMenu: true }))
					else set(() => ({ openDashboardMenu: false }))
				},
				setToggleDashboardDrawerMenu: (type: 'documents' | 'categories' | 'settings') => {
					if(type === 'documents') {
						set((state) => ({ isActiveDocumentMenu: !state.isActiveDocumentMenu }));
					}
					else if(type === 'categories') {
						set((state) => ({ isActiveCategoryMenu: !state.isActiveCategoryMenu }));
					}
					else {
						set((state) => ({ isActiveSettingsMenu: !state.isActiveSettingsMenu }));
					}
				},
				setQueryFilter: (type: 'open' | 'close') =>  {
					if(type === 'open') set({ isActiveQueryFilter: true })
					else set({ isActiveQueryFilter: false })
				}
			}),
			{ name: 'UIStore' }
		)
	)
);