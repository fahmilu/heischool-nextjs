'use client';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const CalendarMobile = ({ calendar }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect);
    }, [emblaApi, onSelect]);

    const scrollTo = useCallback(
        (index) => emblaApi && emblaApi.scrollTo(index),
        [emblaApi]
    );

    return (
        <div className="sm:!hidden">
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    {calendar.map((item, index) => (
                        <div key={index} className="embla__slide">
                            <div className="calendar-items relative">
                                <div className="calendar-item">
                                    <div className="title">{item.term}</div>
                                    <div>Terms</div>
                                    <div>Start of the Term</div>
                                    <div>End of the Term</div>
                                    <div>Term Break</div>
                                </div>
                                <div className="calendar-item">
                                    <div>{item.term}</div>
                                    <div>{item.start_date}</div>
                                    <div>{item.end_date}</div>
                                    <div>{item.break_date}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="embla__dots">
                {calendar.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`embla__dot ${index === selectedIndex ? 'embla__dot--selected' : ''}`}
                        onClick={() => scrollTo(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default CalendarMobile;