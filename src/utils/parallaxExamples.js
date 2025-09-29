/**
 * Parallax Examples - How to use the parallax utility
 * 
 * This file demonstrates various ways to implement parallax effects
 * using the parallaxEl.js utility with GSAP ScrollTrigger.
 */

import { 
  createParallax, 
  createVerticalParallax, 
  createHorizontalParallax,
  createScaleParallax,
  createRotationParallax,
  createBatchParallax,
  killParallax,
  refreshParallax
} from './parallaxEl.js';

// Example 1: Basic vertical parallax with default settings (bottom-bottom start)
export const initBasicParallax = () => {
  // Simple vertical parallax for elements with class 'parallax-element'
  const triggers = createParallax('.parallax-element');
  
  // Cleanup function
  return () => killParallax(triggers);
};

// Example 2: Custom vertical parallax with specific options
export const initCustomVerticalParallax = () => {
  const triggers = createVerticalParallax('.custom-parallax', {
    start: "bottom bottom",  // Default start position
    end: "top top",          // Default end position
    speed: 0.8,             // Faster parallax speed
    distance: 150,           // Move 150px
    scrub: true,            // Smooth scrubbing
    ease: "power2.out"      // Custom easing
  });
  
  return () => killParallax(triggers);
};

// Example 3: Horizontal parallax
export const initHorizontalParallax = () => {
  const triggers = createHorizontalParallax('.horizontal-parallax', {
    start: "left right",
    end: "right left",
    speed: 0.6,
    distance: 200
  });
  
  return () => killParallax(triggers);
};

// Example 4: Scale parallax effect
export const initScaleParallax = () => {
  const triggers = createScaleParallax('.scale-parallax', {
    start: "bottom bottom",
    end: "top top",
    scaleFrom: 1.5,    // Start larger
    scaleTo: 1,        // Scale down to normal
    ease: "power2.out"
  });
  
  return () => killParallax(triggers);
};

// Example 5: Rotation parallax effect
export const initRotationParallax = () => {
  const triggers = createRotationParallax('.rotation-parallax', {
    start: "bottom bottom",
    end: "top top",
    rotationFrom: 0,
    rotationTo: 180,   // Rotate 180 degrees
    ease: "power2.out"
  });
  
  return () => killParallax(triggers);
};

// Example 6: Multiple parallax effects with different configurations
export const initMultipleParallax = () => {
  const triggers = createBatchParallax([
    {
      elements: '.hero-image',
      type: 'scale',
      options: {
        scaleFrom: 1.3,
        scaleTo: 1,
        start: "bottom bottom",
        end: "top top"
      }
    },
    {
      elements: '.hero-text',
      type: 'vertical',
      options: {
        speed: 0.5,
        distance: 100,
        start: "bottom bottom",
        end: "top top"
      }
    },
    {
      elements: '.floating-elements',
      type: 'rotation',
      options: {
        rotationFrom: 0,
        rotationTo: 360,
        start: "bottom bottom",
        end: "top top"
      }
    }
  ]);
  
  return () => killParallax(triggers);
};

// Example 7: Different start positions
export const initDifferentStartPositions = () => {
  const triggers = createBatchParallax([
    {
      elements: '.parallax-top',
      type: 'vertical',
      options: {
        start: "top bottom",    // Start when element top hits viewport bottom
        end: "bottom top",      // End when element bottom hits viewport top
        speed: 0.3
      }
    },
    {
      elements: '.parallax-center',
      type: 'vertical',
      options: {
        start: "center bottom", // Start when element center hits viewport bottom
        end: "center top",      // End when element center hits viewport top
        speed: 0.5
      }
    },
    {
      elements: '.parallax-bottom',
      type: 'vertical',
      options: {
        start: "bottom bottom", // Default: Start when element bottom hits viewport bottom
        end: "top top",         // Default: End when element top hits viewport top
        speed: 0.7
      }
    }
  ]);
  
  return () => killParallax(triggers);
};

