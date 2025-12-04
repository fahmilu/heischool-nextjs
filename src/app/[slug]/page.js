import Switcher from "@/components/Switcher";
import List from "@/components/Schools/List";
import Articles from "@/components/Articles";
import { fetchData } from "@/services/api";
import Contact from '@/components/Contact';

const Page = async ({ params }) => {
    const { slug } = await params;
    if (['locations', 'our-locations'].includes(slug)) {
        return <List />
    }

    if (['articles', 'news'].includes(slug)) {
        return <Articles />
    }



    const {data: pageData} = await fetchData(`pages/${slug}`);
    
    if (slug === 'contact-us') {
        return (
            <>
            <Contact page={pageData} />
            </>
        )
    }
    
    return pageData.components.map((component, index) => (
        <Switcher key={index} page={pageData} data={component} />
    ));
}

export default Page;