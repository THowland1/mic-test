<script lang="ts">
	import { onMount } from 'svelte';
	import AudioRecorder from './AudioRecorder.svelte';
	import ArrowPath from './Icons/ArrowPath.svelte';
	import Microphone from './Icons/Microphone.svelte';
	import WaveForm from './WaveForm.svelte';
	import { v4 as uuid } from 'uuid';
	import Trash from './Icons/Trash.svelte';
	import { persistedWritable } from '../persisted-writable';
	import ArrowDownTray from './Icons/ArrowDownTray.svelte';
	import MediaRecorderComponent from './MediaRecorderComponent.svelte';
	import Video from '../lib/Video.svelte';

	let audioDevicesLoading = false;

	async function addDisplayDevice() {
		try {
			const result = await navigator.mediaDevices.getDisplayMedia({
				video: {},
				audio: {
					echoCancellation: false,
					noiseSuppression: false,
					sampleRate: 44100,
					suppressLocalAudioPlayback: false
				}
			});
			const hasAudio = Boolean(result.getAudioTracks().length);
			if (hasAudio) {
				tabs.push(result);
				tabs = tabs;
			} else {
				alert(
					'You need to pick a tab and select "Share tab audio". Your browser does not allow sharing audio from the whole screen'
				);
			}
		} catch (error) {
			alert('This feature does not work on your device. Try using Chrome on your browser.');
		}
	}

	async function refreshAudioDevices(fakeDelay = 1000) {
		audioDevicesLoading = true;
		try {
			await navigator.mediaDevices.getUserMedia({ audio: true });
			await refreshMicrophonePermission();
			const result = await navigator.mediaDevices.enumerateDevices();
			const audioinputs = result.filter(
				({ kind, deviceId }) => deviceId !== 'default' && kind === 'audioinput'
			);
			await new Promise((resolve) =>
				setTimeout(() => {
					resolve(undefined);
				}, fakeDelay)
			);

			$devices = audioinputs;
		} finally {
			audioDevicesLoading = false;
		}
	}

	async function refreshMicrophonePermission() {
		const { state } = await navigator.permissions.query({ name: 'microphone' as unknown as any });
		$microphonePermission = state;
	}

	let devices = persistedWritable<MediaDeviceInfo[]>('devices', []);
	let microphonePermission = persistedWritable<PermissionState | undefined>(
		'microphone-permission',
		undefined
	);
	onMount(async () => {
		devices.useLocalStorage();
		microphonePermission.useLocalStorage();
		await refreshMicrophonePermission();
		await refreshAudioDevices(0);
	});

	let recordings: { id: string; deviceLabel: string; audio: Blob; name: string }[] = [];
	let tabs: MediaStream[] = [];
</script>

