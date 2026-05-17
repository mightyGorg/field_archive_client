<script>
	const props = $props()
</script>

<div
	class="sidebar"
	class:fade-in={props.initialFade}
	style="display: {props.isStarted ? 'block' : 'none'}"
>
	<h1>Field Archive</h1>
	<h3>{props.recording?.title}</h3>
	<h5>{props.recording?.locationdescription}</h5>
	<h5>[{props.recording?.latitude}, {props.recording?.longitude}]</h5>
	<p>
		{props.recording?.recordingdescription}
	</p>
</div>
