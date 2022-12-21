
/*
    data.selectors:  query selection
    data.whenIntersecting(entry):  function to call when item is intersecting
    data.whenNotIntersecting(entry):  function to call when item is not intersecting
    data.fireOnce: true/false - should observer stop after first isIntersecting?
    data.rootMargin: 
    data.threshold:
*/
function addObserver(data) {
    const selectors = data.selectors ?? '';    // '.scroll-target, .slide-left, .slide-right'
    const stopObservingOnIntersection = data.fireOnce ?? false;
    const rootMargin = data.rootMargin ?? '0%';
    const threshold = data.threshold ?? 0.0;

    //console.log("Creating Intersection Observer", data);

    // ---------------------------------------------------------
    // Intersection Observer  
    // ---------------------------------------------------------

    // get all the elements we need to watch
    const targets = document.querySelectorAll(selectors);
    if (targets.length > 0) {
        //console.log("Targets: ", targets);
        // what to do with entries that are on screen
        function handleIntersection(entries) {

            //console.log('threshold: ', threshold);

            entries.map((entry) => {
                if (entry.isIntersecting) {                    
                    //console.log("On Screen: ", entry);

                    // Call function to do something
                    if (data.whenIntersecting) {
                        data.whenIntersecting(entry);
                    }

                    // Should this code only work once?
                    if (stopObservingOnIntersection) {
                        //console.log("Fire Once is True.  Cleaning up observer.");
                        observer.unobserve(entry.target);  
                    }                    
                }
                else {
                    if (data.whenNotIntersecting) {
                        data.whenNotIntersecting(entry);
                    }
                }
            });
        }
        // fire up the observer
        const observer = new IntersectionObserver(handleIntersection, { rootMargin: rootMargin, threshold: threshold });
        targets.forEach((el) => {
            observer.observe(el);
        })
    }
}

