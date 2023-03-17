<script>
	import '../app.css';
</script>

<svelte:head>
	<meta charset="utf-8" />
	<link rel="icon" href="https://mic.tomhowland.com/favicon.ico" />

	<link
		rel="manifest"
		crossorigin="use-credentials"
		href="https://mic.tomhowland.com/manifest.json"
	/>
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
	<meta name="theme-color" content="#262626" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />

	<base href="/" />

	<meta name="author" content="Tom Howland" />

	<!-- HTML Meta Tags -->
	<title>Mic Check</title>
	<meta name="description" content="Check all your device's microphones!" />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content="https://mic.tomhowland.com/" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Mic Check" />
	<meta property="og:description" content="Check all your device's microphones!" />
	<meta
		property="og:image"
		content="https://res.cloudinary.com/desh5zjme/image/upload/v1679040284/mic-og-image_1200x630.png"
	/>

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content="mic.tomhowland.com" />
	<meta property="twitter:url" content="https://mic.tomhowland.com/" />
	<meta name="twitter:title" content="Mic Check" />
	<meta name="twitter:description" content="Check all your device's microphones!" />
	<meta
		name="twitter:image"
		content="https://res.cloudinary.com/desh5zjme/image/upload/v1679040284/mic-og-image_1200x630.png"
	/>

	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
</svelte:head>
<div
	class="bg-neutral-800 absolute inset-0 text-neutral-300 overflow-auto p-4 flex flex-col justify-between"
>
	<div class="container mx-auto">
		<slot />
	</div>
	<div class="text-center mt-2">
		<a
			href="https://github.com/THowland1/mic-test"
			class=" font-mono text-sm underline underline-offset-4 text-neutral-400 font-light hover:text-neutral-300 "
			>&lt;source /&gt;</a
		>
	</div>
</div>
