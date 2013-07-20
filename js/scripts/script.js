/*
Author: Glenn Naessens
Web: glennnaessens.com
Date of creation: 21/01/2013
*/

Object.prototype.hasClass = function(c) {
	var n = this;
	return n.className.match(new RegExp('(\\s|^)' + c + '(\\s|$)'));
};

Object.prototype.addClass = function(c) {
	var n = this;
	if (!n.hasClass(c)){ n.className += ' ' + c; }
	return n;
};

Object.prototype.removeClass = function(c) {
	var n = this;
	if (n.hasClass(c)) {
		var reg = new RegExp('(\\s|^)' + c + '(\\s|$)');
		n.className = n.className.replace(reg,' ');
	}
	return n;
};

Object.prototype.toggleClass = function(c){
	var n = this;
	if (n.hasClass(c)) {
		var reg = new RegExp('(\\s|^)'+c+'(\\s|$)');
		n.className=n.className.replace(reg,' ');
	}else{
		n.addClass(c);
	}
	return n;
};

Object.prototype.nextNode = function() {
	var n = this;
	do { n = n.nextSibling; }
	while (n && n.nodeType !== 1);
	return n;
};

Object.prototype.previousNode = function() {
	var n = this;
	do { n = n.previousSibling; }
	while (n && n.nodeType !== 1);
	return n;
};

Object.prototype.hooks = [];

Object.prototype.hook = function(evt, handler){
	var n = this;
	n.hooks[evt] = handler;
	if (n.addEventListener) { n.addEventListener (evt, handler, false); }
	else if (n.attachEvent) { n.attachEvent ('on' + evt, handler); }
	return n;
};

Object.prototype.release = function(evt) {
	var n = this,
		handler = n.hooks[evt];
	n.hooks.splice(evt, 1);
	if (n.removeEventListener) { n.removeEventListener (evt, handler, false); }
	if (n.detachEvent) { n.detachEvent ('on' + evt, handler); }
	return n;
};

var APP = (function () {
	var me = {},
		browser = {},
	/////////////////////////////////////////////////////////////////
	//////////////////////////// PRIVATE ////////////////////////////
	/////////////////////////////////////////////////////////////////
		privatevar = new Date();

		browser.hasSVG = function(){
			return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.0");
		};

		browser.getDevice = function(){
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


		function helperfunction(){

		}

	/////////////////////////////////////////////////////////////////
	//////////////////////////// PUBLIC /////////////////////////////
	/////////////////////////////////////////////////////////////////
	me.value = 0;

	me.scrollTo = function(target, speed){
		//scrolls to the position of the target

		var start = new Date().getTime(),
		from = document.body.scrollTop,
		to = target.offsetTop;
		if(!speed){ speed = Math.abs(to - from) / 2; }

		var scroll = setInterval(function() {
			var progress = Math.min(1, (new Date().getTime() - start) / speed);
			progress = (1 - Math.cos(progress * Math.PI)) / 2;

			var newPos = from + progress * (to - from);
			document.body.scrollTop = newPos;
			document.documentElement.scrollTop = newPos;
			if( progress === 1){ clearInterval(scroll); }
		}, 24);
	};

	me.browser = browser;

	return me;
}());

(function(){
	var d = APP.browser.getDevice();


	//your code here



	if(!APP.browser.hasSVG){
		var imgs = document.getElementsByTagName('img'),
			endsWithDotSvg = /.*\.svg$/,
			l = imgs.length;
		for(var x = 0; x !== l; ++x) {
			if(imgs[x].src.match(endsWithDotSvg)) {
				imgs[x].src = imgs[x].src.slice(0, -3) + 'png';
			}
		}
	}
}());