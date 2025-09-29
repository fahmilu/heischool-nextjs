import Switcher from "@/components/Switcher";
import { getPageData } from "@/utils/pageData";
import FloatingButton from "@/components/floatingButton";
const page = async () => {
  const pageData = await getPageData("home");
  return (
    <>
      {pageData.components && pageData.components.map((component, index) => (
        <Switcher key={index} page={pageData} data={component} />
      ))}
      <FloatingButton />
    </>
  );
}

export default page;