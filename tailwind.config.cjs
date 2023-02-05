/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			keyframes: {
				ellipsis: {
					'0%, 25%, 100%': { transform: 'translateY(0)' },
					'12%': { transform: 'translateY(-4px)' }
				}
			},
			animation: {
				'ellipsis-1': 'ellipsis 2s infinite 0s',
				'ellipsis-2': 'ellipsis 2s infinite .1s',
				'ellipsis-3': 'ellipsis 2s infinite .2s'
			}
		}
	},
	plugins: []
};
