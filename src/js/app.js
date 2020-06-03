import 'regenerator-runtime/runtime';
import "babel-polyfill";
const router = require('./router');

window.addEventListener('load', () => {
	// Navigate app to current url
	router.navigateTo(window.location.pathname);
	
	// Highlight Active Menu on Refresh/Page Reload
	const link = $(`a[href$='${window.location.pathname}']`);
	link.addClass('active');

	$('a').on('click', (e) => {
		//block browser to reload
		e.preventDefault();

		//add active class
		const target = $(e.target);
		$('.item').removeClass('active');
		target.addClass('active');

		//navigate to clicked url
		const href = target.attr('href');
		const path = href.substr(href.lastIndexOf('/'));
		router.navigateTo(path);
	});
});