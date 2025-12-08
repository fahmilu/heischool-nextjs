import { useEffect, useRef, useCallback } from 'react';
import { 
  createParallax, 
  createVerticalParallax, 
  createHorizontalParallax,
  createScaleParallax,
  createRotationParallax,
  killParallax,
  refreshParallax
} from './parallaxEl.js';

/**
 * React hook for creating parallax effects
 * @param {string|HTMLElement} element - Element selector or ref
 * @param {Object} options - Parallax configuration options
 * @param {string|HTMLElement} options.parent - Parent element to use as trigger (optional)
 * @param {Array} deps - Dependencies array for useEffect
 * @returns {Object} Object with refresh function and cleanup
 */
export const useParallax = (element, options = {}, deps = []) => {
  const triggersRef = useRef([]);
  const elementRef = useRef(null);

  const cleanup = useCallback(() => {
    if (triggersRef.current.length > 0) {
      killParallax(triggersRef.current);
      triggersRef.current = [];
    }
  }, []);

  const refresh = useCallback(() => {
    refreshParallax();
  }, []);

  useEffect(() => {
    cleanup();

    let targetElement = element;
    
    // If element is a string selector, use it directly
    // If element is a ref, get the current element
    if (typeof element === 'string') {
      targetElement = element;
    } else if (element && element.current) {
      targetElement = element.current;
      elementRef.current = element.current;
    }

    if (targetElement) {
      const triggers = createParallax(targetElement, {
        start: "bottom bottom", // Default start position
        ...options
      });
      triggersRef.current = triggers;
    }

    return cleanup;
  }, [element, cleanup, ...deps]);

  // Cleanup on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return { refresh, cleanup };
};

/**
 * React hook for vertical parallax effects
 * @param {string|HTMLElement} element - Element selector or ref
 * @param {Object} options - Parallax configuration options
 * @param {string|HTMLElement} options.parent - Parent element to use as trigger (optional)
 * @param {Array} deps - Dependencies array for useEffect
 * @returns {Object} Object with refresh function and cleanup
 */
