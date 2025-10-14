import Switcher from "@/components/Switcher";
import { fetchData } from "@/services/api";
const page = async () => {
  const { data: pageData } = await fetchData("pages");
  return (
    <>
      {pageData.components && pageData.components.map((component, index) => (
        <Switcher key={index} page={pageData} data={component} />
      ))}
    </>
  );
}

export default page;