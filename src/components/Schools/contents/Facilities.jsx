"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { Arrows } from "@/components/Gallery/Arrows";

const Facilities = ({ data }) => {
    const [activeTab, setActiveTab] = useState(0);
    
    const filteredItems = data.items.filter(item => item.images.length > 0);
    const activeImages = filteredItems[activeTab]?.images || [];

    const options = {
        loop: true,
        align: "center",
        dragFree: false,
    };

    const [emblaRef, emblaApi] = useEmblaCarousel(options);

    // Reset carousel to first slide when tab changes
    useEffect(() => {
        if (emblaApi) {
            emblaApi.scrollTo(0, true);
        }
    }, [activeTab, emblaApi]);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const colorItems = [
        "#FDC202",
        "#F4A89E",
        "#8FCAAB",
        "#4EBDD1",
        "#F9CB9C",
        "#F4A89E",
        "#8FCAAB",
    ];

    return (
        <>
            <section className="schools-facilities embla">
                <div className="container">
                    <h2>{data.section_title}</h2>
                    <div className="schools-facilities__content__items">
                        {filteredItems.map((item, index) => (
                            <div 
                                key={index} 
                                className={`schools-facilities__content__item ${activeTab === index ? 'active' : ''}`} 
                                style={{ "--color": colorItems[index % colorItems.length] }} 
                                onClick={() => handleTabClick(index)}
                            >
                                {item.title}
                            </div>
                        ))}
                    </div>
                    <div className="schools-facilities__content">
                        <div className="embla" ref={emblaRef} key={activeTab}>
                            <div className="embla__container">
                                {activeImages.map((img, index) => (
                                    <div key={index} className="embla__slide">
                                        <Image 
                                            src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${img.image}`} 
                                            alt={`${filteredItems[activeTab]?.title || 'Facility'} - ${index + 1}`} 
                                            fill 
                                        />
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