export const useVerticalParallax = (element, options = {}, deps = []) => {
  const triggersRef = useRef([]);

  const cleanup = useCallback(() => {
    if (triggersRef.current.length > 0) {
      killParallax(triggersRef.current);
      triggersRef.current = [];
    }
  }, []);

  const refresh = useCallback(() => {
    refreshParallax();
  }, []);

  useEffect(() => {
    cleanup();

    let targetElement = element;
    if (element && element.current) {
      targetElement = element.current;
    }

    if (targetElement) {
      const triggers = createVerticalParallax(targetElement, {
        start: "bottom bottom", // Default start position
        ...options
      });
      triggersRef.current = triggers;
    }

    return cleanup;
  }, [element, cleanup, ...deps]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return { refresh, cleanup };
};

/**
 * React hook for horizontal parallax effects
 * @param {string|HTMLElement} element - Element selector or ref
 * @param {Object} options - Parallax configuration options
 * @param {string|HTMLElement} options.parent - Parent element to use as trigger (optional)
 * @param {Array} deps - Dependencies array for useEffect
 * @returns {Object} Object with refresh function and cleanup
 */
export const useHorizontalParallax = (element, options = {}, deps = []) => {
  const triggersRef = useRef([]);

  const cleanup = useCallback(() => {
    if (triggersRef.current.length > 0) {
      killParallax(triggersRef.current);
      triggersRef.current = [];
    }
  }, []);

  const refresh = useCallback(() => {
    refreshParallax();
  }, []);

  useEffect(() => {
    cleanup();

    let targetElement = element;
    if (element && element.current) {
      targetElement = element.current;
    }

    if (targetElement) {
      const triggers = createHorizontalParallax(targetElement, {
        start: "left right",
        ...options
      });
      triggersRef.current = triggers;
    }

    return cleanup;
  }, [element, cleanup, ...deps]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return { refresh, cleanup };
};

/**
 * React hook for scale parallax effects
 * @param {string|HTMLElement} element - Element selector or ref
 * @param {Object} options - Parallax configuration options
 * @param {string|HTMLElement} options.parent - Parent element to use as trigger (optional)
 * @param {Array} deps - Dependencies array for useEffect
 * @returns {Object} Object with refresh function and cleanup
 */
export const useScaleParallax = (element, options = {}, deps = []) => {
  const triggersRef = useRef([]);

  const cleanup = useCallback(() => {
    if (triggersRef.current.length > 0) {
      killParallax(triggersRef.current);
      triggersRef.current = [];
    }
  }, []);

  const refresh = useCallback(() => {
    refreshParallax();
  }, []);

  useEffect(() => {
    cleanup();

    let targetElement = element;
    if (element && element.current) {
      targetElement = element.current;
    }

    if (targetElement) {
      const triggers = createScaleParallax(targetElement, {
        start: "bottom bottom", // Default start position
        ...options
      });
      triggersRef.current = triggers;
    }

    return cleanup;
  }, [element, cleanup, ...deps]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return { refresh, cleanup };
};

/**
 * React hook for rotation parallax effects
 * @param {string|HTMLElement} element - Element selector or ref
 * @param {Object} options - Parallax configuration options
 * @param {string|HTMLElement} options.parent - Parent element to use as trigger (optional)
 * @param {Array} deps - Dependencies array for useEffect
 * @returns {Object} Object with refresh function and cleanup
 */
export const useRotationParallax = (element, options = {}, deps = []) => {
  const triggersRef = useRef([]);

  const cleanup = useCallback(() => {
    if (triggersRef.current.length > 0) {
      killParallax(triggersRef.current);
      triggersRef.current = [];
    }
  }, []);

  const refresh = useCallback(() => {
    refreshParallax();
  }, []);

  useEffect(() => {
    cleanup();

    let targetElement = element;
    if (element && element.current) {
      targetElement = element.current;
    }

    if (targetElement) {
      const triggers = createRotationParallax(targetElement, {
        start: "bottom bottom", // Default start position
        ...options
      });
      triggersRef.current = triggers;
    }

    return cleanup;
  }, [element, cleanup, ...deps]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return { refresh, cleanup };
};

/**
 * React hook for responsive parallax (disables on mobile)
 * @param {string|HTMLElement} element - Element selector or ref
 * @param {Object} options - Parallax configuration options
 * @param {string|HTMLElement} options.parent - Parent element to use as trigger (optional)
 * @param {number} breakpoint - Mobile breakpoint (default: 768)
 * @param {Array} deps - Dependencies array for useEffect
 * @returns {Object} Object with refresh function and cleanup
 */
export const useResponsiveParallax = (element, options = {}, breakpoint = 768, deps = []) => {
  const triggersRef = useRef([]);

  const cleanup = useCallback(() => {
    if (triggersRef.current.length > 0) {
      killParallax(triggersRef.current);
      triggersRef.current = [];
    }
  }, []);

  const refresh = useCallback(() => {
    refreshParallax();
  }, []);

  useEffect(() => {
    cleanup();

    const isMobile = window.innerWidth <= breakpoint;
    
    if (isMobile) {
      return cleanup;
    }

    let targetElement = element;
    if (element && element.current) {
      targetElement = element.current;
    }

    if (targetElement) {
      const triggers = createParallax(targetElement, {
        start: "bottom bottom", // Default start position
        ...options
      });
      triggersRef.current = triggers;
    }

    return cleanup;
  }, [element, cleanup, breakpoint, ...deps]);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return { refresh, cleanup };
};

// Example React component usage:
/*
import React, { useRef } from 'react';
import { useParallax, useVerticalParallax, useScaleParallax } from '../utils/useParallax';

const ParallaxComponent = () => {
  const elementRef = useRef(null);
  const parentRef = useRef(null);
  
  // Basic parallax with default bottom-bottom start
  useParallax('.parallax-element', {
    speed: 0.6,
    distance: 100
  });
  
  // Vertical parallax with ref
  useVerticalParallax(elementRef, {
    speed: 0.8,
    distance: 150,
    ease: "power2.out"
  });
  
  // Scale parallax with parent trigger
  useScaleParallax('.scale-element', {
    scaleFrom: 1.3,
    scaleTo: 1,
    start: "bottom bottom",
    end: "top top",
    parent: '.parent-container' // Use parent as trigger
  });
  
  // Parallax with parent ref as trigger
  useParallax('.child-element', {
    speed: 0.5,
    distance: 80,
    parent: parentRef // Use ref as parent trigger
  });
  
  return (
    <div>
      <div className="parallax-element">
        Basic parallax element
      </div>
      <div ref={elementRef}>
        Element with ref parallax
      </div>
      <div className="parent-container">
        <div className="scale-element">
          Scale parallax element (triggered by parent)
        </div>
      </div>
      <div ref={parentRef}>
        <div className="child-element">
          Child element (triggered by parent ref)
        </div>
      </div>
    </div>
  );
};
*/
