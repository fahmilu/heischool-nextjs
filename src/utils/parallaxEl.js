import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Creates parallax effect for elements using GSAP ScrollTrigger
 * @param {string|NodeList|HTMLElement} elements - CSS selector, NodeList, or HTMLElement
 * @param {Object} options - Configuration options
 * @param {string} options.start - ScrollTrigger start position (default: "bottom bottom")
 * @param {string} options.end - ScrollTrigger end position (default: "top top")
 * @param {number} options.speed - Parallax speed multiplier (default: 0.5)
 * @param {string} options.direction - Parallax direction: 'up', 'down', 'left', 'right' (default: 'up')
 * @param {number} options.distance - Distance to move in pixels (default: 100)
 * @param {boolean} options.scrub - Whether to scrub the animation (default: true)
 * @param {string} options.ease - GSAP easing function (default: "none")
 * @param {boolean} options.invalidateOnRefresh - Refresh ScrollTrigger on resize (default: true)
 * @param {string|HTMLElement} options.parent - Parent element to use as trigger (optional)
 * @returns {Array} Array of ScrollTrigger instances
 */
export const createParallax = (elements, options = {}) => {
  const {
    start = "bottom bottom",
    end = "top top",
    speed = 0.5,
    direction = 'up',
    distance = 100,
    scrub = true,
    ease = "none",
    invalidateOnRefresh = true,
    parent = null
  } = options;

  // Convert elements to array
  let elementArray = [];
  if (typeof elements === 'string') {
    elementArray = Array.from(document.querySelectorAll(elements));
  } else if (elements instanceof NodeList) {
    elementArray = Array.from(elements);
  } else if (elements instanceof HTMLElement) {
    elementArray = [elements];
  } else if (Array.isArray(elements)) {
    elementArray = elements;
  }

  if (elementArray.length === 0) {
    console.warn('No elements found for parallax effect');
    return [];
  }

  const scrollTriggers = [];

  elementArray.forEach((element, index) => {
    // Set initial transform based on direction
    const initialTransform = getInitialTransform(direction, distance);
    gsap.set(element, initialTransform);

    // Create animation based on direction
    const animationProps = getAnimationProps(direction, distance, speed);
    
    // Determine trigger element
    let triggerElement = element;
    if (parent) {
      if (typeof parent === 'string') {
        triggerElement = document.querySelector(parent);
      } else if (parent instanceof HTMLElement) {
        triggerElement = parent;
      }
      
      if (!triggerElement) {
        console.warn(`Parent trigger element not found: ${parent}`);
        triggerElement = element;
      }
    }
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: start,
        end: end,
        scrub: scrub,
        ease: ease,
        invalidateOnRefresh: invalidateOnRefresh,
        onRefresh: () => {
          // Recalculate positions on refresh
          gsap.set(element, initialTransform);
        }
      }
    });

    tl.to(element, {
      ...animationProps,
      duration: 1,
      ease: ease
    });

    scrollTriggers.push(tl.scrollTrigger);
  });

  return scrollTriggers;
};

/**
 * Get initial transform based on direction
 * @param {string} direction - Direction of parallax
 * @param {number} distance - Distance to move
 * @returns {Object} Initial transform properties
 */
const getInitialTransform = (direction, distance) => {
  const transforms = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance }
  };
  return transforms[direction] || transforms.up;
};

/**
 * Get animation properties based on direction
 * @param {string} direction - Direction of parallax
 * @param {number} distance - Distance to move
 * @param {number} speed - Speed multiplier
 * @returns {Object} Animation properties
 */
const getAnimationProps = (direction, distance, speed) => {
  const props = {
    up: { y: -distance * speed },
    down: { y: distance * speed },
    left: { x: -distance * speed },
    right: { x: distance * speed }
  };
  return props[direction] || props.up;
};

/**
 * Create horizontal parallax effect
 * @param {string|NodeList|HTMLElement} elements - Elements to animate
 * @param {Object} options - Configuration options
 * @param {string|HTMLElement} options.parent - Parent element to use as trigger (optional)
 * @returns {Array} Array of ScrollTrigger instances
 */
export const createHorizontalParallax = (elements, options = {}) => {
  return createParallax(elements, {
    ...options,
    direction: 'left',
    start: options.start || "left right",
    end: options.end || "right left"
  });
};

/**
 * Create vertical parallax effect (default)
 * @param {string|NodeList|HTMLElement} elements - Elements to animate
 * @param {Object} options - Configuration options
 * @param {string|HTMLElement} options.parent - Parent element to use as trigger (optional)
 * @returns {Array} Array of ScrollTrigger instances
 */
export const createVerticalParallax = (elements, options = {}) => {
  return createParallax(elements, {
    ...options,
    direction: 'up',
    start: options.start || "bottom bottom",
    end: options.end || "top top"
  });
};

/**
 * Create scale parallax effect
 * @param {string|NodeList|HTMLElement} elements - Elements to animate
 * @param {Object} options - Configuration options
 * @param {number} options.scaleFrom - Starting scale (default: 1.2)
 * @param {number} options.scaleTo - Ending scale (default: 1)
 * @param {string|HTMLElement} options.parent - Parent element to use as trigger (optional)
 * @returns {Array} Array of ScrollTrigger instances
 */
