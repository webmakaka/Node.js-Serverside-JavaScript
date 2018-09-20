import { createApp } from './main.js';

export default context => {
    // since there could potentially be asynchronous route hooks or components,
    // we will be returning a Promise so that the server can wait until
    // everything is ready before rendering.
    return new Promise((resolve, reject) => {
        const { app, router } = createApp();

        // set server-side router's location
        router.push(context.url);
        
        // wait until router has resolved possible async components and hooks
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            // no matched routes, reject with 404
            if (!matchedComponents.length) {
                console.log('err')
                reject({ code: 404, message: 'Page not found' });
            }
            resolve(app);
            // the Promise should resolve to the app instance so it can be rendered
        }, reject);
    });
}