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
            <div className="schools-day-at-hei__image">
                <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${data.image}`} alt={data.section_title} fill />
            </div>
            <div className="schools-day-at-hei__notes">
                {data.notes}
            </div>
        </section>
    );
}

export default DayAtHEI;