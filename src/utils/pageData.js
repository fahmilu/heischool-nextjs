import { notFound } from "next/navigation";

export async function getPageData(slug) {
    try {
        console.log('Slug:', slug);
        const pageData = await import(`@/data/pages/homepage.json`);
        return pageData.default.data;
    } catch (error) {
        notFound();
    }
}

export async function getDataData(slug) {
    try {
        const pageData = await import(`@/data/pages/${slug}.json`);
        return pageData.default;
    } catch (error) {
        notFound();
    }
}