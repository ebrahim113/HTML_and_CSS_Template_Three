const headerOffsetHeight = document.querySelector('header').offsetHeight;

const otherLinks = document.querySelector('.other');

const megaMenu = document.querySelector('.mega-menu');

const links = [...document.querySelectorAll('.main-menu>li>a'), document.querySelector('.other'), ...document.querySelectorAll('.inner-menu li')];

const sections = {
	articles: {},
	gallery: {},
	features: {},
	testimonials: {},
	"team-members": {},
	services: {},
	"our-skills": {},
	"how-it-works": {},
	events: {},
	plans: {},
	"top-videos": {},
	stats: {},
	discount: {},
};

const sectionsNames = Object.keys(sections);

const updateOffsets = _ => {
	sectionsNames.forEach(section => sections[section].offsetTop = document.querySelector(`#${section}`).offsetTop)
};

window.addEventListener('load', updateOffsets);
window.addEventListener('resize', updateOffsets);

window.addEventListener('scroll', _ => {
	const scrollYValue = scrollY + headerOffsetHeight;

	if (scrollYValue >= sections['articles'].offsetTop) {
	sectionsNames.forEach(section => {
		if (scrollYValue >= sections[section].offsetTop) {
			links.forEach(link => link.classList.remove('active'));
			if (sections[section].offsetTop < sections['testimonials'].offsetTop)
				document.querySelector(`[href='#${section}']`).classList.add('active');
			else {
				document.querySelector('.other').classList.add('active');
				document.querySelector(`[href='#${section}']`).parentElement.classList.add('active');
			}
		}
	});
	} else links.forEach(link => link.classList.remove('active'));
});

window.addEventListener('click', _ => {
	megaMenu.classList.remove('opened');
	if (scrollY + headerOffsetHeight < sections['testimonials'].offsetTop) otherLinks.classList.remove('active'); 
});

otherLinks.addEventListener('click', (e) => {
	e.stopPropagation();
	otherLinks.classList.add('active');
	megaMenu.classList.toggle('opened');
});