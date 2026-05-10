<script lang="ts">
    import { onDestroy, setContext, onMount} from 'svelte';
    import { mapboxgl, key } from '$lib';

    setContext(key, {
        getMap: () => map,
    });

    let map: mapboxgl.Map | null;
    const props = $props();

    function initMap(node: HTMLElement) {
        map = new mapboxgl.Map({
            container: 'map_box_container',
            style: 'mapbox://styles/mapbox/satellite-v9',
            center: [-103.5917, 40.6699],
            zoom: 3,
        });
    }

    onMount(() => map.resize())

    onDestroy(() => {
        if (map) map.remove();
    });
</script>
<section id="map_box_container" class:fade-in={props.isFading} class:fade-out={props.navigating} >
    <div id='map'  use:initMap></div>
</section>  
