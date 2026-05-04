<link href='homestyle.css' rel='stylesheet'>
<script lang="ts">
    import { Visualiser } from "$lib";
    import Map from "../lib/components/map.svelte";
    import { audioPlayer } from '../stores/audio';
    import { isCanvas, initialFade, isFading, isStarted, navigating } from "../stores/fades";


    let canvas: HTMLCanvasElement;
    let visualiser: Visualiser;

    const start = async() => {
        isFading.set(true);
        initialFade.set(true)
        audioPlayer.subscribe(async player => {      
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
            renderFrame();
        }});
    }
    
</script>
<div class:fade-out={$navigating}>
    {#if !$isStarted} 
        <button 
            onclick={start}
            class:fade-out={$isFading}
            >Field Archive
        </button>
    {/if}

    <canvas 
        class:fade-in={$isFading}
        style="display: {$isCanvas ? 'block' : 'none'}" 
        bind:this={canvas}
    />

    {#if !$isCanvas}
        <Map
            style="display: {$isCanvas ? 'block' : 'none'}"/>
    {/if}

</div>







