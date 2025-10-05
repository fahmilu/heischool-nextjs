"use client";
import { useRef, useEffect } from "react";
import { useLenis } from "lenis/react";

const HeiWayContent = ({ children }) => {
    const containerRef = useRef(null);
    const lenis = useLenis();

    useEffect(() => {
        // Check if a Lenis instance exists.
        if (lenis && containerRef.current) {
          // Store the original wrapper
          const originalWrapper = lenis.wrapper;
          
          // Set the wrapper to the container element
          lenis.wrapper = containerRef.current;
          
          // Cleanup function to reset the wrapper back to the original
          return () => {
            lenis.wrapper = originalWrapper;
          };
        }
      }, [lenis]);

    return (
        <div className="section__hei-way__item__content" ref={containerRef}>
            {children}
        </div>
    );
}

export default HeiWayContent;