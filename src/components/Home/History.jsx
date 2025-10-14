"use client";
import Image from "next/image";
import { useParallax } from "@/utils/useParallax";

const History = ({ data }) => {

    useParallax(".home-history-2", {
        speed: 0.5,
        start: "top bottom",
        end: "bottom center",
        direction: "down",
        distance: 120,
    });
    return (
        <>
            <section className='home-history'>
                <div className='container'>
                    <div className='home-history-image'>
                        <img src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${data.logo}`} alt={data.title} />
                    </div>
                    <div className='home-history-content'>
                        <h3>{data.title}</h3>
                        <div className='home-history-content-description' dangerouslySetInnerHTML={{ __html: data.description }}/>
                    </div>
                </div>
            </section>
            <section className='home-history-2' style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_ASSET_URL}/${data.image})` }}></section>
        </>
    );
}

export default History;