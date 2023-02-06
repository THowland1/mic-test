<script>
	import '../app.css';
</script>

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
