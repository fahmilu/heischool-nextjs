import HomeBanner from "@/components/Home/Banner";
import HomeAbout from "@/components/Home/About";
import HomeHistory from "@/components/Home/History";
import HomeEducation from "@/components/Home/Education";
import HomeMap from "@/components/Home/Map";
import HomeLocation from "@/components/Home/Location";
import HomeAwards from "@/components/Home/Awards";
import HomeTestimonials from "@/components/Home/Testimonials";
import ApproachBanner from "@/components/Approach/Banner";
import ApproachHeiWay from "@/components/Approach/HeiWay";
import ApproachLearningAreas from "@/components/Approach/LearningAreas";
import ApproachLearningAspiration from "@/components/Approach/LearningAspiration";
import Facilities from "@/components/Schools/contents/Facilities";
export default function Switcher({ page, data }) {
    const { type } = data;
    
    switch (type) {
        case 'banner':
            return <HomeBanner page={page} data={data.data} />
        case 'home-about':
            return <HomeAbout data={data.data} />
        case 'home-history':
            return <HomeHistory data={data.data} />
        case 'home-education':
            return <HomeEducation data={data.data} />
        case 'single-image':
            return <HomeMap data={data.data} />
        case 'tabs-of-images':
            switch (data.data.theme) {
                case 'plain':
                    return <HomeLocation data={data.data} />
                case 'colored':
                    return <Facilities data={data.data} />
            }
        case 'home-awards':
            return <HomeAwards data={data.data} />
        case 'home-testimonials':
            return <HomeTestimonials data={data.data} />

        case 'info-cards':
            switch (data.data.theme) {
                case 'accordion':
                    return <ApproachHeiWay data={data.data} />
                case 'carousel':
                    return <ApproachLearningAreas data={data.data} />
                case 'stacked':
                    return <ApproachLearningAspiration data={data.data} />
                default:
                    return null;
            }
        default:
            return null;
    }
}