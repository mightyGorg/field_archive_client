<script>
	const props = $props()
</script>

<div
	class="sidebar"
	class:fade-in={props.initialFade}
	style="display: {props.isStarted ? 'block' : 'none'}"
>
	<h1>Field Archive</h1>
	<h3>Recording Title</h3>
	<h5>[xx.xxxx, xx.xxxx]</h5>
	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam at mollis
		leo. Vivamus eget ante aliquet, condimentum quam eu, iaculis nulla. Sed
		ullamcorper ornare tortor vitae commodo. Vestibulum consequat eu lectus sed
		lobortis. Quisque sed sapien ut arcu porttitor semper. Phasellus sit amet
		dui sem. Nulla facilisi. Cras interdum, urna non eleifend pharetra, felis
		ipsum posuere sapien, vel ultrices elit mi feugiat tortor. Donec imperdiet
		augue sed nisl egestas pretium. Ut elementum urna sed nisi suscipit
		sagittis.
	</p>
</div>
