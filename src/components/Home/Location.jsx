"use client";
import React from 'react'
import Gallery from '../Gallery';
import { useEffect, useState } from 'react';
import { Arrows } from '../Gallery/Arrows';
const Location = ({ data }) => {
    const [ActiveEmblaApi, setActiveEmblaApi] = useState(null);
    const [ActiveIndex, setActiveIndex] = useState(0);

    const onTabClick = (index) => {
        setActiveIndex(index);
    }

    return (
        <section className='home-location'>
            <div className='container'>
                <div className='home-location-tabs'>
                    {data.items.map((item, index) => (
                        <div key={index} className={`home-location-tab ${ActiveIndex === index ? 'active' : ''}`} onClick={() => onTabClick(index)}>
                            {item.title}
                        </div>
                    ))}
                </div>
                <div className='home-location-gallery-container'>
                    <div className='home-location-items'>
                        {data.items.map((item, index) => (
                            <div key={index} className={`home-location-item ${ActiveIndex === index ? 'active' : ''}`}>
                                <Gallery data={item.images} key={index} index={index} setActiveEmblaApi={setActiveEmblaApi} activeIndex={ActiveIndex} />
                            </div>
                        ))}
                    </div>
                    {ActiveEmblaApi && (
                        <Arrows emblaApi={ActiveEmblaApi} />
                    )}
                </div>
            </div>
        </section>
    )
}

export default Location