<script lang="ts">
	import type { HTMLVideoAttributes } from 'svelte/elements';

	interface $$Props extends HTMLVideoAttributes {
		stream: MediaStream;
	}

	let video: HTMLVideoElement | null = null;
	export let stream: MediaStream;

	$: if (video) {
		video.srcObject = stream;
	}
</script>

<video bind:this={video} {...$$restProps}>
	<track kind="captions" />
</video>
