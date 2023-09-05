<template>
	<svg version="1.2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" width="60" height="60"
		:class="isDark ? 'SVGWrapper' : 'hidden'">
		<defs>
			<image width="56" height="56" id="img1"
				href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAMAAACfWMssAAAAAXNSR0IB2cksfwAAAQhQTFRFAAAA////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////kOfX3wAAAFh0Uk5TAE/q6U7l/+QaXCYnXRnr+Vff3l77SeNIKvooVPxVW8fItwEzgr/Y9NeBMsS1JVbZI8khPOxCQT8kxlM0MYOAvUri8/Lxvn4v1lEgPTtMzFLLS38wzk34FEXDqwAAAAHZSURBVHic7dbZVsIwEAbgijjutGChbohWgcoiuAMqVdw33OH938Q2BQ+ZdJIeb/W/KpN8abqQVNPIjMXG43SrJBMAk7+C4OUfskxNz6jh7Nw8dvMJ0A2+lARI8RVDhwSWC97wJi/TmYzFO9PrNI3g4pIoUZjTl3F5xS+v4vFGkmUd1ogBTUtsCGKZ5JSYzFFwXXIpvtwIDu3NrXyhWHTy26VB44bsFljlSpWxnRr8pLBi+7VqpUxexjD1XeCS21OJIPvjgHJwGMUdLWHnPb1jtduLic47Z0Pl7N0wB9C0FdAIdwAtxQlrFHTk8IRyAKdSeEbDthTmaeiirufJoJ5M+7/IS/RePdT7YtjAVu0ODTt++0hvHl7S8ArBdCo4SllRpsr3Hsk1DfHN4bNNwxspLNHwVgrtAuXupM5bJSl4r4B2LtyVVX8r7SH8j1xXOU071kWnP6qdpj2Ji9VRFOctO010fQ8q8dx12e5qt5yR5/DC2mavX98o528BwxfrtO06nY7jvn8MCq5864AuNeonSDcr84uCcWqbI/fNYYidt9Ejp8JNqYeXdEN0wtcjk3jsfgx6qCZ+PRo9iPXxRPpZ/Dr6DxGVGlnBhSQERstfgOLXY8QIX49cvgH+XjcOE6PE1wAAAABJRU5ErkJggg==" />
		</defs>
		<use id="Background" href="#img1" x="2" y="2" />
	</svg>
	<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512" :class="isDark ? 'hidden' : 'SVGWrapper'">
		<path fill="white"
			d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
	</svg>
</template>

<script lang="ts">
export default {
	name: "SunMoonIcon",
	props: {
		isDark: {
			required: true,
			boolean: true
		}
	}
}
</script>

<style scoped>
.SVGWrapper {
	overflow: hidden;
	height: 35px;
	width: 35px;
	z-index: 1;
	transform: rotate(223deg);
	transition: opacity .4s linear, width .4s linear, height .4s linear;
}

.hidden {
	opacity: 0;
	width: 1px;
	height: 1px;
}
</style>