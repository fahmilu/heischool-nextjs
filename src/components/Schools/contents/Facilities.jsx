"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Arrows } from "@/components/Gallery/Arrows";
import Autoplay from 'embla-carousel-autoplay';
import { Cloud } from "@/components/SVGs";
const Facilities = ({ data }) => {
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
    
    const [emblaRef, emblaApi] = useEmblaCarousel(options);

    const itemClick = (index) => {
        emblaApi.scrollTo(index);
    }

    const colorItems = [
        "#FDC202",
        "#F4A89E",
        "#8FCAAB",
        "#4EBDD1",
        "#F9CB9C",
        "#F4A89E",
        "#8FCAAB",
    ]
    return (
        <>
            <section className="schools-facilities embla">
                <div className="container">
                    <h2>{data.title}</h2>
                    <div className="schools-facilities__content__items">
                    {data.items.map((item, index) => (
                        <div key={index} className="schools-facilities__content__item" style={{ "--color": colorItems[index] }} onClick={() => itemClick(index)}>
                            {item.title}
                        </div>
                    ))}
                    </div>
                    <div className="schools-facilities__content">
                        <div className="embla" ref={emblaRef}>
                            <div className="embla__container">
                            {data.items.map((item, index) => (
                                <div key={index} className="embla__slide">
                                    <Image src={item.image} alt={item.title} fill />
                                </div>
                            ))}
                        </div>
                        <Arrows emblaApi={emblaApi} />
                    </div>
                    </div>
                </div>

            </section>
        </>
    );
}

export default Facilities;