import { getDetailData, getArticleDetailData } from "@/utils/pageData";   
import Schools from "@/components/Schools";
import DetailLocation from "@/components/Schools/DetailLocation";
import ArticleContents from "@/components/Articles/Contents";
import { fetchData } from "@/services/api";

export async function generateMetadata({ params }) {
    const { slug, detail } = await params;
    
    if(['locations', 'our-locations'].includes(slug)) {
        const { data: pageData } = await fetchData(`locations/${detail}`);

        return {
            title: `${pageData.meta?.title || pageData.title}`,
            description: `${pageData.meta?.description || pageData.description}`,
        }
    }

    
}

const DetailPage = async ({params}) => {
    const {slug, detail} = params;

    if(['locations', 'our-locations'].includes(slug)) {
        const { data: pageData } = await fetchData(`locations/${detail}`);
        console.log(pageData);
        return (
            <>
                <Schools page={pageData} data={
                            {
                                "type": "banner",
                                "data": {
                                    "title": "HEI SCHOOLS MENTENG",
                                    "images": pageData.banner_images
                                }
                            }
                } />
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
        const articleDetailData = await fetchData(`news/${detail}`);
        const articlesData = await fetchData('news');

        const relatedArticles = articlesData.data.filter(article => article.id !== articleDetailData.data.id && article.tags.some(tag => articleDetailData.data.tags.includes(tag)));
        // console.log(articleDetailData);
        return (
            <ArticleContents data={articleDetailData.data} related={relatedArticles} />
        );
    }
    return (
        <div>
            <h1>{slug} {detail}</h1>
        </div>
    )
}

export default DetailPage;