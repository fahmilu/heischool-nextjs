"use client";
import Image from "next/image";
import { useState } from "react";
import ClubAccordion from "@/components/ClubAccordion";
const ClubModal = ({ data, active, setActive }) => {
    const [activeItem, setActiveItem] = useState(false);

    return (
        <div className={`schools-clubs__dialog ${active ? "active" : ""}`}>
            <div className="schools-clubs__dialog__background" onClick={() => setActive(false)}></div>
            <div className="schools-clubs__dialog__content">
                <div className="absolute lg:top-10 lg:right-10 top-2 right-2 cursor-pointer hover:scale-110 hover:rotate-[15deg] transition-all duration-200 z-[1] p-3 rounded-full bg-white" onClick={() => setActive(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                        <path d="M11.7778 15.6L8 10.12L4.22222 15.6C4 15.88 3.77778 16 3.55556 16H0.444445C0.133333 16 0 15.88 0 15.6L5.37778 8L0.0444444 0.4C0.0444444 0.12 0.177778 0 0.488889 0H3.64444C3.86667 0 4.08889 0.12 4.31111 0.4L8 5.76L11.6889 0.4C11.9111 0.12 12.1333 0 12.3556 0H15.5111C15.8222 0 15.9556 0.12 15.9556 0.4L10.6222 8L16 15.6C16 15.88 15.8667 16 15.5556 16H12.4444C12.2222 16 12 15.88 11.7778 15.6Z" fill="#404040" />
                    </svg>
                </div>
                <div className="content-wrapper">
                    <div className="schools-clubs__dialog__content__image">
                        <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${data.image}`} alt={'club'} fill />
                    </div>
                    <div className="schools-clubs__dialog__content__content">
                        <h2>{data.title}</h2>
                        <p dangerouslySetInnerHTML={{ __html: data.description }} />
                        <div className="schools-clubs__dialog__content__criterias" theme={data.theme_color}>
                            {data.criterias.map((criteria, index) => (
                                <ClubAccordion key={index} title={criteria.title} setActiveItem={setActiveItem} active={activeItem} isOpen={activeItem === index} index={index} description={criteria.description} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClubModal;