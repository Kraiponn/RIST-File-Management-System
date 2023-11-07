import { createTheme } from "@mui/material";

export type mode = 'dark' | 'light';

export const useMuiTheme = (theme: mode) => {
	return createTheme({
		palette: {
			mode: theme === 'dark' ? 'dark' : 'light',
			primary: {
				main: '#f5f5f5',
				// light: '',
				// dark: ''
			},
			secondary: {
				main: '#ffff00',
				// light: '',
				// dark: ''
			}
		}
	});
};

