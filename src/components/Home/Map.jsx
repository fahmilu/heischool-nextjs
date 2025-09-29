"use client";
import React from 'react'
import Image from 'next/image';
import { gsap } from 'gsap';
import { useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Map = ({ data }) => {
    const mapRef = useRef(null);
    const imageRef = useRef(null);

    useGSAP(() => {
        if (imageRef.current) {
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
        <section ref={mapRef} className='home-map h-[200vh]'>
            <div className='container !sticky !top-0'>
                <h2 className="bigger uppercase">{data.title}</h2>
                <div ref={imageRef} className='home-map-image relative overflow-hidden'>
                    <Image src={data.image} alt={data.title} fill className="object-cover" />
                </div>
            </div>
        </section>
    )
}

export default Map