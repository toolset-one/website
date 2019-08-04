<nav id="main-nav">
	<ul>
		<li @@if (active === 'home') { class="active" }>
			<a href="/">
				Home
			</a>
		</li>
		<li @@if (active === 'writer') { class="active" }>
			<a href="/writer/">
				Writer
			</a>
		</li>
	</ul>
</nav>