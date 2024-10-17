import { useEffect } from "react";

function useIntersectionObserver( changes, lastElementRef, cb, threshold ) {

    useEffect(() => {

        if (!lastElementRef.current) return;
        console.log(lastElementRef.current);

        const observer = new IntersectionObserver((entries) => {
            console.log(entries[0])
            console.log(entries[0].isIntersecting);
            if (entries[0].isIntersecting) {
                cb();
            }
        }, { threshold })

        observer.observe(lastElementRef.current);

        return () => {
            if (lastElementRef) {
                observer.disconnect();
            }
        }
    }, [ ...changes ] )
}

export default useIntersectionObserver;