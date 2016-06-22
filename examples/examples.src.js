import { requestEventListener, cancelEventListener } from '../src';


// request mousemove 
const stopMoveTracking = requestEventListener('mousemove', (e) => {
    console.log({
        x: e.pageX,
        y: e.pageY
    });
});

// request scroll
// and cancel mousemove on condition 
const trackScroll = (e) => {
    console.log(window.scrollY);
    if (window.scrollY > 100) {
        stopMoveTracking();
    }
};

requestEventListener('scroll', trackScroll);

// remove scroll tracking after 5 seconds
setTimeout(() => {
    cancelEventListener('scroll', trackScroll);
    console.log('scrolling canceled');
}, 5000);