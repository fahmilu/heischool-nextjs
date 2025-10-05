import Switcher from "@/components/Switcher";
import { getPageData } from "@/utils/pageData";
const page = async () => {
  const pageData = await getPageData("home");
  return (
    <>
      {pageData.components && pageData.components.map((component, index) => (
        <Switcher key={index} page={pageData} data={component} />
      ))}
    </>
  );
}

export default page;