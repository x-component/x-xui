/**
 * x-xui
 * =====
 *
 * this module loads and evaluates an external xui.js version normally used for client side code in the context
 * of a passed "window" object
 * afterwards window.$ and window.x$ refers to xui x$
 *
 * function F(window, function(err,window){...})
 * --------------------------------
 */
'use strict';
var
	fs   = require('fs'),
	path = require('path'),
	log  = require('x-log');

//var xui_file=__dirname+'/public/xui-2.3.2.js';
var xui_files = [
	__dirname + '/public/js/xui/base.js',
	__dirname + '/public/js/xui/dom.js',
	__dirname + '/public/js/xui/style.js'//,
	//__dirname + '/public/js/sizzle.js'  // ensure this selector engine is used
];

var xui = null;  // function with evaluated xui code

var data = '';
for (var i = 0, l = xui_files.length; i < l; i++) {
	data += fs.readFileSync(path.resolve(xui_files[i]));
}

try {
	xui = new Function(data); // create a Function with the file content
} catch (e) {
	if (log.error)log.error('error in eval xui file data', e);
}

module.exports = function F(window, cb/*!function(err,window)*/) {
	try {
		xui.call(window);
		window.$ = window.x$;
		cb(null,window);
	} catch (e) {
		if (log.error)log.error('exception while binding xui to window', e);
		cb(e,window);
	}
};
