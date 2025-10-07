'use client';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { Arrows } from '@/components/Gallery/Arrows';
import DynamicIframeContainer from '@/components/DynamicIframeContainer';
const Enrollment = () => {

    const slides = [
        `/imgs/enroll/1.jpg`,
        `/imgs/enroll/2.jpg`,
        `/imgs/enroll/3.jpg`,
        `/imgs/enroll/4.jpg`,
        `/imgs/enroll/5.jpg`,
        `/imgs/enroll/6.jpg`,
    ]

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
    });

    return (
        <div className="enrollment">
            <div className="enrollment-slides">
                <div className="embla" ref={emblaRef}>
                    <div className="embla__container">
                        {slides.map((slide, index) => (
                            <div key={index} className="enrollment-slide embla__slide aspect-[1500/724] relative">
                                <Image src={slide} alt="Enrollment" fill />
                            </div>
                        ))}
                    </div>
                </div>
                <Arrows emblaApi={emblaApi} />
            </div>
            <div className="enrollment-note">Enrollment is subject to the availability of places within HEI Schools. Once HEI Schools reserves a place for a student and offers enrollment, it is then subject to payment of the first invoice. Failure to pay the first invoice within the specified date may result in losing the reserved place in HEI Schools.</div>
            <div className="enrollment-form">
                <iframe src="https://forms.littlelives.com/interest-form/123607-hei-schools-senayan?lang=eng&embed=true" width="100%" height="100%" frameBorder={0} marginHeight={0} marginWidth={0}>Loading…</iframe>
            </div>
        </div>
    );
}

export default Enrollment;