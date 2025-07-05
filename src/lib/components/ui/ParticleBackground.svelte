<script lang="ts">
	export let count: number = 50;
	export let color: string = 'rgba(255, 255, 255, 0.5)';
	export let minSize: number = 1;
	export let maxSize: number = 4;
	export let minDuration: number = 15;
	export let maxDuration: number = 30;

	interface Particle {
		id: number;
		startX: number;
		startY: number;
		translateX: number;
		translateY: number;
		size: number;
		duration: number;
		delay: number;
	}

	const particles: Particle[] = Array.from({ length: count }, (_, i) => {
		const side = Math.floor(Math.random() * 4);
		let sx = 0, sy = 0, tx = 0, ty = 0;

		switch (side) {
			case 0: // from top
				sx = Math.random() * 100;
				sy = -5;
				tx = (Math.random() - 0.5) * 40;
				ty = 110;
				break;
			case 1: // from right
				sx = 105;
				sy = Math.random() * 100;
				tx = -110;
				ty = (Math.random() - 0.5) * 40;
				break;
			case 2: // from bottom
				sx = Math.random() * 100;
				sy = 105;
				tx = (Math.random() - 0.5) * 40;
				ty = -110;
				break;
			default: // from left
				sx = -5;
				sy = Math.random() * 100;
				tx = 110;
				ty = (Math.random() - 0.5) * 40;
				break;
		}

		return {
			id: i,
			startX: sx,
			startY: sy,
			translateX: tx,
			translateY: ty,
			size: Math.random() * (maxSize - minSize) + minSize,
			duration: Math.random() * (maxDuration - minDuration) + minDuration,
			delay: Math.random() * -maxDuration
		};
	});
</script>

<div class="particle-bg" aria-hidden="true">
	{#each particles as particle (particle.id)}
		<span
			class="particle"
			style="
        --start-x: {particle.startX}%;
        --start-y: {particle.startY}%;
        --translate-x: {particle.translateX}vw;
        --translate-y: {particle.translateY}vh;
        --size: {particle.size}px;
        --duration: {particle.duration}s;
        --delay: {particle.delay}s;
        --color: {color};
      "
		></span>
	{/each}
</div>

<style>
	.particle-bg {
		position: absolute;
		inset: 0;
		overflow: hidden;
		z-index: 0;
	}

	.particle {
		position: absolute;
		top: var(--start-y);
		left: var(--start-x);
		width: var(--size);
		height: var(--size);
		background: var(--color);
		border-radius: 50%;
		animation: move var(--duration) linear infinite;
		animation-delay: var(--delay);
		opacity: 0;
	}

	@keyframes move {
		0% {
			transform: translate(0, 0);
			opacity: 0.8;
		}
		95% {
			opacity: 1;
		}
		100% {
			transform: translate(var(--translate-x), var(--translate-y));
			opacity: 0;
		}
	}
</style> 