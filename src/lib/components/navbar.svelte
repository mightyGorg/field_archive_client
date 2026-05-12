<script lang="ts">
	import {
		isCanvas,
		isStarted,
		navigating,
		initialFade,
		isFading
	} from '../../stores/fades'
	import { get } from 'svelte/store'

	const toggle = () => {
		initialFade.set(false)

		setTimeout(() => {
			const current = get(isCanvas)
			isCanvas.set(!current)
			isFading.set(true)
			navigating.set(false)
			console.log($navigating)
		}, 1000)
	}
</script>

<link href="./navstyle.css" rel="stylesheet" />

<div>
	{#if $isStarted}
		<nav class:fade-in={$initialFade}>
			<ul>
				<li>
					<a
						on:click={(e) => {
							e.preventDefault()
							isFading.set(false)
							navigating.set(true)
							console.log($navigating)
							toggle()
						}}
					>
						<img
							src="/world.png"
							alt="Toggle map"
							width="25"
							height="25"
							style="cursor: pointer"
						/>
					</a>
				</li>
			</ul>
		</nav>
	{/if}
</div>
