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

export async function getDetailData(slug, detail) {
    console.log('Slug:', slug);
    console.log('Detail:', detail);
    try {
        const pageData = await import(`@/data/pages/${slug}/${detail}.json`);
        console.log('Page Data:', pageData);
        return pageData.default;
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

export async function getArticlesData() {
    try {
        const articlesData = await import(`@/data/articles.json`);
        return articlesData.default;
    } catch (error) {
        notFound();
    }
}

export async function getArticleDetailData(slug) {
    try {
        const articleDetailData = await import(`@/data/article-detail.json`);
        return articleDetailData.default;
    } catch (error) {
        notFound();
    }
}