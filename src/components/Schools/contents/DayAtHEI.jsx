import Image from "next/image";
const DayAtHEI = ({ data }) => {
    return (
        <section className="schools-day-at-hei">
            <div className="container">
                <div className="schools-day-at-hei__content">
                    <h2 dangerouslySetInnerHTML={{ __html: data.title }} />
                    <div className="schools-day-at-hei__content__description" dangerouslySetInnerHTML={{ __html: data.description }} />
                </div>
            </div>
            <div className="schools-day-at-hei__image">
                <Image src={data.image} alt={data.title} fill />
            </div>
        </section>
    );
}

export default DayAtHEI;