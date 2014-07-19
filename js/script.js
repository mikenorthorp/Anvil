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
	}

	function getMQsupport() {
		return (typeof window.matchMedia == 'function');
	}

	function isTouch() {
		return 'ontouchstart' in window || 'onmsgesturechange' in window;
	}

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
	}

	function getViewportSize() {
		browser.viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
		browser.viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	}

	/////////////////////////////////////////////////////////////////
	////////////////////// PUBLIC FUNCTIONS /////////////////////////
	/////////////////////////////////////////////////////////////////





	browser.supportsSVG = getSVGsupport();
	browser.supportsMQ = getMQsupport();
	browser.supportsNthChild = getNthChildSupport();
	browser.viewportSize = getViewportSize();
	browser.isTouch = isTouch();
	browser.viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	browser.viewportHeight = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

	$(window).resize(function() {
		getViewportSize();
	});
	me.browser = browser;

	return me;
}());

(function(){
	$('html').removeClass('no-js');

	if (!APP.browser.supportsSVG) {
		$('html').addClass('no-svg');

		$('img').each(	function(n){
			var src = n.src;
			n.src = src.replace('.svg', '.png');
		});
	}

	if (!APP.browser.supportsMQ) {
		var respond = document.createElement('script');
		respond.src = '/js/respond.js';
		document.body.appendChild(respond);
	}

	if (!APP.browser.supportsNthChild) {
		//Test for nth-child support and add .clearrow class when not supported
	}


	//CAST YOUR MAGIC HERE!

}());