import { getDataData } from "@/utils/pageData";
import Switcher from "@/components/Switcher";

const Page = async ({ params }) => {
    const { slug } = await params;
    const pageData = await getDataData(slug);

    console.log(pageData);
    return pageData.components.map((component, index) => (
        <Switcher key={index} page={pageData} data={component} />
    ));
}

export default Page;