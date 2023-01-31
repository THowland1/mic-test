<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import MediaRecorderComponent from './MediaRecorderComponent.svelte';

	const dispatch = createEventDispatcher<{ recordingCreated: Blob }>();

	export let deviceId: string;
	async function getStream() {
		const stream = await navigator.mediaDevices.getUserMedia({
			audio: { deviceId: { exact: deviceId } },
			video: false
		});
		return stream;
	}
	let streamPromise = getStream();
</script>

{#await streamPromise then stream}
	<MediaRecorderComponent
		{stream}
		on:recordingCreated={(e) => dispatch('recordingCreated', e.detail)}
	/>
{/await}
