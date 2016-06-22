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
const eventListeners = {
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
const requestEventListener = (event, handler) => {
    if (!eventListeners.hasOwnProperty(event)) {
        throw new Error('Unkown event ' + event); 
    }
    eventListeners[event].push(handler);
    return () => cancelEventListener(event, handler);
};

/**
 * cancels an eventListener
 * This function requires an id to retrieve handlers.
 * deletes the handler from the `eventListeners` object.
 * deletes the event object if it is empty.
 * @param  {String} event - name of the event to cancel
 * @param  {Function} handler - handler to be removed
 */
const cancelEventListener = (event, handler) => {
    if (!eventListeners.hasOwnProperty(event)) {
        throw new Error('Unkown event ' + event); 
    }
    const index = eventListeners[event].indexOf(handler);
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
const handleScroll = (e) => {
    eventListeners.scroll.forEach(handler => requestAnimationFrame(() => handler(e)));
};

/**
 * named resize handler to use in `addEventListener` and `removeEventListener`
 * calls all handlers wrapped in a `requestAnimationFrame`
 * @param  {Event} e - resize event
 */
const handleResize = (e) => {
    eventListeners.resize.forEach(handler => requestAnimationFrame(() => handler(e)));
};

/**
 * named mousewheel handler to use in `addEventListener` and `removeEventListener`
 * calls all handlers wrapped in a `requestAnimationFrame`
 * @param  {Event} e - mousewheel event
 */
const handleMousewheel = (e) => {
    eventListeners.mousewheel.forEach(handler => requestAnimationFrame(() => handler(e)));
};

/**
 * named mousemove handler to use in `addEventListener` and `removeEventListener`
 * calls all handlers wrapped in a `requestAnimationFrame`
 * @param  {Event} e - mousemove event
 */
const handleMousemove = (e) => {
    eventListeners.mousemove.forEach(handler => requestAnimationFrame(() => handler(e)));
};

/**
 * named mouseup handler to use in `addEventListener` and `removeEventListener`
 * calls all handlers
 * @param  {Event} e - mouseup event
 */
const handleMouseup = (e) => {
    eventListeners.mouseup.forEach(handler => handler(e));
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