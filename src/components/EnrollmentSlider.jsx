'use client';
import useEmblaCarousel from 'embla-carousel-react';
import { Arrows } from '@/components/Gallery/Arrows';
import Image from 'next/image';
import { fetchData } from '@/services/api';
import { useEffect, useState } from 'react';
const EnrollmentSlider = () => {
    const [slides, setSlides] = useState(null);

    useEffect(() => {
        fetchData('enrollment-journey').then((data) => {
            setSlides(data.data);
            // console.log(data);
        });
    }, []);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
    });

    // console.log(slides);

    return (
        slides && (
            <>
                <div className="enrollment-slides">
                    <div className="embla" ref={emblaRef}>
                        <div className="embla__container">
                            {slides.images.map((slide, index) => (
                                <div key={index} className="enrollment-slide embla__slide md:aspect-[1500/724] aspect-[290/391] relative">
                                    <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${slide.image}`} alt="Enrollment" className="object-cover max-md:hidden" fill />
                                    <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${slide.image_mobile || slide.image}`} alt="Enrollment" className="object-cover md:hidden" fill />
                                </div>
                            ))}
                        </div>
                    </div>
                    <Arrows emblaApi={emblaApi} />
                </div>
                <div className="enrollment-note">{slides.description}</div>
            </>
        )
    );
}

export default EnrollmentSlider;