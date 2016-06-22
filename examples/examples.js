(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _src = require('../src');

// request mousemove
var trackMove = (0, _src.requestEventListener)('mousemove', function (e) {
    console.log({
        x: e.pageX,
        y: e.pageY
    });
});

// request scroll
// and cancel mousemove on condition
var trackScroll = (0, _src.requestEventListener)('scroll', function (e) {
    console.log(window.scrollY);
    if (window.scrollY > 100) {
        (0, _src.cancelEventListener)('mousemove', trackMove);
    }
});

},{"../src":2}],2:[function(require,module,exports){
'use strict';

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
    return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
}; /**
    * @module  one-listener
    * @export requestEvent
    * @export cancelEvent
    * @author  Gregor Adams <greg@pixelass.com> (http://pixelass.com)
    */

var _uniqueId = require('./unique-id');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

/**
 * global collection of listeners
 * This object receives live updates when an enentListener is requested or canceled
 * @const
 * @type {Object}
 */
var eventListeners = {};

/**
 * request an eventListener
 * Creates an internal unique id and returns it for further usage.
 * Builds the eventListener Object
 * @param  {String} event - name of the event to request
 * @param  {Function} handler - default eventListener handler
 * @return {String} returns a unique id to be used when canceling the eventListener
 */
var requestEventListener = function requestEventListener(event, handler) {
    var eL = {};
    var id = (0, _uniqueId2.default)();
    if (eventListeners.hasOwnProperty(event) && _typeof(eventListeners[event]) === 'object') {
        Object.assign(eL, eventListeners[event]);
    }
    if (!eL.hasOwnProperty(id)) {
        eL[id] = handler;
    }
    eventListeners[event] = eL;
    return id;
};

/**
 * cancels an eventListener
 * This function requires an id to retrieve handlers.
 * deletes the handler from the `eventListeners` object.
 * deletes the event object if it is empty.
 * @param  {String} event - name of the event to cancel
 * @param  {String} id - unique id 
 */
var cancelEventListener = function cancelEventListener(event, id) {
    var eL = Object.assign({}, eventListeners[event]);
    if (eL.hasOwnProperty(id)) {
        delete eL[id];
    }
    var listeners = Object.keys(eL);
    if (listeners.length <= 0) {
        delete eventListeners[event];
    } else {
        eventListeners[event] = eL;
    }
};

/**
 * named scroll handler to use in `addEventListener` and `removeEventListener`
 * calls all handlers wrapped in a `requestAnimationFrame`
 * @param  {Event} e - scroll event
 */
var handleScroll = function handleScroll(e) {
    if (!eventListeners.hasOwnProperty('scroll')) {
        return;
    }
    var listeners = eventListeners.scroll;
    var handlers = Object.keys(listeners);
    handlers.forEach(function (handler) {
        return requestAnimationFrame(listeners[handler]);
    });
};

/**
 * named resize handler to use in `addEventListener` and `removeEventListener`
 * calls all handlers wrapped in a `requestAnimationFrame`
 * @param  {Event} e - resize event
 */
var handleResize = function handleResize(e) {
    if (!eventListeners.hasOwnProperty('resize')) {
        return;
    }
    var listeners = eventListeners.resize;
    var handlers = Object.keys(listeners);
    handlers.forEach(function (handler) {
        return requestAnimationFrame(listeners[handler]);
    });
};

/**
 * named mousewheel handler to use in `addEventListener` and `removeEventListener`
 * calls all handlers wrapped in a `requestAnimationFrame`
 * @param  {Event} e - mousewheel event
 */
var handleMousewheel = function handleMousewheel(e) {
    if (!eventListeners.hasOwnProperty('mousewheel')) {
        return;
    }
    var listeners = eventListeners.mousewheel;
    var handlers = Object.keys(listeners);
    handlers.forEach(function (handler) {
        return requestAnimationFrame(listeners[handler]);
    });
};

/**
 * named mousemove handler to use in `addEventListener` and `removeEventListener`
 * calls all handlers wrapped in a `requestAnimationFrame`
 * @param  {Event} e - mousemove event
 */
var handleMousemove = function handleMousemove(e) {
    if (!eventListeners.hasOwnProperty('mousemove')) {
        return;
    }
    var listeners = eventListeners.mousemove;
    var handlers = Object.keys(listeners);
    handlers.forEach(function (handler) {
        return requestAnimationFrame(listeners[handler]);
    });
};

/**
 * named mouseup handler to use in `addEventListener` and `removeEventListener`
 * calls all handlers
 * @param  {Event} e - mouseup event
 */
var handleMouseup = function handleMouseup(e) {
    if (!eventListeners.hasOwnProperty('mouseup')) {
        return;
    }
    var listeners = eventListeners.mouseup;
    var handlers = Object.keys(listeners);
    handlers.forEach(function (handler) {
        return listeners[handler](e);
    });
};

/*
 * add eventListeners for all named handlers
 */
window.addEventListener('scroll', handleScroll);
window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', handleResize);
window.addEventListener('mousewheel', handleMousewheel);
window.addEventListener('mousemove', handleMousemove);
window.addEventListener('mouseup', handleMouseup);

exports.requestEventListener = requestEventListener;
exports.cancelEventListener = cancelEventListener;

},{"./unique-id":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
//import { generate } from 'shortid';
//const uniqueId = generate;
var counter = 0;
var uniqueId = function uniqueId() {
  return "" + ++counter;
};
exports.default = uniqueId;

},{}]},{},[1]);
