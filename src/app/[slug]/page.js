import { getDataData } from "@/utils/pageData";
import Switcher from "@/components/Switcher";
import List from "@/components/Schools/List";
import Articles from "@/components/Articles";

const Page = async ({ params }) => {
    const { slug } = await params;
    // console.log(pageData);
    if (['locations', 'our-locations'].includes(slug)) {
        return <List />
    }

    if (['articles', 'news'].includes(slug)) {
        return <Articles />
    }

    
    const pageData = await getDataData(slug);

    return pageData.components.map((component, index) => (
        <Switcher key={index} page={pageData} data={component} />
    ));
}

export default Page;