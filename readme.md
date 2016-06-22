# one-listener

big project?  
many contributers?  

too many event listeners on `window`?

This library aims to gather all handlers in one listener. This way the number of listeners are reduced.  
Performance intense listeners are wrapped in a `requestAnimationFrame`

available listeners

* scroll
* resize (includes orientationchange)
* mousewheel
* mousemove
* mouseup (not wrapped)


## installation
```bash
npm install one-listener
```

## Usage

Look at the examples folder for this example

```js

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

```