<h1 class="text-xl uppercase font-bold text-neutral-500 text-center tracking-wider">Mic check</h1>
<div class=" mt-4 mb-2 flex gap-2 items-center">
	<h2 class="text-sm uppercase font-semibold text-neutral-500">Audio devices</h2>
	{#if $microphonePermission === 'granted'}
		<button on:click={() => refreshAudioDevices()} class:animate-spin={audioDevicesLoading}>
			<ArrowPath class="w-3 h-3 text-neutral-500" stroke-width="2.5" />
		</button>
	{/if}
</div>
{#if $microphonePermission === undefined}
	<div class="h-14" />
{:else if $microphonePermission === 'denied'}
	<div
		class="rounded p-4 flex gap-2 items-center border  border-neutral-700/60  shadow-[-1px_-1px_0_0_black,inset_-1px_-1px_0_0_black] shadow-neutral-900"
	>
		<Microphone class="w-6 h-6" />
		<span class="text-neutral-400">
			To see your microphones, you will need update you browser's permissions for this site
		</span>
	</div>
{:else if $microphonePermission === 'prompt'}
	<div
		class="rounded p-4 flex gap-2 items-center border  border-neutral-700/60  shadow-[-1px_-1px_0_0_black,inset_-1px_-1px_0_0_black] shadow-neutral-900"
	>
		<Microphone class="w-6 h-6" />
		<span class="text-neutral-400">
			To see your microphones, you will need to grant this site access
		</span>
		<button
			on:click={() => refreshAudioDevices()}
			class="rounded py-1 px-3  bg-neutral-700/30 hover:bg-neutral-700 text-sm font-medium border  border-neutral-700/60  shadow-[-1px_-1px_0_0_black,inset_-1px_-1px_0_0_black] shadow-neutral-900"
			>Grant access</button
		>
	</div>
{:else if $microphonePermission === 'granted'}
	<div class="flex gap-3 flex-wrap">
		{#each $devices as item}
			<div
				class="rounded p-4 flex-1 border  border-neutral-700/60  shadow-[-1px_-1px_0_0_black,inset_-1px_-1px_0_0_black] shadow-neutral-900"
			>
				<div class="h-8 leading-none">
					{item.label}
				</div>
				<div>
					<AudioRecorder
						deviceId={item.deviceId}
						on:recordingCreated={async (e) => {
							recordings = [
								{
									id: uuid(),
									name: `Recording ${recordings.length + 1}`,
									audio: e.detail,
									deviceLabel: item.label
								},
								...recordings
							];
						}}
					/>
				</div>
			</div>
		{/each}
	</div>
{/if}

<h2 class="text-sm uppercase font-semibold text-neutral-500 mt-4 mb-2">Tab Audio</h2>

<div class="flex gap-3 flex-wrap">
	{#each tabs as stream}
		<div
			class="min-w-[175px] relative grid rounded p-4 flex-1 border  border-neutral-700/60  shadow-[-1px_-1px_0_0_black,inset_-1px_-1px_0_0_black] shadow-neutral-900"
		>
			<div class="row-start-1 col-start-1">
				<Video class="absolute inset-0 w-full h-full opacity-30" {stream} autoplay muted />
			</div>
			<div class="row-start-1 col-start-1 z-10">
				<MediaRecorderComponent
					{stream}
					on:recordingCreated={async (e) => {
						recordings = [
							{
								id: uuid(),
								name: `Recording ${recordings.length + 1}`,
								audio: e.detail,
								deviceLabel: 'Tab recording'
							},
							...recordings
						];
					}}
				/>
			</div>
		</div>
	{/each}
	<div
		class="min-w-[175px]  flex flex-col justify-between rounded p-4 flex-1 border  border-neutral-700/60  shadow-[-1px_-1px_0_0_black,inset_-1px_-1px_0_0_black] shadow-neutral-900"
	>
		<div class="h-8 leading-none">Share audio from a tab</div>
		<button
			on:click={() => addDisplayDevice()}
			class="rounded py-1 px-3  bg-neutral-700/30 hover:bg-neutral-700 text-sm font-medium border  border-neutral-700/60  shadow-[-1px_-1px_0_0_black,inset_-1px_-1px_0_0_black] shadow-neutral-900"
			>Pick a tab to share</button
		>
	</div>
</div>

<h2 class="text-sm uppercase font-semibold text-neutral-500 mt-4 mb-2">Recordings</h2>
<div class="h-[1px] w-full bg-neutral-900" />
<div class="h-[1px] w-full bg-neutral-700" />
<div class="flex flex-col">
	{#each recordings as recording (recording.id)}
		<div class=" w-full py-4 group">
			<div class="flex items-center justify-between">
				<div class="">
					<input class="bg-transparent" bind:value={recording.name} />
					<div class="text-neutral-400 text-sm">
						{recording.deviceLabel}
					</div>
				</div>
				<div class="flex gap-2">
					<a
						class="rounded-full bg-neutral-700/30 hover:bg-neutral-700 p-2 opacity-0 transition-opacity group-hover:opacity-100 hover-none:opacity-100"
						href={URL.createObjectURL(recording.audio)}
						download={recording.name}
					>
						<ArrowDownTray class="w-4 h-4 " />
					</a>
					<button
						class="rounded-full bg-neutral-700/30 hover:bg-neutral-700 p-2 opacity-0 transition-opacity group-hover:opacity-100 hover-none:opacity-100"
						on:click={() => {
							recordings = recordings.filter(({ id }) => id !== recording.id);
						}}
					>
						<Trash class="w-4 h-4 " />
					</button>
				</div>
			</div>
			<div class="flex-1">
				<WaveForm audio={recording.audio} />
			</div>
		</div>
		<div class="h-[1px] w-full bg-neutral-900" />
		<div class="h-[1px] w-full bg-neutral-700" />
	{:else}
		<div class="text-sm text-neutral-500 uppercase text-center flex-1  py-4">No recordings yet</div>
		<div class="h-[1px] w-full bg-neutral-900" />
		<div class="h-[1px] w-full bg-neutral-700" />
	{/each}
</div>
