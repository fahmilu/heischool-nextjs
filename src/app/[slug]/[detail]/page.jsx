import { getDetailData } from "@/utils/pageData";   
import Schools from "@/components/Schools";

export async function generateMetadata({ params }) {
    const { slug, detail } = await params;
    
    if(['locations', 'our-locations'].includes(slug)) {
        const pageData = await getDetailData(slug, detail);

        return {
            title: `${pageData.meta?.title || pageData.title}`,
            description: `${pageData.meta?.description || pageData.description}`,
        }
    }

    
}

const DetailPage = async ({params}) => {
    const {slug, detail} = params;

    if(['locations', 'our-locations'].includes(slug)) {
        const pageData = await getDetailData(slug, detail);

        return pageData.components.map((component, index) => (
            <Schools key={index} page={pageData} data={component} />
        ));
    }

    return (
        <div>
            <h1>{slug} {detail}</h1>
        </div>
    )
}

export default DetailPage;