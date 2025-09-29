import HomeBanner from "@/components/Home/Banner";
import HomeAbout from "@/components/Home/About";
import HomeHistory from "@/components/Home/History";
import HomeEducation from "@/components/Home/Education";
import HomeMap from "@/components/Home/Map";
import HomeLocation from "@/components/Home/Location";
import HomeAwards from "@/components/Home/Awards";
import HomeTestimonials from "@/components/Home/Testimonials";
export default function Switcher({ page, data }) {
    const { type } = data;
    
    switch (type) {
        case 'home-banner':
            return <HomeBanner page={page} data={data.data} />
        case 'home-about':
            return <HomeAbout data={data.data} />
        case 'home-history':
            return <HomeHistory data={data.data} />
        case 'home-education':
            return <HomeEducation data={data.data} />
        case 'home-map':
            return <HomeMap data={data.data} />
        case 'home-location':
            return <HomeLocation data={data.data} />
        case 'home-awards':
            return <HomeAwards data={data.data} />
        case 'home-testimonials':
            return <HomeTestimonials data={data.data} />
        default:
            return null;
    }
}