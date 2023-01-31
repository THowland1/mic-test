<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import AudioVisualiser from './AudioVisualiser.svelte';

	export let stream: MediaStream;
	const dispatch = createEventDispatcher<{ recordingCreated: Blob }>();

	let audioElement: HTMLAudioElement;
	$: if (audioElement && audioElement.srcObject !== stream) {
		audioElement.srcObject = stream;
	}

	let mediaRecorder = new MediaRecorder(stream);
	mediaRecorder.ondataavailable = (e) => {
		dispatch('recordingCreated', e.data);
	};
</script>

<audio bind:this={audioElement} />
<AudioVisualiser {stream} />

<div class="flex items-center">
	<div class="flex-1 animate-pulse">
		{#if mediaRecorder.state === 'recording'}
			<span class="w-2 h-2 mr-1 rounded-full inline-block bg-red-600 " />
			<span class="text-xs text-neutral-400">rec</span>
		{/if}
	</div>
	<button
		class="border border-neutral-600 rounded-full p-3 transition-opacity opacity-70 hover:opacity-100 leading-[0] shadow-[-1px_-1px_0_0_black,inset_-1px_-1px_0_0_black] shadow-[#090909]"
		on:click={() => {
			if (mediaRecorder.state === 'recording') {
				mediaRecorder.stop();
			} else {
				mediaRecorder.start();
			}

			mediaRecorder = mediaRecorder;
		}}
		><span
			class:rounded-full={mediaRecorder.state !== 'recording'}
			class:bg-red-500={mediaRecorder.state !== 'recording'}
			class:rounded-sm={mediaRecorder.state === 'recording'}
			class:bg-neutral-300={mediaRecorder.state === 'recording'}
			class="w-3 h-3 inline-block transition-all"
		/></button
	>
	<div class="flex-1" />
</div>
