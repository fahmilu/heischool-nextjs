import { getDetailData, getArticleDetailData } from "@/utils/pageData";   
import Schools from "@/components/Schools";
import DetailLocation from "@/components/Schools/DetailLocation";
import ArticleContents from "@/components/Articles/Contents";

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

        return (
            <>
            {
                pageData.components.map((component, index) => (
                    <Schools key={index} page={pageData} data={component} />
                ))
            }
            <DetailLocation data={pageData} />  
            </>
        );
    }

    if(['articles', 'news'].includes(slug)) {
        const articleDetailData = await getArticleDetailData(slug);
        console.log(articleDetailData);
        return (
            <ArticleContents data={articleDetailData.data} />
        );
    }
    return (
        <div>
            <h1>{slug} {detail}</h1>
        </div>
    )
}

export default DetailPage;