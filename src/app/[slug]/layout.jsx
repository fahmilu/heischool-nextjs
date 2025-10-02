import { getDataData } from "@/utils/pageData";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  try {
    const pageData = await getDataData(slug);
    
    // Generate metadata based on page type
    const baseTitle = "HEI Schools Indonesia";
    const pageTitle = pageData.title || slug.charAt(0).toUpperCase() + slug.slice(1);
    
    return {
      title: `${pageTitle} | ${baseTitle}`,
      description: pageData.description || `Learn more about ${pageTitle} at HEI Schools Indonesia`,
      openGraph: {
        title: `${pageTitle} | ${baseTitle}`,
        description: pageData.description || `Learn more about ${pageTitle} at HEI Schools Indonesia`,
        images: pageData.image ? [pageData.image] : ['/imgs/logo.png'],
      },
    };
  } catch (error) {
    return {
      title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} | HEI Schools Indonesia`,
      description: "HEI Schools Indonesia - Finnish Early Childhood Education",
    };
  }
}

export default function DynamicLayout({ children, params }) {
  return (
    <div className="page__section">
      {children}
    </div>
  );
}
