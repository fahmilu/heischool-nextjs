import Image from "next/image";
import { BigCircle } from "@/components/SVGs";
const SideImage = ({ data }) => {
    return (
        <section className="schools-side-image">
            <div className="container">
                <div className="schools-side-image__circle">
                    <BigCircle />
                </div>
                <div className="side-image__content">
                    <h2>{data.title}</h2>
                    <div className="side-image__content__description" dangerouslySetInnerHTML={{ __html: data.description }} />
                </div>
                <div className="side-image">
                    <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${data.image}`} alt={data.title} fill />
                </div>
            </div>
        </section>
    );
}

export default SideImage;