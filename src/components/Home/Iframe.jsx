"use client";
import React from 'react'
import Image from 'next/image';
import { gsap } from 'gsap';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Iframe = ({ data }) => {
    console.log(data);
    const mapRef = useRef(null);
    const imageRef = useRef(null);

    useGSAP(() => {
        if (imageRef.current && window.innerWidth > 768) {
            gsap.fromTo(imageRef.current, {
                scale: 0.5
            }, {
                scale: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: mapRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                },
            });
        }
    }, { scope: mapRef });

    return (
        <section ref={mapRef} className='home-map'>
            <div className='container !sticky !top-0'>
                <h2 className="bigger uppercase">{data.title}</h2>
                <div className='max-md:overflow-scroll max-md:mx-[-20px] mt-5 relative w-[calc(100%+40px)]'>
                    {data.iframe_code && (
                        <div className='relative w-full md:aspect-[1000/513] aspect-[9/16] mb-10' dangerouslySetInnerHTML={{ __html: data.iframe_code }} />
                    )}
                </div>
            </div>
        </section>
    )
}

export default Iframe;