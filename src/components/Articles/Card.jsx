"use client";
import Image from "next/image";
import Link from "next/link";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
const Card = ({ data, isRelated=false }) => {
    const cardRef = useRef(null);

    useGSAP(() => {
        if (cardRef.current) {
            gsap.fromTo(cardRef.current, {
                opacity: 0,
                y: 50,
            }, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                scrollTrigger: {
                    trigger: cardRef.current,
                    start: 'top bottom',
                    once: true,
                },
            });
        }
    }, { scope: cardRef });
    return (
            <Link href={`/articles/${data.slug}`} className="articles__index__item" data-theme={isRelated ? '3' : data.theme} ref={cardRef}>
                <div className="articles__index__item__image">
                    <Image src={data.image} alt={data.title} fill />
                </div>
                <div className="articles__index__item__content">
                    <div className="articles__index__item__content__date">{new Date(data.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                    <div className="articles__index__item__content__title">{data.title}</div>
                    <div className="articles__index__item__content__categories">
                        {data.categories.map((category, index) => (
                            <div key={index} className="articles__index__item__content__categories__category">{category}</div>
                        ))}
                    </div>
                </div>
            </Link>
    );
}

export default Card;