export const createScaleParallax = (elements, options = {}) => {
  const {
    start = "bottom bottom",
    end = "top top",
    scaleFrom = 1.2,
    scaleTo = 1,
    scrub = true,
    ease = "none",
    invalidateOnRefresh = true,
    parent = null
  } = options;

  let elementArray = [];
  if (typeof elements === 'string') {
    elementArray = Array.from(document.querySelectorAll(elements));
  } else if (elements instanceof NodeList) {
    elementArray = Array.from(elements);
  } else if (elements instanceof HTMLElement) {
    elementArray = [elements];
  } else if (Array.isArray(elements)) {
    elementArray = elements;
  }

  if (elementArray.length === 0) {
    console.warn('No elements found for scale parallax effect');
    return [];
  }

  const scrollTriggers = [];

  elementArray.forEach((element) => {
    gsap.set(element, { scale: scaleFrom });

    // Determine trigger element
    let triggerElement = element;
    if (parent) {
      if (typeof parent === 'string') {
        triggerElement = document.querySelector(parent);
      } else if (parent instanceof HTMLElement) {
        triggerElement = parent;
      }
      
      if (!triggerElement) {
        console.warn(`Parent trigger element not found: ${parent}`);
        triggerElement = element;
      }
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: start,
        end: end,
        scrub: scrub,
        ease: ease,
        invalidateOnRefresh: invalidateOnRefresh
      }
    });

    tl.to(element, {
      scale: scaleTo,
      duration: 1,
      ease: ease
    });

    scrollTriggers.push(tl.scrollTrigger);
  });

  return scrollTriggers;
};

/**
 * Create rotation parallax effect
 * @param {string|NodeList|HTMLElement} elements - Elements to animate
 * @param {Object} options - Configuration options
 * @param {number} options.rotationFrom - Starting rotation (default: 0)
 * @param {number} options.rotationTo - Ending rotation (default: 360)
 * @param {string|HTMLElement} options.parent - Parent element to use as trigger (optional)
 * @returns {Array} Array of ScrollTrigger instances
 */
export const createRotationParallax = (elements, options = {}) => {
  const {
    start = "bottom bottom",
    end = "top top",
    rotationFrom = 0,
    rotationTo = 360,
    scrub = true,
    ease = "none",
    invalidateOnRefresh = true,
    parent = null
  } = options;

  let elementArray = [];
  if (typeof elements === 'string') {
    elementArray = Array.from(document.querySelectorAll(elements));
  } else if (elements instanceof NodeList) {
    elementArray = Array.from(elements);
  } else if (elements instanceof HTMLElement) {
    elementArray = [elements];
  } else if (Array.isArray(elements)) {
    elementArray = elements;
  }

  if (elementArray.length === 0) {
    console.warn('No elements found for rotation parallax effect');
    return [];
  }

  const scrollTriggers = [];

  elementArray.forEach((element) => {
    gsap.set(element, { rotation: rotationFrom });

    // Determine trigger element
    let triggerElement = element;
    if (parent) {
      if (typeof parent === 'string') {
        triggerElement = document.querySelector(parent);
      } else if (parent instanceof HTMLElement) {
        triggerElement = parent;
      }
      
      if (!triggerElement) {
        console.warn(`Parent trigger element not found: ${parent}`);
        triggerElement = element;
      }
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: start,
        end: end,
        scrub: scrub,
        ease: ease,
        invalidateOnRefresh: invalidateOnRefresh
      }
    });

    tl.to(element, {
      rotation: rotationTo,
      duration: 1,
      ease: ease
    });

    scrollTriggers.push(tl.scrollTrigger);
  });

  return scrollTriggers;
};

/**
 * Kill all parallax ScrollTriggers
 * @param {Array} scrollTriggers - Array of ScrollTrigger instances
 */
export const killParallax = (scrollTriggers) => {
  if (Array.isArray(scrollTriggers)) {
    scrollTriggers.forEach(trigger => {
      if (trigger && trigger.kill) {
        trigger.kill();
      }
    });
  }
};

/**
 * Refresh all ScrollTriggers
 */
export const refreshParallax = () => {
  ScrollTrigger.refresh();
};

/**
 * Batch create parallax effects for multiple elements with different configurations
 * @param {Array} configs - Array of configuration objects
 * @returns {Array} Array of all ScrollTrigger instances
 */
export const createBatchParallax = (configs) => {
  const allTriggers = [];
  
  configs.forEach(config => {
    const { elements, type = 'vertical', options = {} } = config;
    
    let triggers = [];
    switch (type) {
      case 'horizontal':
        triggers = createHorizontalParallax(elements, options);
        break;
      case 'scale':
        triggers = createScaleParallax(elements, options);
        break;
      case 'rotation':
        triggers = createRotationParallax(elements, options);
        break;
      default:
        triggers = createVerticalParallax(elements, options);
    }
    
    allTriggers.push(...triggers);
  });
  
  return allTriggers;
};

// Default export
const parallaxUtils = {
  createParallax,
  createHorizontalParallax,
  createVerticalParallax,
  createScaleParallax,
  createRotationParallax,
  killParallax,
  refreshParallax,
  createBatchParallax
};

export default parallaxUtils;
