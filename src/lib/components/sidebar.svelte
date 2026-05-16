<script>
	const props = $props()

	console.log(props.recording)
</script>

<div
	class="sidebar"
	class:fade-in={props.initialFade}
	style="display: {props.isStarted ? 'block' : 'none'}"
>
	<h1>Field Archive</h1>
	<h3>{props.recording?.title}</h3>
	<h5>[{'xx.xxxxx'}, {'xx.xxxxxx'}]</h5>
	<p>
		{props.recording?.description}
	</p>
</div>
