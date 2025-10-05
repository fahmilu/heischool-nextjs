"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Arrows } from "@/components/Gallery/Arrows";
import Autoplay from 'embla-carousel-autoplay';
import { Cloud } from "@/components/SVGs";
const Banner = ({ data , page }) => {
    const options = {
        loop: true,
        align: "center",
        dragFree: false,
        autoPlay: true,
    };

    const autoplay = Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnFocusIn: false,
    });
    
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay]);

    return (
        <>
            <section className="schools-banner embla" ref={emblaRef}>
                <div className="embla__container">
                    {data.images.map((image, index) => (
                        <div key={index} className="embla__slide">
                            <Image src={image} alt={image} fill />
                        </div>
                    ))}
                </div>
                <Arrows emblaApi={emblaApi} />
            </section>
            <section className="schools-banner__content" style={{ backgroundColor: page.color }}>
                <div className="container">
                    <h2>{page.title}</h2>
                    <p>{page.address}</p>
                </div>

            </section>
        </>
    );
}

export default Banner;