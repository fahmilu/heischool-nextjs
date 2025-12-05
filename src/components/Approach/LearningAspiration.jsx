'use client';
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const LearningAspiration = ({ data }) => {
    const itemsRef = useRef([]);
    const containerRef = useRef(null);
    const [containerHeight, setContainerHeight] = useState(2000);
    const [footerHeight, setFooterHeight] = useState(0);

    useEffect(() => {
        const calculateHeight = () => {
            if (typeof window === 'undefined' || !containerRef.current) return;

            // Get all item heights
            const itemHeights = itemsRef.current
                .filter(Boolean)
                .map(item => item.offsetHeight);
            
            // Sum all item heights
            const totalItemHeight = itemHeights.reduce((sum, height) => sum + height, 0);
            
            // Get footer height (assuming footer is at the bottom of the page)
            const footer = document.querySelector('footer');
            const footerHeight = footer ? footer.offsetHeight : 0;
            
            // Calculate total height: sum of items + footer height
            const calculatedHeight = totalItemHeight + footerHeight;
            setFooterHeight(footerHeight);
            setContainerHeight(calculatedHeight);

        };

        // Calculate on mount and when window resizes
        calculateHeight();
        window.addEventListener('resize', calculateHeight);

        return () => window.removeEventListener('resize', calculateHeight);
    }, [data.items]);

    return (
        <section className="section__learning-aspiration">
            <div className="container mb-10">
                <h2>{data.section_title}</h2>
            </div>
            <div 
                ref={containerRef}
                className="section__learning-aspiration__items" 
                style={{ height: `${containerHeight}px` }}
            >
                {data.items.map((item, index) => (
                    <div 
                        key={index} 
                        className="section__learning-aspiration__item"
                        ref={el => itemsRef.current[index] = el}
                    >
                        <div className="container">
                            <h2 className="section__learning-aspiration__item__title">{item.title}</h2>
                            <div className="section__learning-aspiration__item__content">
                                <div className="section__learning-aspiration__item__content__image">
                                    <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${item.image}`} alt={item.title} width={270} height={270} />
                                </div>
                                <div className="section__learning-aspiration__item__content__text">
                                    <div dangerouslySetInnerHTML={{ __html: item.description }} />
                                    {item.icon && (
                                    <div className="image-text">
                                        <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${item.icon}`} alt={item.title} width={270} height={270} />
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default LearningAspiration;