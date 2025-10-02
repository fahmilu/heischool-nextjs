import Image from "next/image";
const ApproachBanner = ({ data }) => {
    return (
        <section className="section__banner">
            <div className="container">
                <h2 dangerouslySetInnerHTML={{ __html: data.description }} />
                <div className="section__banner__image">
                    <Image src={data.image} alt={data.title} fill />
                </div>
            </div>
        </section>
    );
}

export default ApproachBanner;