import Image from "next/image";
const ApproachBanner = ({ data }) => {
    return (
        <section className="section__banner">
            <div className="container">
                <h2 dangerouslySetInnerHTML={{ __html: data.title }} />
                <div className="section__banner__image">
                    <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${data.image}`} alt={data.title} fill />
                </div>
            </div>
        </section>
    );
}

export default ApproachBanner;