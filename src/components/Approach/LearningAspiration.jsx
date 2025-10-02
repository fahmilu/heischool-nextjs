import Image from "next/image";
const LearningAspiration = ({ data }) => {
    return (
        <section className="section__learning-aspiration">
            <div className="container mb-10">
                <h2>{data.title}</h2>
            </div>
            <div className="section__learning-aspiration__items">
                {data.items.map((item, index) => (
                    <div key={index} className="section__learning-aspiration__item">
                        <div className="container">
                            <h2 className="section__learning-aspiration__item__title">{item.title}</h2>
                            <div className="section__learning-aspiration__item__content">
                                <div className="section__learning-aspiration__item__content__image">
                                    <Image src={item.image} alt={item.title} width={270} height={270} />
                                </div>
                                <div className="section__learning-aspiration__item__content__text">
                                    <div dangerouslySetInnerHTML={{ __html: item.description }} />
                                    <div className="image-text">
                                        <Image src={item.image_text} alt={item.title} width={270} height={270} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {/* <div className="section__learning-aspiration__item"></div> */}
            </div>
        </section>
    );
}

export default LearningAspiration;