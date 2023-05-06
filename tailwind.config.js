/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./modules/**/*.{js,ts,jsx,tsx,mdx}",
		"./shared/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			colors: {
				accent: {
					100: "#d9f4e2",
					200: "#b3e9c6",
					300: "#8ddea9",
					400: "#67d38d",
					500: "#41c870",
					600: "#34a05a",
					700: "#277843",
					800: "#1a502d",
					900: "#0d2816"
				},
				primary: {
					100: "#d0d0d0",
					200: "#a0a1a1",
					300: "#717173",
					400: "#414244",
					500: "#1e1f23",
					600: "#0e0f11",
					700: "#0b0b0d",
					800: "#070808",
					900: "#040404"
				}
			}
		}
	},
	plugins: []
};
