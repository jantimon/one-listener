(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _src = require('../src');

// request mousemove
var stopMoveTracking = (0, _src.requestEventListener)('mousemove', function (e) {
    console.log({
        x: e.pageX,
        y: e.pageY
    });
});

// request scroll
// and cancel mousemove on condition
var trackScroll = function trackScroll(e) {
    console.log(window.scrollY);
    if (window.scrollY > 100) {
        stopMoveTracking();
    }
};

(0, _src.requestEventListener)('scroll', trackScroll);

// remove scroll tracking after 5 seconds
setTimeout(function () {
    (0, _src.cancelEventListener)('scroll', trackScroll);
    console.log('scrolling canceled');
}, 5000);

},{"../src":2}],2:[function(require,module,exports){
'use strict';

/**
 * @module  one-listener
 * @export requestEvent
 * @export cancelEvent
 * @author  Gregor Adams <greg@pixelass.com> (http://pixelass.com)
 */

/**
 * global collection of listeners
 * This object is the internal store for the event listeners
 * @const
 * @type {Object}
 */

var eventListeners = {
    scroll: [],
    resize: [],
    mousewheel: [],
    mousemove: [],
    mouseup: []
};

/**
 * request an eventListener
 * Creates an internal unique id and returns it for further usage.
 * Builds the eventListener Object
 * @param  {String} event - name of the event to request
 * @param  {Function} handler - default eventListener handler
 * @return {Function} returns a function which will cancel the eventListener
 */
var requestEventListener = function requestEventListener(event, handler) {
    if (!eventListeners.hasOwnProperty(event)) {
        throw new Error('Unkown event ' + event);
    }
    eventListeners[event].push(handler);
    return function () {
        return cancelEventListener(event, handler);
    };
};

/**
 * cancels an eventListener
 * This function requires an id to retrieve handlers.
 * deletes the handler from the `eventListeners` object.
 * deletes the event object if it is empty.
 * @param  {String} event - name of the event to cancel
 * @param  {Function} handler - handler to be removed
 */
var cancelEventListener = function cancelEventListener(event, handler) {
    if (!eventListeners.hasOwnProperty(event)) {
        throw new Error('Unkown event ' + event);
    }
    var index = eventListeners[event].indexOf(handler);
    // Skip if the handler doesn't exist
    if (index === -1) {
        return;
    }
    eventListeners[event].splice(index, 1);
};

/**
 * named scroll handler to use in `addEventListener` and `removeEventListener`
 * calls all handlers wrapped in a `requestAnimationFrame`
 * @param  {Event} e - scroll event
 */
var handleScroll = function handleScroll(e) {
    eventListeners.scroll.forEach(function (handler) {
        return requestAnimationFrame(function () {
            return handler(e);
        });
    });
};

/**
 * named resize handler to use in `addEventListener` and `removeEventListener`
 * calls all handlers wrapped in a `requestAnimationFrame`
 * @param  {Event} e - resize event
 */
var handleResize = function handleResize(e) {
    eventListeners.resize.forEach(function (handler) {
        return requestAnimationFrame(function () {
            return handler(e);
        });
    });
};

/**
 * named mousewheel handler to use in `addEventListener` and `removeEventListener`
 * calls all handlers wrapped in a `requestAnimationFrame`
 * @param  {Event} e - mousewheel event
 */
var handleMousewheel = function handleMousewheel(e) {
    eventListeners.mousewheel.forEach(function (handler) {
        return requestAnimationFrame(function () {
            return handler(e);
        });
    });
};

/**
 * named mousemove handler to use in `addEventListener` and `removeEventListener`
 * calls all handlers wrapped in a `requestAnimationFrame`
 * @param  {Event} e - mousemove event
 */
var handleMousemove = function handleMousemove(e) {
    eventListeners.mousemove.forEach(function (handler) {
        return requestAnimationFrame(function () {
            return handler(e);
        });
    });
};

/**
 * named mouseup handler to use in `addEventListener` and `removeEventListener`
 * calls all handlers
 * @param  {Event} e - mouseup event
 */
var handleMouseup = function handleMouseup(e) {
    eventListeners.mouseup.forEach(function (handler) {
        return handler(e);
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

},{}]},{},[1]);
