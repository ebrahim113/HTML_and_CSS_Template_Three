const headerOffsetHeight = document.querySelector('header').offsetHeight;

const otherLinks = document.querySelector('.other');

const megaMenu = document.querySelector('.mega-menu');

const links = [...document.querySelectorAll('.main-menu>li>a'), document.querySelector('.other'), ...document.querySelectorAll('.inner-menu li')];

const progressDivs = document.querySelectorAll('.progress div');

const statsSpans = document.querySelectorAll('.stat span:first-of-type');

const countDownDate = new Date("Dec 31, 2025 23:59:59").getTime();

const daysSpan = document.querySelector('.days');

const hoursSpan = document.querySelector('.hours');

const minutesSpan = document.querySelector('.minutes');

const secondsSpan = document.querySelector('.seconds');

let started = false;

const count = el => {
	const goal = el.dataset.goal;
	const counter = setInterval(_ => {
		el.textContent++;
		if (el.textContent == goal) { 
			clearInterval(counter);
			if (el.className === 'money') el.textContent = el.textContent + "K";
		}
	}, 2000 / goal);
};

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

updateOffsets();

window.addEventListener('resize', updateOffsets);

window.addEventListener('scroll', _ => {
	const scrollYValue = scrollY + headerOffsetHeight;
	
	if (scrollYValue + 300 >= sections['our-skills'].offsetTop) progressDivs.forEach(div => div.style.width = div.parentElement.dataset.progress);
	
	if (!started)
		if (scrollYValue >= sections.stats.offsetTop) {
			statsSpans.forEach(span => count(span));
			started = !started;
		}

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

const countDown = _ => {
	const dateNow = new Date().getTime();

	const dateDiff = countDownDate - dateNow;
	
	const days = Math.floor(dateDiff / (1000 * 60 * 60 * 24));

	daysSpan.textContent = days < 10 ? `0${days}` : days;
	
	const hours = Math.floor(dateDiff % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));

	hoursSpan.textContent = hours < 10 ? `0${hours}` : hours;

	const minutes = Math.floor(dateDiff % (1000 * 60 * 60) / (1000 * 60));
	
	minutesSpan.textContent = minutes < 10 ? `0${minutes}` : minutes;
	
	const seconds = Math.floor(dateDiff % (1000 * 60) / 1000);
	
	secondsSpan.textContent = seconds < 10 ? `0${seconds}` : seconds;
};

countDown();

const counter = setInterval(countDown, 1000);