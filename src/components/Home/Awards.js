import React from 'react'
import Image from 'next/image'
import { TextAnimation } from "@/utils/textAnimation";
import { ImageAnimation } from "@/utils/imageAnimation";

const Awards = ({ data }) => {
  return (
    <div className='home-awards'>
        <div className='container'>
            <TextAnimation delay={0.1}>
                <h2 className='bigger text-hei-blue uppercase'>{data.title}</h2>
            </TextAnimation>
            <ImageAnimation delay={0.4}>
                <div className='home-awards-image'>
                    <Image src={data.image} alt='Awards' fill />
                </div>
            </ImageAnimation>
        </div>
    </div>
  )
}

export default Awards