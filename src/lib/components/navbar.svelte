<link href="./navstyle.css" rel="stylesheet"/>
<script lang="ts">
    import {isCanvas, isStarted, navigating, initialFade } from '../../stores/fades';
    import { page } from '$app/state';
    import { get } from 'svelte/store'

    const toggle = () => {
        initialFade.set(false);

        setTimeout(() => {
            const current = get(isCanvas);
            isCanvas.set(!current); 
            navigating.set(false)
        }, 1000);
    }
</script>

<div>
    {#if $isStarted} 
    <nav class:fade-in={$initialFade}>
        <ul>
            <li>
                <a 
                    on:click={(e) => {
                        e.preventDefault();
                        navigating.set(true);
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
