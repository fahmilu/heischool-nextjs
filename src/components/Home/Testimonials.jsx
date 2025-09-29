'use client';
import { useRef } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { useDotButton, DotButton } from '@/components/Embla/Dots';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = ({ data }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
        },
    );
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

    const containerRef = useRef(null);
    const avatarsRef = useRef(null);
    const slidesRef = useRef(null);

    useGSAP(() => {
        if (avatarsRef.current) {
            
            gsap.fromTo(avatarsRef.current, {
                x: '-50%',
                opacity: 0,
            }, {
                x: '0%',
                opacity: 1,
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top center',
                    // end: 'bottom bottom',
                    // scrub: true,
                }
            });
        }
        if (slidesRef.current) {
            gsap.fromTo(slidesRef.current, {
                x: '50%',
                opacity: 0,
            }, {
                x: '0%',
                opacity: 1,
                duration: 2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top center',
                    // end: 'bottom bottom',
                    // scrub: true,
                }
            });
        }
    }, { scope: containerRef });

    return (
      <section className="home-testimonials" ref={containerRef}>
        <div className="container">
          <h2 className="bigger text-hei-blue uppercase">{data.title}</h2>
          <div className="home-testimonials-content">
            <div className="home-testimonials-content-avatars" ref={avatarsRef}>
              {data.items.map((avatar, index) => (
                <div
                  key={index}
                  className={`home-testimonials-content-avatars-avatar ${
                    index === selectedIndex
                      ? "home-testimonials-content-avatars-avatar--selected"
                      : ""
                  }`}
                >
                  <Image src={avatar.image} alt="Avatar" fill />
                </div>
              ))}
            </div>
            <div className='home-testimonials-content-slides-container' ref={slidesRef}>
              <div
                className="home-testimonials-content-slides embla"
                ref={emblaRef}
              >
                <div className="embla__container">
                  {data.items.map((item, index) => (
                    <div key={index} className="embla__slide">
                      <div className="home-testimonials-content-slides-item">
                        <div className="home-testimonials-content-slides-item-quote">
                          {item.description}
                        </div>
                        <h3 className="text-black">{item.title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="home-testimonials-content-dots">
                {scrollSnaps.map((_, index) => (
                  <DotButton
                    key={index}
                    onClick={() => onDotButtonClick(index)}
                    className={"embla__dot".concat(
                      index === selectedIndex ? " embla__dot--selected" : ""
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default Testimonials;