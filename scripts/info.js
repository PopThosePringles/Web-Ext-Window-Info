(function(){
	let container = document.createElement("div");

	container.id = "pd-win-info";
	container.className = "pd-win-info";

	container.innerHTML = "Outer Width: " + window.outerWidth + "px<br />";
	container.innerHTML += "Outer Height: " + window.outerHeight + "px<br /><br />";

	container.innerHTML += "Inner Width: " + window.innerWidth + "px<br />";
	container.innerHTML += "Inner Height: " + window.innerHeight + "px<br />";

	let pos = localStorage.getItem("infowinpos");

	if(pos){
		pos = JSON.parse(pos);
		container.style.top = pos.y;
		container.style.left = pos.x;
	}

	document.body.appendChild(container);

	let dragging = false;
	let info = document.getElementById("pd-win-info");
	let x_offset = 0;
	let y_offset = 0;

	info.addEventListener("mousedown", e => {
		e.preventDefault();
		e.stopPropagation();

		dragging = true;
		info.style.position = "absolute";

		let rect = info.getBoundingClientRect();

		x_offset = e.clientX - rect.left;
		y_offset = e.clientY - rect.top;
	});

	document.addEventListener("mouseup", () => {
		dragging = false;
		info.style.position = "fixed";
		localStorage.setItem("infowinpos", JSON.stringify({

			x: info.style.left,
			y: info.style.top

		}));
	});

	document.addEventListener("mousemove", e => {
		let x = e.clientX - x_offset;
		let y = e.clientY - y_offset;

		if(dragging){
			info.style.left = x + "px";
			info.style.top = y + "px";
		}
	});

	window.addEventListener("resize", () => {
		let info = document.getElementById("pd-win-info");

		if(info){
			info.innerHTML = "Outer Width: " + window.outerWidth + "px<br />";
			info.innerHTML += "Outer Height: " + window.outerHeight + "px<br /><br />";

			info.innerHTML += "Inner Width: " + window.innerWidth + "px<br />";
			info.innerHTML += "Inner Height: " + window.innerHeight + "px<br />";
		}
	});

})();