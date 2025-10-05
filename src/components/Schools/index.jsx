import Banner from "./contents/Banner";
import SideImage from "./contents/SideImage";
import Arrangement from "./contents/Arrangement";
import DayAtHEI from "./contents/DayAtHEI";
import Facilities from "./contents/Facilities";
import Clubs from "./contents/Clubs";
import Testimonials from "./contents/Testimonials";
import CTAs from "./contents/CTAs";
const Schools = ({ page, data }) => {
    switch (data.type) {
        case "banner":
            return <Banner data={data.data} page={page} />
        case "side-image":
            return <SideImage data={data.data} />
        case "arrangement":
            return <Arrangement data={data.data} />
        case "day-at-hei":
            return <DayAtHEI data={data.data} />
        case "facilities":
            return <Facilities data={data.data} />
        case "clubs":
            return <Clubs data={data.data} />
        case "testimonials":
            return <Testimonials data={data.data} />
        case "cta":
            return <CTAs data={data.data} />
        default:
            return null;
    }
}

export default Schools;