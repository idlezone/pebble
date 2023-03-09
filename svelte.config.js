// import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from "sveltekit-adapter-chrome-extension";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),


	kit: {
		// adapter: adapter(),
		adapter: adapter({
			pages: "build/app",
			assets: "build/app",
			fallback: null,
			precompress: false,
			manifest: "manifest.json",
			emptyOutDir: true,
		}),
		appDir: 'app'
	}
};

export default config;
