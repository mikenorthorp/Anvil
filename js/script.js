/*
Author: Glenn Naessens
Web: glennnaessens.com
Date of creation: 01/04/2013
*/

var APP = (function () {
	var me = {},
		browser = {},

	/////////////////////////////////////////////////////////////////
	////////////////////// PRIVATE FUNCTIONS ////////////////////////
	/////////////////////////////////////////////////////////////////
		privatevar = false;

	function getSVGsupport() {
		return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
	};

	function getMQsupport() {
		return (typeof window.matchMedia == 'function');
	};

	function getViewportSize() {
		//adds a class to the body according to the device and returns an integer when called.
		var devices = ['mobile', 'tablet', 'desktop', 'luxury'],
		s = document.body.clientWidth,
		d = 3;

		if(s < 640){
			d = 0;
		}else if(s < 960){
			d = 1;
		}else if(s <= 1440){
			d = 2;
		}

		document.body.className += ' ' + devices[d];
		return d;
	};

	/////////////////////////////////////////////////////////////////
	////////////////////// PUBLIC FUNCTIONS /////////////////////////
	/////////////////////////////////////////////////////////////////





	browser.supportsSVG = getSVGsupport();
	browser.supportsMQ = getMQsupport();
	browser.viewportSize = getViewportSize();
	me.browser = browser;

	return me;
}());

(function(){
	var d = APP.browser.viewportSize;

	if (!APP.browser.supportsMQ) {
		var respond = document.createElement('script');
		respond.src = '/js/respond.js';
		document.body.appendChild(respond);
	}

	if (!APP.browser.supportsSVG) {
		var imgs = document.getElementsByTagName('img'),
			endsWithDotSvg = /.*\.svg$/;

		for(var x = imgs.length; x--;) {
			if(imgs[x].src.match(endsWithDotSvg)) {
				imgs[x].src = imgs[x].src.slice(0, -3) + 'png';
			}
		}
	}

	//CAST YOUR MAGIC HERE!
}());