<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import AudioVisualiser from './AudioVisualiser.svelte';
	import MediaRecorderComponentLayout from './MediaRecorderComponentLayout.svelte';

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

	function onClick() {
		switch (mediaRecorder.state) {
			case 'inactive':
			case 'paused':
				mediaRecorder.start();
				break;
			case 'recording':
				mediaRecorder.stop();
				break;
		}
		mediaRecorder = mediaRecorder;
	}
</script>

<audio bind:this={audioElement} />

<MediaRecorderComponentLayout state={mediaRecorder.state} on:click={onClick}>
	<AudioVisualiser {stream} />
</MediaRecorderComponentLayout>
