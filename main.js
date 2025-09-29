const outerLinks = document.querySelectorAll('.main-menu>li>a');

const megaMenu = document.querySelector('.mega-menu');

const innerLinks = document.querySelectorAll('.inner-menu li');

const toggleClasses = (links) => {
	links.forEach(link => 
		link.addEventListener('click', function() {
			links.forEach(link => link.classList.remove('active'));
			this.classList.add('active');
	}));
};

let isOpened = false;

toggleClasses(outerLinks);

toggleClasses(innerLinks);

outerLinks[outerLinks.length - 1].addEventListener('click', (e) => {
	e.stopPropagation();
	if (isOpened) {
		megaMenu.style.top = "150%";
		megaMenu.style.opacity = "0";
		isOpened = !isOpened;
	} else {
		megaMenu.style.top = "100%";
		megaMenu.style.opacity = "1";
		isOpened = !isOpened;
	}
});

window.addEventListener('click', _ => {
	if (isOpened) {
		megaMenu.style.top = "150%";
		megaMenu.style.opacity = "0";
		isOpened = !isOpened;
		outerLinks[outerLinks.length - 1].classList.remove('active');
	}
});

