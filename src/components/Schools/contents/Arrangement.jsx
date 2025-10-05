import Link from "next/link";
import Image from "next/image";
import { BigCircle } from "@/components/SVGs";
const Arrangement = ({ data }) => {
    return (
        <div className="arr-cal">
            <section className="schools-calendar">
                <div className="container">
                    <h2>{data.calendar.title}</h2>
                    <div className="schools-calendar__area">
                        <div className="schools-calendar__area__image">
                            <Image src={data.calendar.image} alt={data.calendar.title} fill />
                        </div>
                        <div className="calendar-items">
                            <div className="calendar-item">
                                <div>Terms</div>
                                <div>Start of the Term</div>
                                <div>End of the Term</div>
                                <div>Term Break</div>
                            </div>
                            {data.calendar.items.map((item, index) => (
                                <div key={index} className="calendar-item">
                                    <div>{item.term}</div>
                                    <div>{item.start}</div>
                                    <div>{item.end}</div>
                                    <div>{item.break}</div>
                                </div>
                            ))}
                        </div>
                        <div className="calendar-link">
                            <p>{data.calendar.link_description}</p>
                            <Link href={data.calendar.link}>{data.calendar.link_text}</Link>
                        </div>
                    </div>
                </div>
            </section>
            <div className="wrapper">
                <section className="schools-arrangement">
                    <div className="container">
                        <div className="schools-arrangement__circle">
                            <BigCircle />
                        </div>
                        <h2>{data.title}</h2>
                        <div className="schools-arrangement__content">
                            <div className="schools-arrangement__content__image">
                                <Image src={data.image} alt={data.title} fill />
                                {data.description && (
                                    <div className="schools-arrangement__content__image__description" dangerouslySetInnerHTML={{ __html: data.description }} />
                                )}
                            </div>
                            <div className="schools-arrangement__content__link">
                                <p>{data.link_description}</p>
                                <Link href={data.link}>{data.link_text}</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    );
}

export default Arrangement;