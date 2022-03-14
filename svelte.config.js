import preprocess from 'svelte-preprocess';
import vercel from '@sveltejs/adapter-vercel';
// const pkg = require("./package.json");
import pkg from './package.json' assert {type: "json"};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	// preprocess: preprocess(),
	preprocess: preprocess({
		scss: {
			includePaths: ["theme"],
		},
	}),

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		adapter: vercel()
	},
	vite: {
		ssr: {
			noExternal: Object.keys(pkg.dependencies || {}),
		},
	},
};

export default config;
