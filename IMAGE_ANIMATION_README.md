# Image Show Animation System

A comprehensive image animation system built with GSAP and React for the HEI Schools Next.js project.

## Features

- **Multiple Animation Types**: fadeInUp, fadeInDown, fadeInLeft, fadeInRight, scaleIn, rotateIn, slideIn
- **Scroll-triggered Animations**: Images animate when they come into view
- **Hover Effects**: Interactive hover animations with customizable scale
- **Responsive Design**: Mobile-friendly with responsive breakpoints
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Performance Optimized**: Uses GSAP for smooth 60fps animations

## Components

### 1. ImageShow
Single image with animation effects.

```jsx
<ImageShow
  src="/imgs/banner.png"
  alt="Banner Image"
  animationType="fadeInUp"
  animateOnScroll={true}
  delay={0.2}
  duration={1.2}
  enableHover={true}
  hoverScale={1.05}
  className="w-full h-96 rounded-lg"
/>
```

### 2. ImageGallery
Grid layout for multiple images with staggered animations.

```jsx
<ImageGallery
  images={[
    { src: "/imgs/image1.jpg", alt: "Image 1" },
    { src: "/imgs/image2.jpg", alt: "Image 2" },
    { src: "/imgs/image3.jpg", alt: "Image 3" }
  ]}
  animationType="scaleIn"
  stagger={0.2}
  columns={3}
  gap="1rem"
/>
```

### 3. ImageCarousel
Slideshow component with auto-play and navigation controls.

```jsx
<ImageCarousel
  images={[
    { src: "/imgs/slide1.jpg", alt: "Slide 1" },
    { src: "/imgs/slide2.jpg", alt: "Slide 2" },
    { src: "/imgs/slide3.jpg", alt: "Slide 3" }
  ]}
  autoPlay={true}
  interval={4000}
  showDots={true}
  showArrows={true}
  animationType="fadeInUp"
/>
```

## Animation Types

| Type | Description |
|------|-------------|
| `fadeInUp` | Image slides up and fades in |
| `fadeInDown` | Image slides down and fades in |
| `fadeInLeft` | Image slides from left and fades in |
| `fadeInRight` | Image slides from right and fades in |
| `scaleIn` | Image scales up from smaller size |
| `rotateIn` | Image rotates and scales in |
| `slideIn` | Image slides in from the side |

## Usage in JSON Configuration

Add image components to your page data JSON:

```json
{
  "type": "image-show",
  "data": {
    "src": "/imgs/banner.png",
    "alt": "Banner Image",
    "animationType": "scaleIn",
    "animateOnScroll": true,
    "delay": 0.5,
    "duration": 1.5,
    "enableHover": true,
    "hoverScale": 1.08,
    "className": "w-full h-96 rounded-xl my-8"
  }
}
```

## Props

### ImageShow Props
- `src`: Image source URL
- `alt`: Alt text for accessibility
- `animationType`: Animation type (see Animation Types)
- `animateOnScroll`: Whether to animate on scroll (default: true)
- `delay`: Animation delay in seconds (default: 0)
- `duration`: Animation duration in seconds (default: 1)
- `enableHover`: Enable hover effects (default: true)
- `hoverScale`: Scale factor on hover (default: 1.05)
- `className`: Additional CSS classes
- `fill`: Use Next.js Image fill prop (default: false)
- `width`: Image width (when fill is false)
- `height`: Image height (when fill is false)
- `priority`: Next.js Image priority prop (default: false)

### ImageGallery Props
- `images`: Array of image objects with src and alt
- `animationType`: Animation type for all images
- `stagger`: Delay between each image animation (default: 0.2)
- `columns`: Number of columns in grid (default: 3)
- `gap`: Gap between grid items (default: "1rem")
- `className`: Additional CSS classes

### ImageCarousel Props
- `images`: Array of image objects with src and alt
- `autoPlay`: Enable auto-play (default: true)
- `interval`: Auto-play interval in ms (default: 3000)
- `showDots`: Show navigation dots (default: true)
- `showArrows`: Show navigation arrows (default: true)
- `animationType`: Animation type for slide transitions
- `className`: Additional CSS classes

## CSS Classes

The system includes comprehensive CSS classes for styling:

- `.image-show-container`: Main container
- `.image-show-wrapper`: Image wrapper
- `.image-show`: Image element
- `.image-gallery`: Gallery container
- `.gallery-item`: Individual gallery item
- `.image-carousel`: Carousel container
- `.carousel-container`: Carousel image container
- `.carousel-arrow`: Navigation arrows
- `.carousel-dots`: Dots container
- `.carousel-dot`: Individual dot

## Responsive Design

The system is fully responsive with breakpoints:
- Desktop: Full features
- Tablet (768px): Adjusted arrow sizes
- Mobile (480px): Single column gallery, square carousel

## Browser Support

- Modern browsers with CSS Grid support
- GSAP ScrollTrigger compatibility
- Next.js Image optimization

## Performance

- Uses GSAP for hardware-accelerated animations
- Next.js Image component for optimization
- Lazy loading support
- Minimal bundle impact
