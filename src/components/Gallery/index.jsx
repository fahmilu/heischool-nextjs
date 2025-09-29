import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
const Gallery = ({ data, setActiveEmblaApi, activeIndex, index }) => {
    const options = {
      loop: true,
      align: 'center',
    };

    const [emblaRef, emblaApi] = useEmblaCarousel(options);


    useEffect(() => {
        if (activeIndex === index) {
            setActiveEmblaApi(emblaApi);
        }
    }, [emblaApi, activeIndex]);


    return (
        <div ref={emblaRef} className='embla'>
            <div className='embla__container'>
                {data.map((item, index) => (
                    <div key={index} className='embla__slide'>
                        <div className='embla__slide-image'>
                            <Image src={item} alt={index} fill />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Gallery