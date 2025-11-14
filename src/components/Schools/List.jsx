'use client';
import { BigCircle } from "@/components/SVGs";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { 
  fetchLocations,
  selectAllLocations, 
} from '@/redux/slices/locationsSlice';
import { useEffect } from 'react';
const List = () => {
    const dispatch = useAppDispatch();
    const locations = useAppSelector(selectAllLocations);

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
                        <Link key={index} href={`/locations/${item.slug}`} className="list-item" style={{ '--bg-color': item.icon_bg_color }}>
                            <div className="list-item__title">{item.label}</div>
                            <div className="list-item__icon">
                                <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${item.icon}`} alt={item.title} fill />
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="list-image">
                    <Image src="/imgs/image-school.jpg" alt="List Image" fill />
                </div>
            </div>
        </section>
    );
}

export default List;