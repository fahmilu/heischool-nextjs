"use client"

import React, { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export function TextAnimation({ children, animateOnScroll = true, delay = 0, start = "top 75%" }) {

    const containerRef = useRef(null);
    const elementRef = useRef([]);
    const splitRef = useRef([]);
    const lines = useRef([]);

    useGSAP(() => {
        if (!containerRef.current) return;

        splitRef.current = [];
        elementRef.current = [];
        lines.current = [];

        let elements = [];

        if(containerRef.current.hasAttribute("data-copy-wrapper")) {
            elements = Array.from(containerRef.current.children);
        } else {
            elements = [containerRef.current];
        }

        elements.forEach((element) => {
            elementRef.current.push(element);

            const split =  SplitText.create(element, {
                type: "lines",
                mask: "lines",
                linesClass: "line++",
            });

            splitRef.current.push(split);

            const computedStyle = window.getComputedStyle(element);
            const textIndent = computedStyle.textIndent;

            if (textIndent && textIndent !== "0px") {
                if (split.lines.length > 0) {
                    split.lines[0].style.paddingLeft = textIndent;
                }
                element.style.textIndent = "0";
            }

            lines.current.push(...split.lines);
        });

        gsap.set(lines.current, {y: "100%", opacity: 0})

        const animationProps = {
            y: "0%",
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: "power4.inOut",
            delay: delay,
        }

        if(animateOnScroll) {
            gsap.to(lines.current, {
                ...animationProps,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: start,
                    once: true,
                },
            });
        } else {
            gsap.from(lines.current, animationProps);
        }

        return () => {
            splitRef.current.forEach((split) => {
                if (split) {
                    split.revert();
                }
            });
        };

    }, {
        scope: containerRef,
        dependencies: [animateOnScroll, delay],
    });

    if (React.Children.count(children) === 1) {
        return React.cloneElement(children, {
            ref: containerRef,
        });
    }

    return (
        <div ref={containerRef} data-copy-wrapper="true">
            {children}
        </div>
    );

}
