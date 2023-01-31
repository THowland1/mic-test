<script lang="ts">
	export let stream: MediaStream;
	let canvas: HTMLCanvasElement;
	let audioCtx = new AudioContext();
	const source = audioCtx.createMediaStreamSource(stream);

	const analyser = audioCtx.createAnalyser();
	analyser.fftSize = 2048;
	const bufferLength = analyser.frequencyBinCount;
	const dataArray = new Uint8Array(bufferLength);

	source.connect(analyser);
	//analyser.connect(audioCtx.destination);

	$: if (canvas) {
		draw();
	}

	function draw() {
		let canvasCtx = canvas.getContext('2d');
		if (!canvasCtx) {
			console.error(`canvasCtx is null`);
			return;
		}
		const WIDTH = canvas.width;
		const HEIGHT = canvas.height;

		requestAnimationFrame(draw);

		analyser.getByteTimeDomainData(dataArray);

		canvasCtx.fillStyle = 'rgb(38, 38, 38)';
		canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

		canvasCtx.lineWidth = 2;
		canvasCtx.strokeStyle = 'rgb(200, 200, 200)';

		canvasCtx.beginPath();

		let sliceWidth = (WIDTH * 1.0) / bufferLength;
		let x = 0;

		for (let i = 0; i < bufferLength; i++) {
			let v = dataArray[i] / 128.0;
			let y = (v * HEIGHT) / 2;

			if (i === 0) {
				canvasCtx.moveTo(x, y);
			} else {
				canvasCtx.lineTo(x, y);
			}

			x += sliceWidth;
		}

		canvasCtx.lineTo(canvas.width, canvas.height / 2);
		canvasCtx.stroke();
	}
</script>

<canvas style:width="100%" height="75" bind:this={canvas} />
