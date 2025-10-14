"use client";
import Image from "next/image";
import { BigCircle } from "@/components/SVGs";
import { TextAnimation } from "@/utils/textAnimation";
import { ImageAnimation } from "@/utils/imageAnimation";
import { useParallax } from "@/utils/useParallax";
const HomeAbout = ({ data }) => {
    useParallax(".home-about__image", {
        speed: 0.025,
        direction: "up",
        // start: "bottom -50%",
        // end: "top top",
        distance: 200,
    });
    
    useParallax(".home-about__circle", {
        speed: 0.5,
        // start: "top top",
        // end: "bottom bottom",
        direction: "down",
        distance: 100,
        parent: ".home-about__text",
        // parent: ".home-about__image",
    });
    return (
        <section id="about" className="home-about">
            <div className="home-about__circle">
                <BigCircle />
            </div>
            <div className="container">
                <TextAnimation start="top 85%" delay={0.5}>
                    <h2 dangerouslySetInnerHTML={{ __html: data.title }} className="home-about__text relative z-[2]" />
                </TextAnimation>
                <ImageAnimation animationType="fadeInUp" start="top 85%" delay={0.5}>
                    <div className="home-about__image relative z-[1]">
                        <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${data.image}`} alt={data.title} fill />
                    </div>
                </ImageAnimation>
            </div>  
        </section>
    );
}

export default HomeAbout;