<script>
	import LL, { setLocale } from '$i18n/i18n-svelte';
</script>

<div class="p-6">
	<nav>
		<ul>
			<li>
				<a href="/">Thermischer Komfort</a>
			</li>
		</ul>
	</nav>
	<section>{$LL.siteDescription()}</section>
</div>
