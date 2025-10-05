import { BigCircle } from "@/components/SVGs";
import Image from "next/image";
import Link from "next/link";
const List = () => {
    const data = [
        {
            title: "SENAYAN",
            slug: "senayan",
            icon: "/imgs/schools/senayan/icon.svg",
        },
        {
            title: "SPM MENTENG",
            slug: "menteng",
            icon: "/imgs/schools/menteng/icon.svg",
        }
    ]
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
                                <Image src={item.icon} alt={item.title} fill />
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