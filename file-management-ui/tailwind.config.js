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
			"sidebar-menu": "sidebar-menu .3s ease-out",
			"reverse-sidebar-menu": "reverse-sidebar-menu .3s ease-out",
			"tb-content": "tb-content .3s ease-out",
			"reverse-tb-content": "reverse-tb-content .2s ease-out",
			"slide-down": "slide-down .3s ease-in-out",
			"header": "header 2s linear alternate infinite",
			"from-top": "from-top 3s ease-in-out"
		},
		"keyframes": {
			"modal": {
				"0%": { opacity: 0, transform: "scale(0)" },
				"50%": { transform: "scale(1.2)" },
				"100%": { transform: "scale(1)", opacity: 1 },
			},
			"sidebar-menu": {
				"0%": { transform: "translateX(-100%)" },
				"100%": { transform: "translateX(0%)" },
			},
			"reverse-sidebar-menu": {
				"0%": { transform: "translateX(0%)", display: 'flex' },
				"100%": { transform: "translateX(-100%)", display: 'none' },
			},
			"tb-content": {
				"0%": { width: "100%" },
				"100%": { width: "85%" },
			},
			"reverse-tb-content": {
				"0%": { width: "85%" },
				"100%": { width: "100%" },
			},
			"header": {
				"0%": { transform: "translateY(0)" },
				"50%": { transform: "translateY(-25px)" },
				"100%": { transform: "translateY(25px)" },
			},
			"from-top": {
				"0%": { height: "0%"  },
				// "50%": { height: "50%" },
				"100%": { height: "auto" },
			}
		}
	},
	},
	plugins: [],
}

