/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
	"./index.html",
	"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
	extend: {
		fontFamily: {
			sans: ["Prompt-Regular", "sans-serif"],
			"PromptThin": ["Prompt-Thin", "sans-serif"],
			"PromptItalic": ["Prompt-Italic", "sans-serif"],
			"PromptRegular": ["Prompt-Regular", "sans-serif"],
			"PromptMedium": ["Prompt-Medium", "sans-serif"],
			"PromptSemiBold": ["Prompt-SemiBold", "sans-serif"],
			"PromptBold": ["Prompt-Bold", "sans-serif"],
		},
		"animation": {
			"modal": "modal 0.7s ease-in-out",
			"search-filter": "search-filter .3s ease-out",
			"tb-content": "tb-content .3s ease-out",
		},
		"keyframes": {
			"modal": {
				"0%": { opacity: 0, transform: "scale(0)" },
				"50%": { transform: "scale(1.2)" },
				"100%": { transform: "scale(1)", opacity: 1 },
			},
			"search-filter": {
				"0%": { transform: "translateX(-100%)" },
				"100%": { transform: "translateX(0%)" },
			},
			"tb-content": {
				"0%": { width: "100%" },
				"100%": { width: "80%" },
				// "0%": { transform: "translateX(-100%)" },
				// "100%": { transform: "translateX(0%)" },
			}
		}
	},
	},
	plugins: [],
}

