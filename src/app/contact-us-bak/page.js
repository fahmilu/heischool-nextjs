import Contact from '@/components/Contact';
import { fetchData } from "@/services/api";

const page = async () => {
  const {data: pageData} = await fetchData('pages/contact-us');
  return (
      <Contact />
  )
}

export default page