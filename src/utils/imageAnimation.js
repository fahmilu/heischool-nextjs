"use client"

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function ImageAnimation({ 
  children, 
  animationType = "fadeInUp", 
  animateOnScroll = true, 
  delay = 0, 
  duration = 1,
  start = "top 75%",
  stagger = 0.1 
}) {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const images = containerRef.current.querySelectorAll('img, .image-container');
    
    if (images.length === 0) return;

    // Set initial states based on animation type
    switch (animationType) {
      case "fadeInUp":
        gsap.set(images, { y: 50, opacity: 0 });
        break;
      case "fadeInDown":
        gsap.set(images, { y: -50, opacity: 0 });
        break;
      case "fadeInLeft":
        gsap.set(images, { x: -50, opacity: 0 });
        break;
      case "fadeInRight":
        gsap.set(images, { x: 50, opacity: 0 });
        break;
      case "scaleIn":
        gsap.set(images, { scale: 0.8, opacity: 0 });
        break;
      case "rotateIn":
        gsap.set(images, { rotation: -10, scale: 0.9, opacity: 0 });
        break;
      case "slideIn":
        gsap.set(images, { x: "100%", opacity: 0 });
        break;
      default:
        gsap.set(images, { opacity: 0 });
    }

    const animationProps = {
      opacity: 1,
      duration: duration,
      stagger: stagger,
      ease: "power2.out",
      delay: delay,
    };

    // Apply animation based on type
    switch (animationType) {
      case "fadeInUp":
        animationProps.y = 0;
        break;
      case "fadeInDown":
        animationProps.y = 0;
        break;
      case "fadeInLeft":
        animationProps.x = 0;
        break;
      case "fadeInRight":
        animationProps.x = 0;
        break;
      case "scaleIn":
        animationProps.scale = 1;
        break;
      case "rotateIn":
        animationProps.rotation = 0;
        animationProps.scale = 1;
        break;
      case "slideIn":
        animationProps.x = 0;
        break;
    }

    if (animateOnScroll) {
      gsap.to(images, {
        ...animationProps,
        scrollTrigger: {
          trigger: containerRef.current,
          start: start,
          once: true,
        },
      });
    } else {
      gsap.to(images, animationProps);
    }

  }, {
    scope: containerRef,
    dependencies: [animationType, animateOnScroll, delay, duration],
  });

  return React.cloneElement(children, {
    ref: containerRef,
  });
}

// Predefined animation configurations
export const imageAnimations = {
  fadeInUp: "fadeInUp",
  fadeInDown: "fadeInDown", 
  fadeInLeft: "fadeInLeft",
  fadeInRight: "fadeInRight",
  scaleIn: "scaleIn",
  rotateIn: "rotateIn",
  slideIn: "slideIn"
};

// Utility function for creating image reveal animations
export function createImageRevealAnimation(element, options = {}) {
  const {
    direction = "up",
    duration = 1,
    delay = 0,
    ease = "power2.out"
  } = options;

  const directions = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 }
  };

  const initial = directions[direction] || directions.up;
  
  gsap.set(element, initial);
  
  return gsap.to(element, {
    ...initial,
    opacity: 1,
    x: 0,
    y: 0,
    duration,
    delay,
    ease
  });
}

// Utility function for creating image hover animations
export function createImageHoverAnimation(element, options = {}) {
  const {
    scale = 1.05,
    duration = 0.3,
    ease = "power2.out"
  } = options;

  const hoverTl = gsap.timeline({ paused: true });
  
  hoverTl.to(element, {
    scale,
    duration,
    ease
  });

  element.addEventListener('mouseenter', () => hoverTl.play());
  element.addEventListener('mouseleave', () => hoverTl.reverse());

  return hoverTl;
}
