<nav id="sub-nav">
	<ul>
		@@for (var i = 0; i < navItems.length; i++) {
			<li `+ navItems[i].active +`>
				<a href="`+ navItems[i].link +`">
					`+ navItems[i].title +`
				</a>
			</li>
		}
	</ul>
</nav>