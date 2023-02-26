<script lang="ts">
	let canvas: HTMLCanvasElement;

	$: if (canvas) {
		draw();
	}

	function draw() {
		let canvasCtx = canvas?.getContext('2d');
		if (!canvasCtx) {
			return;
		}
		const WIDTH = canvas.width;
		const HEIGHT = canvas.height;

		requestAnimationFrame(draw);

		canvasCtx.fillStyle = 'rgb(38, 38, 38)';
		canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

		canvasCtx.lineWidth = 2;
		canvasCtx.strokeStyle = 'rgb(200, 200, 200)';

		canvasCtx.beginPath();

		canvasCtx.moveTo(0, canvas.height / 2);
		canvasCtx.lineTo(canvas.width, canvas.height / 2);
		canvasCtx.stroke();
	}
</script>

<canvas style:width="100%" height="75" bind:this={canvas} />