// Example 8: React component usage
export const useParallaxInReact = () => {
  // In a React component, you would typically use useEffect
  /*
  import { useEffect } from 'react';
  import { createParallax, killParallax } from '../utils/parallaxEl';
  
  const MyComponent = () => {
    useEffect(() => {
      const triggers = createParallax('.my-parallax-element', {
        start: "bottom bottom",
        speed: 0.6,
        distance: 120
      });
      
      return () => killParallax(triggers);
    }, []);
    
    return (
      <div className="my-parallax-element">
        Content with parallax effect
      </div>
    );
  };
  */
};

// Example 9: Performance optimized parallax
export const initOptimizedParallax = () => {
  // Use will-change CSS property for better performance
  const elements = document.querySelectorAll('.optimized-parallax');
  elements.forEach(el => {
    el.style.willChange = 'transform';
  });
  
  const triggers = createParallax('.optimized-parallax', {
    start: "bottom bottom",
    end: "top top",
    speed: 0.5,
    distance: 100,
    scrub: true,
    invalidateOnRefresh: true  // Refresh on window resize
  });
  
  return () => {
    // Clean up will-change property
    elements.forEach(el => {
      el.style.willChange = 'auto';
    });
    killParallax(triggers);
  };
};

// Example 10: Responsive parallax (disable on mobile)
export const initResponsiveParallax = () => {
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    console.log('Parallax disabled on mobile for performance');
    return () => {};
  }
  
  const triggers = createParallax('.responsive-parallax', {
    start: "bottom bottom",
    speed: 0.4,
    distance: 80
  });
  
  return () => killParallax(triggers);
};

// Example 11: Parent trigger parallax effects
export const initParentTriggerParallax = () => {
  const triggers = createBatchParallax([
    {
      elements: '.child-element-1',
      type: 'vertical',
      options: {
        parent: '.parent-container-1', // Use parent as trigger
        speed: 0.6,
        distance: 100,
        start: "bottom bottom",
        end: "top top"
      }
    },
    {
      elements: '.child-element-2',
      type: 'scale',
      options: {
        parent: '.parent-container-2', // Use parent as trigger
        scaleFrom: 1.5,
        scaleTo: 1,
        start: "bottom bottom",
        end: "top top"
      }
    },
    {
      elements: '.child-element-3',
      type: 'horizontal',
      options: {
        parent: '.parent-container-3', // Use parent as trigger
        speed: 0.8,
        distance: 150,
        start: "left right",
        end: "right left"
      }
    }
  ]);
  
  return () => killParallax(triggers);
};

// Example 12: Multiple children with same parent trigger
export const initMultipleChildrenParentTrigger = () => {
  const triggers = createParallax('.child-in-parent', {
    parent: '.section-container', // All children triggered by same parent
    speed: 0.5,
    distance: 80,
    start: "bottom bottom",
    end: "top top"
  });
  
  return () => killParallax(triggers);
};

// Example 13: Parent trigger with different start positions
export const initParentTriggerDifferentPositions = () => {
  const triggers = createBatchParallax([
    {
      elements: '.early-trigger-child',
      type: 'vertical',
      options: {
        parent: '.parent-section',
        start: "top bottom",    // Start when parent top hits viewport bottom
        end: "bottom top",      // End when parent bottom hits viewport top
        speed: 0.3
      }
    },
    {
      elements: '.center-trigger-child',
      type: 'vertical',
      options: {
        parent: '.parent-section',
        start: "center bottom", // Start when parent center hits viewport bottom
        end: "center top",      // End when parent center hits viewport top
        speed: 0.5
      }
    },
    {
      elements: '.late-trigger-child',
      type: 'vertical',
      options: {
        parent: '.parent-section',
        start: "bottom bottom", // Start when parent bottom hits viewport bottom
        end: "top top",         // End when parent top hits viewport top
        speed: 0.7
      }
    }
  ]);
  
  return () => killParallax(triggers);
};

// Example 14: Parent trigger with DOM element reference
export const initParentTriggerWithElement = () => {
  const parentElement = document.querySelector('.parent-element');
  
  if (!parentElement) {
    console.warn('Parent element not found');
    return () => {};
  }
  
  const triggers = createParallax('.child-element', {
    parent: parentElement, // Use DOM element as trigger
    speed: 0.6,
    distance: 120,
    start: "bottom bottom",
    end: "top top"
  });
  
  return () => killParallax(triggers);
};

