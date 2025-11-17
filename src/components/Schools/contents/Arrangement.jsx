import Link from "next/link";
import Image from "next/image";
import { BigCircle } from "@/components/SVGs";
import CalendarMobile from "@/components/CalendarMobile";
const Arrangement = ({ arrangement, calendar }) => {
    // console.log({arrangement, calendar});
    return (
        <div className="arr-cal">
            {calendar?.data && (
            <section className="schools-calendar">
                <div className="container">
                    <h2>{calendar.data.section_title}</h2>
                    <div className="schools-calendar__area">
                        <div className="schools-calendar__area__image">
                            <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${calendar.data.image}`} alt={calendar.data.section_title} fill />
                        </div>
                        <div className="calendar-items max-sm:!hidden">
                            <div className="calendar-item">
                                <div>Terms</div>
                                <div>Start of the Term</div>
                                <div>End of the Term</div>
                                <div>Term Break</div>
                            </div>
                            {calendar.data.items.map((item, index) => (
                                <div key={index} className="calendar-item">
                                    <div>{item.term}</div>
                                    <div>{item.start_date}</div>
                                    <div>{item.end_date}</div>
                                    <div>{item.break_date}</div>
                                </div>
                            ))}
                        </div>
                        <CalendarMobile calendar={calendar.data.items} />
                        <div className="calendar-link">
                            <p dangerouslySetInnerHTML={{ __html: calendar.data.description }} />
                            {calendar.data.link && (
                                <Link href={calendar.data.link}>{calendar.data.link_text}</Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>
            )}
            <div className="wrapper">
                <section className="schools-arrangement">
                    <div className="container">
                        <div className="schools-arrangement__circle">
                            <BigCircle />
                        </div>
                        <h2>{arrangement.section_title}</h2>
                        <div className="schools-arrangement__content">
                            <div className="schools-arrangement__content__image">
                                <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${arrangement.image}`} alt={arrangement.section_title} fill />
                                {arrangement.description && (
                                    <div className="schools-arrangement__content__image__description" dangerouslySetInnerHTML={{ __html: arrangement.description }} />
                                )}
                            </div>
                            <div className="schools-arrangement__content__link">
                                <p>{arrangement.notes}</p>
                                <Link href={arrangement.link}>{arrangement.link_text}</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </div>
    );
}

export default Arrangement;