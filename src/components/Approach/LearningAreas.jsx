"use client";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { usePrevNextButtons } from "@/components/Embla/Arrows";
const LearningAreas = ({ data }) => {
    const options = {

    };

    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);
    return (
        <section className="section__learning-areas">
            <div className="container">
                <h2>{data.section_title}</h2>
                <div className="section__learning-areas__items embla adaptive-width" >
                    <div className="embla__viewport" ref={emblaRef}>
                        <div className="embla__container">
                            {data.items.map((item, index) => (
                                <div key={index} className="embla__slide">
                                    <div className="section__learning-areas__item" style={{ "--color": item.color }}>
                                        <div className="section__learning-areas__item__image">
                                            <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${item.image}`} alt={item.title} fill />
                                        </div>
                                        <div className="section__learning-areas__item__content">
                                            <h4>{item.title}</h4>
                                            <p dangerouslySetInnerHTML={{ __html: item.description }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="embla__arrows">
                        <button className="embla__arrow embla__arrow--prev" onClick={onPrevButtonClick} disabled={prevBtnDisabled}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={25} height={28} viewBox="0 0 25 28" fill="none">
                            <path d="M1.89278 15.8749C0.588537 15.0997 0.588537 13.2115 1.89278 12.4363L21.4782 0.796103C22.8114 0.00375776 24.5 0.964516 24.5 2.51538L24.5 25.7958C24.5 27.3467 22.8114 28.3074 21.4782 27.5151L1.89278 15.8749Z" fill="#00503C" />
                            </svg>

                        </button>
                        <button className="embla__arrow embla__arrow--next" onClick={onNextButtonClick} disabled={nextBtnDisabled}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={28} viewBox="0 0 24 28" fill="none">
                                <path d="M22.6072 12.4362C23.9115 13.2113 23.9115 15.0996 22.6072 15.8747L3.02181 27.5149C1.68864 28.3073 -1.23907e-06 27.3465 -1.17128e-06 25.7957L-1.53655e-07 2.51523C-8.58653e-08 0.964367 1.68864 0.00361219 3.02182 0.795958L22.6072 12.4362Z" fill="#00503C" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LearningAreas;