// Example 15: Complex parent-child parallax setup
export const initComplexParentChildParallax = () => {
  const triggers = createBatchParallax([
    // Hero section with parent trigger
    {
      elements: '.hero-image',
      type: 'scale',
      options: {
        parent: '.hero-section',
        scaleFrom: 1.2,
        scaleTo: 1,
        start: "bottom bottom",
        end: "top top"
      }
    },
    {
      elements: '.hero-text',
      type: 'vertical',
      options: {
        parent: '.hero-section',
        speed: 0.4,
        distance: 60,
        start: "bottom bottom",
        end: "top top"
      }
    },
    // Content section with different parent
    {
      elements: '.content-image',
      type: 'vertical',
      options: {
        parent: '.content-section',
        speed: 0.6,
        distance: 100,
        start: "bottom bottom",
        end: "top top"
      }
    },
    {
      elements: '.content-text',
      type: 'horizontal',
      options: {
        parent: '.content-section',
        speed: 0.3,
        distance: 50,
        start: "left right",
        end: "right left"
      }
    },
    // Footer section with rotation
    {
      elements: '.footer-icon',
      type: 'rotation',
      options: {
        parent: '.footer-section',
        rotationFrom: 0,
        rotationTo: 180,
        start: "bottom bottom",
        end: "top top"
      }
    }
  ]);
  
  return () => killParallax(triggers);
};

// Utility function to initialize all parallax effects
export const initAllParallax = () => {
  const cleanupFunctions = [
    initBasicParallax(),
    initCustomVerticalParallax(),
    initHorizontalParallax(),
    initScaleParallax(),
    initRotationParallax(),
    initMultipleParallax(),
    initDifferentStartPositions(),
    initOptimizedParallax(),
    initResponsiveParallax(),
    initParentTriggerParallax(),
    initMultipleChildrenParentTrigger(),
    initParentTriggerDifferentPositions(),
    initParentTriggerWithElement(),
    initComplexParentChildParallax()
  ];
  
  return () => {
    cleanupFunctions.forEach(cleanup => cleanup());
  };
};

// Refresh function for window resize events
export const handleResize = () => {
  refreshParallax();
};

// Example HTML structure for testing:
/*
<!-- Basic parallax elements -->
<div class="parallax-element">Basic parallax element</div>
<div class="custom-parallax">Custom parallax element</div>
<div class="horizontal-parallax">Horizontal parallax element</div>
<div class="scale-parallax">Scale parallax element</div>
<div class="rotation-parallax">Rotation parallax element</div>
<div class="hero-image">Hero image with scale effect</div>
<div class="hero-text">Hero text with vertical parallax</div>
<div class="floating-elements">Floating elements with rotation</div>
<div class="parallax-top">Top start parallax</div>
<div class="parallax-center">Center start parallax</div>
<div class="parallax-bottom">Bottom start parallax</div>
<div class="optimized-parallax">Optimized parallax element</div>
<div class="responsive-parallax">Responsive parallax element</div>

<!-- Parent trigger examples -->
<div class="parent-container-1">
  <div class="child-element-1">Child element 1 (triggered by parent-container-1)</div>
</div>

<div class="parent-container-2">
  <div class="child-element-2">Child element 2 (triggered by parent-container-2)</div>
</div>

<div class="parent-container-3">
  <div class="child-element-3">Child element 3 (triggered by parent-container-3)</div>
</div>

<div class="section-container">
  <div class="child-in-parent">Child 1 in parent</div>
  <div class="child-in-parent">Child 2 in parent</div>
  <div class="child-in-parent">Child 3 in parent</div>
</div>

<div class="parent-section">
  <div class="early-trigger-child">Early trigger child</div>
  <div class="center-trigger-child">Center trigger child</div>
  <div class="late-trigger-child">Late trigger child</div>
</div>

<div class="parent-element">
  <div class="child-element">Child element (triggered by parent-element)</div>
</div>

<!-- Complex parent-child setup -->
<div class="hero-section">
  <div class="hero-image">Hero image</div>
  <div class="hero-text">Hero text</div>
</div>

<div class="content-section">
  <div class="content-image">Content image</div>
  <div class="content-text">Content text</div>
</div>

<div class="footer-section">
  <div class="footer-icon">Footer icon</div>
</div>
*/
