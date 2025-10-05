
import ClubItem from "@/components/ClubItem";

const Clubs = ({ data }) => {
    return (
        <section className="schools-clubs">
            <div className="container">
                <h2>{data.title}</h2>
                <div className="schools-clubs__items">
                    {data.items.map((item, index) => (
                        <ClubItem key={index} data={item} />
                    ))}
                    <div className="schools-clubs__item">
                        <div className="schools-clubs__item__image"></div>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Clubs;