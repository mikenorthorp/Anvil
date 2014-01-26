/*
Author: Glenn Naessens
Web: glennnaessens.com
Date of creation: 01/04/2013
*/

var APP = (function () {
	var me = {},
		browser = {}

	/////////////////////////////////////////////////////////////////
	////////////////////// PRIVATE FUNCTIONS ////////////////////////
	/////////////////////////////////////////////////////////////////
		//private vars
		;

	function getSVGsupport() {
		return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1");
	};

	function getMQsupport() {
		return (typeof window.matchMedia == 'function');
	};

	function getNthChildSupport() {
		// selectorSupported lovingly lifted from the mad italian genius, Diego Perini
		// http://javascript.nwbox.com/CSSSupport/

		var support,
			sheet,
			doc = document,
			root = doc.documentElement,
			head = root.getElementsByTagName('head')[0],
			impl = doc.implementation || {
				hasFeature: function() {
					return false;
				}
			},
			selector = ':nth-child(2n+1)',
			link = doc.createElement("style");

		link.type = 'text/css';

		(head || root).insertBefore(link, (head || root).firstChild);

		sheet = link.sheet || link.styleSheet;

		if (!(sheet && selector)) return false;

		support = impl.hasFeature('CSS2', '') ?

		function(selector) {
			try {
				sheet.insertRule(selector + '{ }', 0);
				sheet.deleteRule(sheet.cssRules.length - 1);
			} catch (e) {
				return false;
			}
			return true;
		} : function(selector) {
			sheet.cssText = selector + ' { }';
			return sheet.cssText.length !== 0 && !(/unknown/i).test(sheet.cssText) && sheet.cssText.indexOf(selector) === 0;
		};

		return support(selector);
	};

	function getViewportSize() {
		//adds a class to the body according to the device and returns an integer when called.
		var devices = ['mobile', 'tablet', 'desktop', 'luxury'],
		s = document.body.clientWidth,
		c = document.body.className,
		d = 3;

		if(s < 480){
			d = 0;
		}else if(s < 768){
			d = 1;
		}else if(s <= 960){
			d = 2;
		}

		if (c.indexOf(devices[d]) !== -1) { document.body.className += ' ' + devices[d]; };
		return d;
	};

	/////////////////////////////////////////////////////////////////
	////////////////////// PUBLIC FUNCTIONS /////////////////////////
	/////////////////////////////////////////////////////////////////





	browser.supportsSVG = getSVGsupport();
	browser.supportsMQ = getMQsupport();
	browser.supportsNthChild = getNthChildSupport();
	browser.viewportSize = getViewportSize();
	$(window).resize(function() {
		browser.viewportSize = getViewportSize();
	});
	me.browser = browser;

	return me;
}());

(function(){
	$('html').removeClass('no-js');

	if (!APP.browser.supportsSVG) {
		$('html').addClass('no-svg');
	}

	if (!APP.browser.supportsMQ) {
		var respond = document.createElement('script');
		respond.src = '/js/respond.js';
		document.body.appendChild(respond);
	}

	//CAST YOUR MAGIC HERE!

	if (!APP.browser.supportsNthChild) {
		//Test for nth-child support and add .clearrow class when not supported
	}
}());