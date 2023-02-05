<script lang="ts">
	import FakeAudioVisualiser from './FakeAudioVisualiser.svelte';
	import MediaRecorderComponentLayout from './MediaRecorderComponentLayout.svelte';
</script>

<MediaRecorderComponentLayout state={'loading'}>
	<FakeAudioVisualiser />
</MediaRecorderComponentLayout>
