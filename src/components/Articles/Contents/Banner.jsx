'use client';
import Image from "next/image";
const Banner = ({ data }) => {
    return (
        <div className="content content__top-area">
            <div className="container">
                <div className="content__inside"> 
                    <div className="content__top-area__categories">
                        {data.tags.map((tag, index) => (
                            <div key={index} className="content__top-area__categories__category">{tag.name}</div>
                        ))}
                    </div>
                    <h1 dangerouslySetInnerHTML={{ __html: data.title }} />
                    <div className="content__top-area__date">{new Date(data.published_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                </div>
                <div className="content__top-area__image">
                    <Image src={`${process.env.NEXT_PUBLIC_ASSET_URL}/${data.image}`} alt={data.title} fill />
                </div>
            </div>
        </div>
    );
}

export default Banner;