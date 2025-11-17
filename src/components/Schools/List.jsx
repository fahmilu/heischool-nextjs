'use client';
import { BigCircle } from "@/components/SVGs";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { 
  fetchLocations,
  selectAllLocations, 
} from '@/redux/slices/locationsSlice';
import { useEffect, useState } from 'react';
const List = () => {
    const dispatch = useAppDispatch();
    const locations = useAppSelector(selectAllLocations);
    const [activeImage, setActiveImage] = useState(1);
    useEffect(() => {
        dispatch(fetchLocations());
    }, [dispatch]);
    return (
        <section className="schools-list">
            <div className="schools-list__circle">
                <BigCircle />
            </div>
            <div className="container">
                <div className="list-area">
                    <h2>Which location <br /> would you like to visit?</h2>
                    {locations.map((item, index) => (
                        <div key={index} className="list-item-container">
                            <div className="list-item-container__image">
                                <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${item.thumbnail}`} alt={item.title} fill />
                            </div>
                            <Link href={`/locations/${item.slug}`} onMouseEnter={() => setActiveImage(index + 1)} className="list-item" style={{ '--bg-color': item.icon_bg_color }}>
                                <div className="list-item__title">{item.label}</div>
                                <div className="list-item__icon">
                                    <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${item.icon}`} alt={item.title} fill />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
                <div className="list-image">
                    {locations.map((item, index) => (
                        <Image key={index} src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${item.thumbnail}`} className={activeImage === index + 1 ? 'active' : ''} alt={item.title} fill />
                    ))}
                    {/* <Image src="/imgs/image-school.jpg" alt="List Image" fill /> */}

                </div>
            </div>
        </section>
    );
}

export default List;