"use client";
import React from 'react'
import Image from 'next/image';
import { useParallax } from '@/utils/useParallax';
const Education = ({ data }) => {
  // useParallax(".home-education-image", {
  //   speed: 0.5,
  //   direction: "up",
  //   distance: 150,
  //   start: "top bottom",
  //   end: "bottom center",
  //   ease: "power2.out",
  //   parent: ".home-education",
  // });
  return (
    <section className='home-education'>
        <div className='container'>
            <div className='home-education-content'>
                <h3>{data.title}</h3>
                <div className='md:hidden relative w-full pb-[50px]'>
                    <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${data.image}`} alt={data.title} fill className='!w-full !h-auto !object-contain !relative' />
                </div>
                <div className='home-education-content-description' dangerouslySetInnerHTML={{ __html: data.description }}/>
            </div>
            <div className='home-education-image md:block hidden'>
                <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${data.image}`} alt={data.title} fill />
            </div>
        </div>
    </section>
  )
}

export default Education