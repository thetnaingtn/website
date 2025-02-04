// import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

// TODO Fix sentry
export default defineConfig({
	plugins: [sveltekit()],
	// plugins: [sentrySvelteKit(), sveltekit()],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},
	css: {
		devSourcemap: true,
		preprocessorOptions: {
			postcss: {
				additionalData: `
				@custom-media --below_small (width < 400px);
				@custom-media --below_med (width < 700px);
				@custom-media --below_large (width < 900px);
				@custom-media --below_xlarge (width < 1200px);

				@custom-media --above_small (width > 400px);
				@custom-media --above_med (width > 700px);
				@custom-media --above_large (width > 900px);
				@custom-media --above_xlarge (width > 1200px);
				`
			}
		}
	},
	ssr: {
		external: ['@sentry/profiling-node']
	},
	esbuild: {
		exclude: '@sentry/profiling-node'
	},
	resolve: {
		alias: {
			'.prisma/client/index-browser': './node_modules/@prisma/client/index-browser.js'
		}
	},
	define: {
		__VER__: JSON.stringify(process.env.npm_package_version)
	}
});
