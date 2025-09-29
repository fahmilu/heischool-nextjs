'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

const HomeBanner = ({ data }) => {
  const bannerRef = useRef(null)
  const imageRef = useRef(null)
  const titleRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (isLoaded && bannerRef.current) {
      // Add loaded class to trigger CSS transitions
      bannerRef.current.classList.add('loaded')
      
      // GSAP animation for smooth entrance
      const tl = gsap.timeline()
      
      tl.fromTo(imageRef.current, 
        { 
          scale: 1.1,
          opacity: 0.8
        },
        { 
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out"
        }
      )
      .fromTo(titleRef.current,
        {
          y: 50,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out"
        },
        "-=0.6"
      )
    }
  }, [isLoaded])

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  return (
      <div ref={bannerRef} className="home-banner">
          <div ref={imageRef} className="home-banner__image">
            <Image 
              src={data.image} 
              alt={data.title} 
              fill 
              onLoad={handleImageLoad}
              priority
            />
          </div>
          <h1 ref={titleRef} dangerouslySetInnerHTML={{ __html: data.title }} />
      </div>
  )
}

export default HomeBanner