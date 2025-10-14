"use client";
import Image from "next/image";
import { useState } from "react";
import Arrow from "@/components/Link/Arrow";
const HeiWay = ({ data }) => {
    const [activeItem, setActiveItem] = useState(0);

    const onItemClick = (index) => {
        setActiveItem(index);
    }

    const colorItems = [
        "#FFF2CC",
        "#f2e9db",
        "#DCEFF4",
        "#D9EAD3",
        "#F9CB9C",
    ]

    return (
        <section className="section__hei-way">
            <div className="container">
                <h2>{data.section_title}</h2>
                <div className="section__hei-way__items">
                    {data.items.map((item, index) => (
                        <div key={index} className={`section__hei-way__item ${activeItem === index ? 'active' : ''}`} onClick={() => onItemClick(index)} style={{ "--color": colorItems[index] }}>
                            <div className="section__hei-way__item__icon">
                                <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${item.icon}`} alt={item.title} fill />
                            </div>
                            <div>
                                <div className="section__hei-way__item__content" data-lenis-prevent={activeItem === index}> 
                                    <h3>{item.title}</h3>
                                    <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${item.image}`} alt={item.title} fill className="section__hei-way__item__content__image" />
                                    
                                    <p dangerouslySetInnerHTML={{ __html: item.description }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-end mt-[24px]">
                    <Arrow href="https://www.heischools.com/hei-way" label="Learn more here" isSelf={false} />
                </div>
            </div>
        </section>
    );
}

export default HeiWay;