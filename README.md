[![Build Status](https://travis-ci.org/x-component/x-xui.png?v0.0.1)](https://travis-ci.org/x-component/x-xui)
=======================================================================================================



x-xui
=====

this module loads and evaluates an external xui.js version normally used for client side code in the context
of a passed "window" object
afterwards window.$ and window.x$ refers to xui x$

function F(window, function(err,window){...})
--------------------------------
