import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors

	// preprocess: preprocess(),
	preprocess: preprocess({
		scss: {
			includePaths: ['theme'],
		},
	}),

	kit: {
		adapter: vercel()
	},
};

export default config;
