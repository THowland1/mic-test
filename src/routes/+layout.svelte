<script>
	import '../app.css';
	import { page } from '$app/stores';
	const TITLE = 'Mic Check';
	const DESCRIPTION = "Check all your device's microphones!";
	const IMAGE = `${$page.url.origin}/og-image.png`;

	const URL = $page.url;
</script>

<svelte:head>
	<base href="/" />

	<meta name="author" content="Tom Howland" />
	<meta property="og:locale" content="en_GB" />
	<meta property="og:url" content={URL.toString()} />
	<meta property="og:type" content="website" />

	<meta name="twitter:card" content="summary_large_image" />

	<title>{TITLE}</title>

	<meta name="description" content={DESCRIPTION} />
	<meta property="og:title" content={TITLE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:site_name" content={TITLE} />
	<meta name="twitter:title" content={TITLE} />
	<meta name="twitter:description" content={DESCRIPTION} />
	<meta name="twitter:image:alt" content={TITLE} />
	<meta property="og:image" content={IMAGE} />
	<meta name="twitter:image" content={IMAGE} />
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
