<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let state: RecordingState | 'loading';
	const dispatch = createEventDispatcher<{ click: void }>();
</script>

<slot />

<div class="flex items-center">
	<div class="flex-1 animate-pulse">
		{#if state === 'recording'}
			<span class="w-2 h-2 mr-1 rounded-full inline-block bg-red-600 " />
			<span class="text-xs text-neutral-400">rec</span>
		{/if}
	</div>
	<button
		class="border border-neutral-600 rounded-full w-9 h-9 flex items-center justify-center gap-[2px] transition-opacity opacity-70 hover:opacity-100 leading-[0] shadow-[-1px_-1px_0_0_black,inset_-1px_-1px_0_0_black] shadow-[#090909]"
		on:click={() => dispatch('click')}
	>
		{#if state === 'loading'}
			<span class="rounded-full h-1 w-1 bg-neutral-500 inline-block animate-ellipsis-1" />
			<span class="rounded-full h-1 w-1 bg-neutral-500 inline-block animate-ellipsis-2" />
			<span class="rounded-full h-1 w-1 bg-neutral-500 inline-block animate-ellipsis-3" />
		{:else}
			<span
				class:rounded-full={state !== 'recording'}
				class:bg-red-500={state !== 'recording'}
				class:rounded-sm={state === 'recording'}
				class:bg-neutral-300={state === 'recording'}
				class="w-3 h-3 inline-block transition-all"
			/>
		{/if}
	</button>
	<div class="flex-1" />
</div>
