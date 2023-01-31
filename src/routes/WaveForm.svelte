<script lang="ts">
	/* Waveform.tsx */

	import WaveSurfer from 'wavesurfer.js';
	import Pause from './Icons/Pause.svelte';
	import Play from './Icons/Play.svelte';
	export let audio: Blob;

	let container: HTMLDivElement;
	let wavesurfer: WaveSurfer;
	let isPlaying = false;

	$: {
		if (container && !wavesurfer) {
			wavesurfer = WaveSurfer.create({
				container,
				waveColor: '#eeeeee',
				progressColor: '#999999',
				responsive: true,
				interact: true,
				height: 48,
				mediaControls: true,
				cursorWidth: 0
			});
			wavesurfer.loadBlob(audio);
			wavesurfer.on('play', () => {
				isPlaying = true;
			});
			wavesurfer.on('pause', () => {
				isPlaying = false;
			});
			wavesurfer.on('finish', () => {
				isPlaying = false;
			});
		}
	}
</script>

<div class="flex items-center gap-4">
	<button
		class="pointer rounded-full p-1 hover:bg-neutral-700"
		on:click={() => wavesurfer.playPause()}
	>
		{#if isPlaying}
			<Pause class="h-6 w-6" />
		{:else}
			<Play class="h-6 w-6" />
		{/if}
	</button>
	<div bind:this={container} class="flex-1" />
</div>
