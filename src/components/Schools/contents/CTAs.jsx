const CTAs = ({ data }) => {
    return (
        <section className="schools-ctas" style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_ASSET_URL}/${data.image})` }}>
            <div className="container">
                <h2 className="bigger text-hei-blue text-center mx-auto max-w-[773px] mb-[40px]">{data.section_title}</h2>
                <a href={data.link} className="bg-hei-blue text-white text-center h-[56px] px-[32px] flex items-center justify-center text-base uppercase hover:bg-hei-blue/80 transition-all duration-300">{data.link_text}</a>
            </div>
        </section>
    );
}

export default CTAs;