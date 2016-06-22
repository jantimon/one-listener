import { requestEventListener, cancelEventListener } from '../src';


// request mousemove 
const trackMove = requestEventListener('mousemove', (e) => {
    console.log({
        x: e.pageX,
        y: e.pageY
    });
});

// request scroll
// and cancel mousemove on condition 
const trackScroll = requestEventListener('scroll', (e) => {
    console.log(window.scrollY);
    if (window.scrollY > 100) {
        cancelEventListener('mousemove', trackMove);
    }
});