import Image from "next/image";
const DayAtHEI = ({ data }) => {
    return (
        <section className="schools-day-at-hei">
            <div className="container">
                <div className="schools-day-at-hei__content">
                    <h2 dangerouslySetInnerHTML={{ __html: data.section_title }} />
                    <div className="schools-day-at-hei__content__description" dangerouslySetInnerHTML={{ __html: data.description }} />
                </div>
            </div>
            <div className="schools-day-at-hei__image 2xl:px-20 md:px-10 px-5">
                <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${data.image}`} alt={data.section_title} fill className="max-sm:!hidden" />
                <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${data.image_mobile || data.image}`} alt={data.section_title} fill className="sm:!hidden" />
            </div>
            <div className="schools-day-at-hei__notes">
                {data.notes}
            </div>
        </section>
    );
}

export default DayAtHEI;