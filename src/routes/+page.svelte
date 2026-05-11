<link href='homestyle.css' rel='stylesheet'>
<script lang="ts">
    import { Visualiser } from "$lib";
    import Map from "../lib/components/map.svelte";
    import Sidebar from '../lib/components/sidebar.svelte'
    import { audioPlayer } from '../stores/audio';
    import { isCanvas, initialFade, isFading, isStarted, navigating } from "../stores/fades";


    let canvas: HTMLCanvasElement;
    let visualiser: Visualiser;

    const start = async() => {
        isFading.set(true);
        initialFade.set(true)
        audioPlayer.subscribe(async player => {      
        console.log('audio subscription called...')
        if (player) {
            setTimeout(() => isStarted.set(true), 1000);
            visualiser = new Visualiser(canvas);
            visualiser.setCanvas();

            function renderFrame(): void {
                if (player) {
                const freqData: Uint8Array = player.getFrequencyData();
                visualiser.draw(freqData);
                requestAnimationFrame(renderFrame);  
            }};
            await player.playNext();
            await player.engine.ctx.resume();
            renderFrame();
        }});
    }
    
</script>
<div>
    <div class='home-container'>
        {#if !$isStarted} 
            <button 
                onclick={start}
                class:fade-out={$isFading}
                >Field Archive
            </button>
        {/if}

        <Sidebar 
            isStarted={$isStarted}
            initialFade={$initialFade}
        />
        <canvas 
            class:fade-out={$navigating && !$isFading}
            class:fade-in={$isFading && !$navigating}
            class='spectrogram'
            bind:this={canvas}
        ></canvas>

        {#if !$isCanvas}

            <Map navigating={$navigating} isFading={$isFading}/>

        {/if}

    </div>

</div>
