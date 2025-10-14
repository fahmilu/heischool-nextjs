import { BigCircle } from "@/components/SVGs";
import Image from "next/image";
import Link from "next/link";
import { fetchData } from "@/services/api";
const List = async () => {
    const { data } = await fetchData("locations");
    return (
        <section className="schools-list">
            <div className="schools-list__circle">
                <BigCircle />
            </div>
            <div className="container">
                <div className="list-area">
                    <h2>Which location <br /> would you like to visit?</h2>
                    {data.map((item, index) => (
                        <Link key={index} href={`/locations/${item.slug}`} className="list-item">
                            <div className="list-item__title">{item.title}</div>
                            <div className="list-item__icon">
                                <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${item.icon}`} alt={item.title} fill />
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="list-image">
                    <Image src="/imgs/image-school.jpg" alt="List Image" fill />
                </div>
            </div>
        </section>
    );
}

export default List;